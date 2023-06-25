import React, { useEffect, useState } from "react";
import "../../assets/css/argon-dashboard-react.min.css";
import {
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
  Table,
  CardHeader,
  CardFooter,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
} from "reactstrap";

import { Popup } from "reactjs-popup";
import Header from "components/Headers/Header.js";
import { getVolunteer } from "services/client";
import moment from "moment";
import Loader from "utilities/Loaders";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { delVolunteer } from "services/client";
import { ResultCounter } from "components/ResultCounter";
import VolunteerEdit from "components/VolunteerEdit";

function Volunteers() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [volunteerId, setVolunteerId] = useState('');
  const [volunteer, setVolunteer] = useState({});
  const [volunteerList, setVolunteerList] = useState([]);
  const [volunteerData, setVolunteerData] = useState([]);
  const { user } = useSelector((state) => state.CreateUserReducer);
  const token=localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    setLoading(true);
    getVolunteer().then((r) => {
      setVolunteerList(r.data);
      setVolunteerData(r.data);
      setLoading(false);
    }).catch(()=>{
      setLoading(false);
    })
  }, []);

  return (
    <>
      <Header />

      <div className="mb-3 p-4 mb-6 admin">
        <div>
          <h1 className="admin">Volunteers</h1>
        </div>
        <div>
          <h5 className="admin">Welcome to your Volunteers Manager</h5>
        </div>
      </div>

      {/* Page content */}
      <Container className="mt--7 bg-gradient-info " fluid>
        {/* Dark table */}
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <div className="d-flex justify-content-between">
                  <div>
                    <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
                      <FormGroup className="mb-0">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fas fa-search" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Search" type="text" onChange={(e) => {
                              let s = e.target.value;
                              let filterData = volunteerData.filter(
                                (a) =>
                                  a.firstName.toLowerCase().includes(s) ||
                                  a.lastName.toLowerCase().includes(s) ||
                                  a.email.toLowerCase().includes(s)
                              );
                              setVolunteerList(filterData);
                            }}/>
                        </InputGroup>
                        <ResultCounter list={volunteerList}/>
                      </FormGroup>
                    </Form>
                  </div>
                  {/* <div>
                    <button className="mainbuttons">Add Admin</button>

                  </div> */}
                </div>
              </CardHeader>
              <Table
                className="align-items-center table-dark table-flush"
                responsive
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Organization</th>
                    <th scope="col">Employer</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Address</th>
                    <th scope="col">Activation</th>
                    <th scope="col">Last Seen</th>
                    <th scope="col">Status</th>
                    <th scope="col">Joined Date</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <Loader loading={loading} />
                <tbody>
                  {
                  volunteerList.length?
                  volunteerList.map((v, index) => (
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">{index + 1}</span>
                          </Media>
                        </Media>
                      </th>
                      <td>{v.firstName}</td>
                      <td>{v.lastName}</td>
                      <td>{v.organization}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">{v.employer}</span>
                        </div>
                      </td>
                      <td className="text-left">{v.email}</td>
                      <td className="text-left">{v.phoneNumber}</td>
                      <td className="text-left">{v.address}</td>
                      <td className="text-left">
                        {v.activeStatus ? "Activated" : "InActive"}
                      </td>
                      <td className="text-left">
                        {moment(v.lastLogin).utc().format("DD/MM/YY")}
                      </td>
                      <td className="text-left">{"Old Account"}</td>
                      {/* <td className="text-right">{c.clientStatus?"Client":"Volunteer"}</td> */}
                      <td className="text-left">
                        {moment(v.dateCreated).utc().format("DD/MM/YY")}
                      </td>
                      <td className="text-left">
                        <div className="d-flex">
                        <div className="mr-2">
                              <Popup
                                className="popup"
                                trigger={
                                  <button
                                    className="edit"
                                    type="submit"
                                    position="center"
                                    onMouseOver={() => setVolunteer(v)}
                                  >
                                    Edit
                                  </button>
                                }
                                modal
                                closeOnDocumentClick
                                contentStyle={{
                                  // maxWidth: "300px",
                                  // padding: "20px",
                                  width: "80%",
                                  // height:"1"
                                  // background: "#fff",
                                }}
                                overlayStyle={{
                                  background: "rgba(0, 0, 0, 0.7)",
                                }}
                              >
                                {(close) => <VolunteerEdit user={volunteer}/>}
                              </Popup>
                            </div>
                          <div>
                            <Popup
                              className="popup"
                              trigger={
                                <button
                                  className="edit"
                                  type="submit"
                                  position="center"
                                  onMouseOver={() => setVolunteerId(v._id)}
                                >
                                  Delete
                                </button>
                              }
                              modal
                              closeOnDocumentClick
                              contentStyle={{
                                maxWidth: "300px",
                                padding: "20px",
                                background: "#fff",
                              }}
                              overlayStyle={{
                                background: "rgba(0, 0, 0, 0.7)",
                              }}
                            >
                              {(close) => (
                                <div>
                                  <h2 className="text-center d-flex justfy-content-center align-item-center readyreadeem">
                                    Are you sure you want to delete this item
                                  </h2>
                                  {/* <p>Are you sure you want to proceed?</p> */}
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-evenly",
                                    }}
                                  >
                                    <button
                                      className="mainbuttonss "
                                      onClick={() => {
                                        // handleNo();
                                        close();
                                      }}
                                    >
                                      No
                                    </button>
                                    <button
                                      className="mainbuttonss"
                                      type="submit"
                                      onClick={() => {
                                        close();
                                        delVolunteer(volunteerId,localStorage.getItem("token"))
                                          .then(() => {
                                            window.location.reload();
                                          })
                                          .catch((e) => {
                                            alert(e);
                                          });
                                      }}
                                    >
                                      Yes
                                    </button>
                                  </div>
                                </div>
                              )}
                            </Popup>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                  
                  :
                  <tr>
                    <td colSpan={12} align={"center"}>
                    No Record To Show
                    </td>
                  </tr>}
                </tbody>
              </Table>
            </Card>
            <CardFooter className="py-4">
              <nav aria-label="...">
                <Pagination
                  className="pagination justify-content-end mb-0"
                  listClassName="justify-content-end mb-0"
                >
                  <PaginationItem>
                    <PaginationLink
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      tabIndex="-1"
                    >
                      <i className="fas fa-angle-left" />
                      <span className="sr-only">Previous</span>
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      2 <span className="sr-only">(current)</span>
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      3
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fas fa-angle-right" />
                      <span className="sr-only">Next</span>
                    </PaginationLink>
                  </PaginationItem>
                </Pagination>
              </nav>
            </CardFooter>
          </div>
        </Row>
        <div className="header bg-gradient-info pb-3 pt-5 pt-md-5">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            New Accounts
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">125</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-chart-bar" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fa fa-arrow-up" />
                          +02%
                        </span>{" "}
                        <span className="text-nowrap">1 day</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Total Accounts
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">5000</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="fas fa-chart-pie" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-danger mr-2">
                          {/* <i className="fas fa-arrow-down" /> */}
                        </span>{" "}
                        <span className="text-nowrap">Accounts</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Active Accounts
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">3000</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                            <i className="fas fa-users" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-warning mr-2">
                          <i className="fas fa-arrow-down" />
                          +14%
                        </span>{" "}
                        <span className="text-nowrap">30 days</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Inactive Accounts
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">1000</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="fas fa-percent" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fas fa-arrow-up" />
                          +21%
                        </span>{" "}
                        <span className="text-nowrap">30 days</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </Container>
    </>
  );
}

export default Volunteers;
