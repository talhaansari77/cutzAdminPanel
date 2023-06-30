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
import DataTable from "react-data-table-component";
import { MyBottomTabs } from "components/MyBottomTabs";

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
  const columns = [
    {
      name: "ID",
      selector: (row, index) => index + 1,
      // sortable: true,
    },
    {
      name: "First Name",
      sortable: true,
      selector: (row) => row.firstName,
    },
    {
      name: "Last Name",
      sortable: true,
      selector: (row) => row.lastName,
    },
    {
      name: "Organization",
      sortable: true,
      selector: (row) => row.organization,
    },
    {
      name: "Employer",
      sortable: true,
      selector: (row) => row.employer,
    },
    {
      name: "Email",
      sortable: true,
      selector: (row) => row.email,
    },
    {
      name: "Phone",
      sortable: true,
      selector: (row) => row.phoneNumber,
    },
    {
      name: "Address",
      sortable: true,
      selector: (row) => row.address,
    },
    {
      name: "Activation",
      sortable: true,
      selector: (row) => (row.activeStatus ? "Activated" : "Deactivated"),
    },
    {
      name: "Last Seen",
      sortable: true,
      selector: (row) => moment(row.lastLogin).utc().format("DD/MM/YY"),
    },
    {
      name: "Status",
      sortable: true,
      selector: (row) =>
        moment(row.dateCreated).utc().format("DD/MM/YY") ===
        moment().utc().format("DD/MM/YY")
          ? "New Account"
          : "Old Account",
    },
    {
      name: "Joined Date",
      sortable: true,
      selector: (row) => moment(row.dateCreated).utc().format("DD/MM/YY"),
    },
    {
      name: "Action",
      sortable: true,
      selector: (row) => <MyActionBtn v={row} />,
    },
  ];
  const MyActionBtn = ({ v }) => (
    <div className="">
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
  );
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
              <DataTable
                customStyles={{
                  headRow: {
                    style: {
                      backgroundColor: "#F07E2B",
                      color: "white",
                      fontWeight: "bold",
                    },
                  },
                }}
                progressPending={loading}
                columns={columns}
                data={volunteerList}
                pagination
                striped
              />
              
            </Card>
          </div>
        </Row>
        <MyBottomTabs/>
      </Container>
    </>
  );
}

export default Volunteers;
