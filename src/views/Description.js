
import React from "react";
import '../assets/css/argon-dashboard-react.min.css';
import {Card,Container, Row,CardHeader,} from "reactstrap";
import Header from "components/Headers/Header.js";


function Description() {


  return (
    <>
      <Header />


      <div className="mb-3 p-4 mb-6 admin">
        <div><h1 className="admin">App Description</h1></div>
      </div>

      {/* Page content */}
      <Container className="mt--7 mb-5 bg-gradient-info " fluid>
        {/* Dark table */}
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent" style={{ borderBottom: "2px solid #666CA3" }}>
                <div>
                  <h1 className="text-center d-flex align-item-center justify-content-center">How to use the app</h1>
                </div>
              </CardHeader>
              <div className="justify-content-start" style={{ padding: "25px" }}>
                <p>add description</p>
                <textarea id="w3review" placeholder="add description" name="w3review" rows="4" cols="50" style={{ width: "100%" }}>
                </textarea>
              </div>

              <div className="addevents">
                <button className="mainbuttons">Send</button>
              </div>

            </Card>
          </div>
        </Row>
      </Container>

    </>
  );
};

export default Description;
