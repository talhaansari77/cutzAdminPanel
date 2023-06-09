
import React from "react";
import '../../assets/css/argon-dashboard-react.min.css';
import {
    Card,
    Container, Row,
    CardHeader,
    Input,
} from "reactstrap";


import Header from "components/Headers/Header.js";


function CreateEvent() {

    return (
        <>
            <Header />

            <div className="mb-3 p-4 mb-6 admin">
                <div><h1 className="admin">Create Event</h1></div>
            </div>

            {/* Page content */}
            <Container className="mt--7 mb-5 bg-gradient-info " fluid>
                {/* Dark table */}
                <Row className="mt-5">
                    <div className="col">
                        <Card className="bg-default shadow">
                            <CardHeader className="bg-transparent" style={{ borderBottom: "2px solid #666CA3" }}>
                                <div>
                                    <h1 className="text-center d-flex align-item-center justify-content-center">Add Event</h1>
                                </div>
                            </CardHeader>

                            <div className="d-flex justify-content-around pt-5">
                                <div className="inputborder">
                                    <Input className="inputborder" type="text" placeholder="Organaization"></Input>
                                </div>
                                <div className="inputborder">
                                    <Input className="inputborder" type="text" placeholder="Type Event"></Input>
                                </div>
                                <div>
                                    {/* <Input>asdf</Input> */}
                                </div>
                            </div>
                            <div className="pt-5 d-flex justify-content-center" >
                                <div className="inputborder" style={{ width: "100%", paddingRight: "1%" }}>
                                    <Input className="inputborder" type="text" placeholder="location"></Input>
                                </div>
                            </div>
                            <div className="d-flex justify-content-around pt-5">
                                <div className="inputborder">
                                    <lable className="evnetcolor">Prep Event Start Time</lable>
                                    <Input className="inputborder" type="date" placeholder="Enter a date"></Input>
                                </div>
                                <div className="inputborder">
                                <lable className="evnetcolor">Prep Event End Time</lable>
                                    <Input className="inputborder" type="date" placeholder="Type Event"></Input>
                                </div>
                                <div>
                                    {/* <Input>asdf</Input> */}
                                </div>
                            </div>
                            <div className="d-flex justify-content-around pt-5">
                                <div className="inputborder">
                                <lable className="evnetcolor">Event Start Time</lable>
                                    <Input className="inputborder" type="date" placeholder="Enter a date"></Input>
                                </div>
                                <div className="inputborder">
                                <lable className="evnetcolor">Event End Time</lable>
                                    <Input className="inputborder" type="date" placeholder="Type Event"></Input>
                                </div>
                                <div>
                                    {/* <Input>asdf</Input> */}
                                </div>
                            </div>

                            <div className="d-flex justify-content-around pt-5">
                                <div className="inputborder">
                                <lable className="evnetcolor">Clean Up Start Time</lable>
                                    <Input className="inputborder" type="date" placeholder="Enter a date"></Input>
                                </div>
                                <div className="inputborder">
                                <lable className="evnetcolor">Clean Up End Time</lable>
                                    <Input className="inputborder" type="date" placeholder="Type Event"></Input>
                                </div>
                                <div>
                                    {/* <Input>asdf</Input> */}
                                </div>
                            </div>
                            <div className="d-flex pb-4 justify-content-around pt-4">
                                <div className="inputborder" style={{marginTop:"23px"}}>
                                    
                                    <Input className="inputborder" type="text" placeholder="Event Capacity"></Input>
                                </div>
                                <div className="inputborder">
                                    <select class="form-select pt-3 inputborder" aria-label="Default select example">
                                        <option selected>Group service period</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                                <div>
                                    {/* <Input>asdf</Input> */}
                                </div>
                            </div>

                            <div className="addevents">
                                <button className="mainbuttons">Add Event</button>
                            </div>

                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
};

export default CreateEvent;
