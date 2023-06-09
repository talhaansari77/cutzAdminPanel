
import React from "react";
// reactstrap 
import '../assets/css/argon-dashboard-react.min.css';
import {
  Card,
  Container, Row,
  CardHeader,
} from "reactstrap";

import Header from "components/Headers/Header.js";



function Notification() {

  return (
    <>
      <Header />
      <div className="mb-3 p-4 mb-6 admin">
        <div><h1 className="admin">Notification</h1></div>
      </div>
      {/* Page content */}
      <Container className="mt--7 mb-5 bg-gradient-info " fluid>
        {/* Dark table */}
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent" style={{ borderBottom: "2px solid #666CA3" }}>
                <div>
                  <h1 className="text-center d-flex align-item-center justify-content-center">Send Notification</h1>
                </div>
              </CardHeader>
              <div className="d-flex pb-4 justify-content-around pt-5">
                <div className="inputborder">
                  <select class="form-select pt-3 inputborder" aria-label="Default select example">
                    <option selected>Organization</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="inputborder">
                  <select class="form-select pt-3 inputborder" aria-label="Default select example">
                    <option selected>Event ID</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>
              <div className="justify-content-start" style={{ padding: "5px 25px" }}>
                <p>Enter The Notification Message — </p>
                <textarea id="w3review" placeholder="Send notification" name="w3review" rows="4" cols="50" style={{ width: "100%" }}>
                </textarea>
              </div>
              <div className="addevents">
                <button className="mainbuttons mr-2 mt-1">Send</button>
                <p><span style={{color:"#666CA3",fontWeight:500}}>BEFORE YOU SEND:</span>Proofread the notification you typed by reading it backwards.
                <span style={{color:"#666CA3",fontWeight:500}}> What time is it?  </span> The notification you send may wake the people you are notifying. </p>
              </div>

            </Card>
          </div>
        </Row>
      </Container>

    </>
  );
};

export default Notification;
