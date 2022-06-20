import MaterialTable from "@material-table/core";
import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import Sidebar from "../component/Sidebar";
import "../styles/admin.css";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { fetchTicket, ticketUpdation } from "../Api/ticketData";
import { getAllUsers } from "../Api/userData";

function Admin() {
  const [userModal, setUserModal] = useState(false);
  const [ticketList, setTicketList] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  //old values
  const [ticketDetail, setTicketDetail] = useState({});

  //new upadted values
  const [selectedCurrTicket, setSelectedCurrTicket] = useState({});
  const [ticketUpdateModal, setTicketUpdateModal] = useState(false);
  const [ticketCount, setTicketCount] = useState({});
  const updateSelectedCurrTicket = (data) => {
    setSelectedCurrTicket(data);
  };

  const showUserModal = () => {
    setUserModal(true);
  };
  const closeUserModal = () => {
    setUserModal(false);
  };

  const onCloseTicketModal = () => {
    setTicketUpdateModal(false);
  };

  useEffect(() => {
    (async () => {
      fetchTickets();
    })();
  }, []);

  const fetchTickets = () => {
    fetchTicket()
      .then(function (response) {
        if (response.status === 200) {
          console.log(response);
          setTicketList(response.data);
          updateTicketsCount(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    (async () => {
      fetchUsers();
    })();
  }, []);

  const fetchUsers = (userId) => {
    getAllUsers()
      .then(function (response) {
        if (response.status === 200) {
          if (userId) {
            setUserDetails(response.data);
          } else {
            setUserDetails(response.data);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const updateTicket = () => {
  //   ticketUpdation(id, selectedCurrTicket).then(function (response) {
  //     console.log("Ticket updated successfully");
  //   });
  // };

  const editTicket = (ticketDetails) => {
    const ticket = {
      //reading the data of a particular row
      assignee: ticketDetails.assignee,
      description: ticketDetails.description,
      id: ticketDetails.id,
      reporter: ticketDetails.reporter,
      status: ticketDetails.status,
      ticketPriority: ticketDetails.ticketPriority,
      title: ticketDetails.title,
    };
    console.log(ticket);
    //putting the values in a state.
    setSelectedCurrTicket(ticket);
    setTicketUpdateModal(true);
  };
  console.log(selectedCurrTicket);

  //read the updated value from the user

  const onTicketUpdate = (e) => {
    if (e.target.name === "title") {
      selectedCurrTicket.title = e.target.value;
    }
    // else if (e.target.name === "description") {
    //   selectedCurrTicket.description = e.target.value;
    // }
    //create a new object with new values ==> object.assign
    //(target, source) , So here, the target:new values, source:destination where we want new values
    updateSelectedCurrTicket(Object.assign({}, selectedCurrTicket));

    //we are not using setState here as it will change the whole object. we want to change only the updated field.
  };

  //call the API

  const updateTicket = (e) => {
    e.preventDefault();
    ticketUpdation(selectedCurrTicket.id, selectedCurrTicket)
      .then(function (response) {
        console.log("Ticket is updated");
        onCloseTicketModal();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //count the tickets

  const updateTicketsCount = (tickets) => {
    const data = {
      pending: 0,
      Closed: 0,
      Open: 0,
      Blocked: 0,
    };

    tickets.forEach((item) => {
      if (item.status === "OPEN") {
        data.Open++;
      } else if (item.status === "BLOCKED") {
        data.Blocked++;
      } else if (item.status === "IN_PROGRESS") {
        data.pending++;
      } else {
        data.Closed++;
      }
    });
    setTicketCount(Object.assign({}, data));
  };

  console.log(ticketCount);

  return (
    <div className="bg-light min-vh-100">
      <div className="row">
        <div className="col-1">
          <Sidebar />
        </div>
        <div className="container m-1">
          <h3 className="text-primary text-center">
            Welcome {localStorage.getItem("name")}
          </h3>
          <p className="text-muted text-center">
            Take a quick look at your stats below
          </p>

          {/* STATS CARDS START HERE*/}
          <div className="container ">
            <div className="row my-5 mx-2 text-center">
              <div className="col my-1 p-2 d-flex justify-content-around">
                <div
                  className="card shadow bg-primary bg-opacity-25 shadow"
                  style={{ width: "15rem" }}
                >
                  <div className="cardbody border-b border-blue">
                    <h5 className="card-subtitle my-2">
                      <i className="bi bi-align-start text-primary mx-2"></i>
                      OPEN
                    </h5>
                    <hr />
                    <div className="row">
                      <div className="col">{ticketCount.Open}</div>
                      <div className="col">
                        <div style={{ height: 30, width: 30 }}>
                          <CircularProgressbar
                            value={ticketCount.Open}
                            styles={buildStyles({
                              textColor: "blue",
                              pathColor: "darkBlue",
                            })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="card shadow bg-warning bg-opacity-25 shadow"
                  style={{ width: "15rem" }}
                >
                  <div className="cardbody border-b border-yellow">
                    <h5 className="card-subtitle my-2">
                      <i className="bi bi-align-center text-primary mx-2"></i>
                      PENDING
                    </h5>
                    <hr />
                    <div className="row">
                      <div className="col">{ticketCount.pending}</div>
                      <div className="col">
                        <div style={{ height: 30, width: 30 }}>
                          <CircularProgressbar
                            value={ticketCount.pending}
                            styles={buildStyles({
                              textColor: "blue",
                              pathColor: "darkBlue",
                            })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="card shadow bg-success bg-opacity-25 shadow"
                  style={{ width: "15rem" }}
                >
                  <div className="cardbody border-b border-green">
                    <h5 className="card-subtitle my-2">
                      <i className="bi bi-align-end text-primary mx-2"></i>
                      CLOSED
                    </h5>
                    <hr />
                    <div className="row">
                      <div className="col">{ticketCount.Closed}</div>
                      <div className="col">
                        <div style={{ height: 30, width: 30 }}>
                          <CircularProgressbar
                            value={ticketCount.Closed}
                            styles={buildStyles({
                              textColor: "blue",
                              pathColor: "darkBlue",
                            })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="card shadow bg-danger bg-opacity-25 shadow"
                  style={{ width: "15rem" }}
                >
                  <div className="cardbody border-b border-red">
                    <h5 className="card-subtitle my-2">
                      <i className="bi bi-slash-circle text-primary mx-2"></i>
                      Blocked
                    </h5>
                    <hr />
                    <div className="row">
                      <div className="col">{ticketCount.Blocked}</div>
                      <div className="col">
                        <div style={{ height: 30, width: 30 }}>
                          <CircularProgressbar
                            value={ticketCount.Blocked}
                            styles={buildStyles({
                              textColor: "blue",
                              pathColor: "darkBlue",
                            })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* STATS CaRd Ends */}
            <hr />
            <MaterialTable
              title="TICKET RECORDS"
              //destructuring is happening here on onRowClick
              onRowClick={(event, rowData) => {
                editTicket(rowData);
              }} //To fetch data of a specific row
              options={{
                filtering: true, //for providing filtering functionality
                exportMenu: [
                  { filtering: true },
                  {
                    label: "Export as PDF",
                    exportFunc: (cols, rows) =>
                      ExportPdf(cols, rows, "Ticket Records"),
                  },
                  {
                    label: "Export as CSV",
                    exportFunc: (cols, rows) =>
                      ExportCsv(cols, rows, "Ticket Records"),
                  },
                ],
                headerStyle: {
                  backgroundColor: "darkblue",
                  color: "#fff",
                },
                rowStyle: {
                  backgroundColor: "#eee",
                },
              }}
              columns={[
                {
                  title: "Ticket ID",
                  field: "id",
                },
                {
                  title: "Title",
                  field: "title",
                },
                {
                  title: "Description",
                  field: "description",
                },
                {
                  title: "Reporter",
                  field: "reporter",
                },
                {
                  title: "Priority",
                  field: "ticketPriority",
                },
                {
                  title: "Assignee",
                  field: "assignee",
                },
                {
                  title: "Status",
                  field: "status",
                  lookup: {
                    OPEN: "OPEN",
                    BLOCKED: "BLOCKED",
                    CLOSED: "CLOSED",
                    IN_PROGRESS: "IN_PROGRESS",
                  },
                },
              ]}
              data={ticketList}
            />
            {ticketUpdateModal ? (
              <Modal
                show={ticketUpdateModal}
                onHide={onCloseTicketModal}
                backdrop="static"
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>Edit Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form onSubmit={updateTicket}>
                    <div className="p-1">
                      <h6 className="text-primary">
                        Title: {selectedCurrTicket.title}
                        <br />
                        ID: {selectedCurrTicket.id}
                        <br />
                        Assignee: {selectedCurrTicket.assignee}
                        <br />
                        Status: {selectedCurrTicket.status}
                        <br />
                        Description: {selectedCurrTicket.description}
                        <br />
                      </h6>
                      <div className="input-group">
                        <label className="input-group-text">Title</label>
                        <input
                          className="form-control"
                          type="text"
                          name="title"
                          value={selectedCurrTicket.title}
                          placeholder
                          onChange={onTicketUpdate}
                        />
                      </div>
                      <Button type="submit" className="btn btn-primary my-2">
                        Update
                      </Button>
                    </div>
                  </form>
                </Modal.Body>
              </Modal>
            ) : (
              ""
            )}

            <br />
            <hr />
            <MaterialTable
              title="USER RECORDS"
              onRowClick={(rowData, userId) => {
                fetchUsers(rowData.userId);
                // updateDetails(userDetails.userId);
              }}
              options={{
                exportMenu: [
                  {
                    label: "Export as PDF",
                    exportFunc: (cols, rows) =>
                      ExportPdf(cols, rows, "Ticket Records"),
                  },
                  {
                    label: "Export as CSV",
                    exportFunc: (cols, rows) =>
                      ExportCsv(cols, rows, "Ticket Records"),
                  },
                ],
                headerStyle: {
                  backgroundColor: "darkblue",
                  color: "#fff",
                },
                rowStyle: {
                  backgroundColor: "#eee",
                },
              }}
              columns={[
                {
                  title: "User ID",
                  field: "userId",
                },
                {
                  title: "Name",
                  field: "name",
                },
                {
                  title: "Email",
                  field: "email",
                },
                {
                  title: "User Type",
                  field: "userTypes",
                  lookup: {
                    CUSTOMER: "CUSTOMER",
                    ENGINEER: "ENGINEER",
                    ADMIN: "ADMIN",
                  },
                },
                {
                  title: "Status",
                  field: "userStatus",
                  lookup: {
                    APPROVED: "APPROVED",
                    PENDING: "PENDING",
                    REJECTED: "REJECTED",
                  },
                },
              ]}
              data={userDetails}
            />
            <hr />
            <Modal
              show={userModal}
              onHide={closeUserModal}
              backdrop="static"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Edit Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                  <div className="p-1">
                    <h5 className="text-primary">
                      User ID: {userDetails.userId}
                    </h5>
                    <div className="input-group">
                      <label className="input-group-text">Name</label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                </form>
              </Modal.Body>
            </Modal>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
}

export default Admin;
