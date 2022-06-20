//axios library is used
import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

//url : crm/api/v1/tickets  (Authorization is needed to fetch API data)
//Authorization : pass token (x-access-token) :token, userId also needs to be passed : userId
// token is passed in headers, and userId is passed in Api body.

//post api: allow the user to create a ticket
//put api: allow the engineer to create a ticket

export async function fetchTicket(data) {
  return await axios.get(
    `${BASE_URL}/crm/api/v1/tickets`,
    {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    },
    {
      userId: localStorage.getItem("userId"),
    }
  );
}
export async function ticketUpdation(id, selectedCurrTicket) {
  return await axios.put(
    `${BASE_URL}/crm/api/v1/tickets/${id}`,
    selectedCurrTicket,
    {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    },
    {
      userId: localStorage.getItem("userId"),
    }
  );
}
