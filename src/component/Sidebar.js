import { CNavItem, CNavTitle, CSidebar, CSidebarNav } from "@coreui/react";
import React from "react";

function Sidebar() {
  return (
    <CSidebar unfoldable className="bg-black vh-100">
      <CSidebarNav>
        <CNavItem className="bg-dark text-center d-flex">
          <i className="bi bi-bar-chart-fill m-4"></i>
          <h5 className="mx-4 my-4 fw-bolder">TetherX</h5>
        </CNavItem>
        <CNavTitle>A CRM app for all yor needs...</CNavTitle>
        <CNavItem className="d-flex">
          <i className="bi bi-box-arrow-left  m-4"></i>
          <div className="mx-5 my-4">Logout</div>
        </CNavItem>
      </CSidebarNav>
    </CSidebar>
  );
}

export default Sidebar;
