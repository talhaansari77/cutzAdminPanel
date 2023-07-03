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

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Urls } from "utilities/Urls";
import { getEvent } from "services/Event";
import { getOrganizationById } from "services/Organization";
import { delEvent } from "services/Event";
import Loader from "utilities/Loaders";
import { useSelector } from "react-redux";
import { ResultCounter } from "components/ResultCounter";
import EventEdit from "components/EventEdit";
import { getOrganizations } from "services/Organization";
import moment from "moment";
import DataTable from "react-data-table-component";
import { MyBottomTabs } from "components/MyBottomTabs";

function ManageEvent() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const [eventData, setEventData] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [eventId, setEventId] = useState("");
  const [event, setEvent] = useState({});
  const [events, setEvents] = useState([]);
  const [groups, setGroups] = useState([]);
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.CreateUserReducer);
  const token = localStorage.getItem("token");
  const columns = [
    {
      name: "ID",
      selector: (row, index) => index + 1,
      // sortable: true,
    },
    {
      name: "# People",
      sortable: true,
      selector: (row) => row.eventCapacity,
    },
    {
      name: "# Groups",
      sortable: true,
      selector: (row) => 8,
    },
    {
      name: "Group Size",
      sortable: true,
      selector: (row) => Math.floor(row.eventCapacity / 8),
    },
    {
      name: "Group Time",
      sortable: true,
      selector: (row) => row.groupServicePeriod + " hour",
    },
    {
      name: "Organization",
      sortable: true,
      selector: (row) => row.org.organizationName,
    },
    {
      name: "Event",
      sortable: true,
      selector: (row) => row.eventType,
    },
    {
      name: "Location",
      sortable: true,
      selector: (row) => row.addresses[0].house,
    },
    {
      name: "Start Time",
      sortable: true,
      selector: (row) =>
        moment(row?.group?.eventStartTime).utc().format("MM/DD/YY h:s A"),
    },
    {
      name: "End Time",
      sortable: true,
      selector: (row) =>
        moment(row?.group?.eventEndTime).utc().format("MM/DD/YY h:s A"),
    },
    {
      name: "Action",
      sortable: true,
      selector: (row) => <MyActionBtn e={row} />,
    },
    {
      name: "Report",
      sortable: true,
      selector: (row) => (
        <div className="d-flex">
          <div>
            <img
              width={30}
              src={require("../../assets/img/imges/Group (2).png")}
              alt=""
              style={{ color: "black" }}
            />
          </div>
        </div>
      ),
    },
  ];

  const MyActionBtn = ({ e }) => (
    <div className="">
      <div className="mr-2">
        <Popup
          className="popup"
          trigger={
            <button
              className="edit"
              type="submit"
              position="center"
              onMouseOver={() => setEvent(e)}
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
          {(close) => <EventEdit event={event} />}
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
              onMouseOver={() => setEventId(e._id)}
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
                    delEvent(eventId)
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
    getEvent()
      .then((events) => {
        getOrganizations()
          .then((orgs) => {
            axios
              .get(`${Urls.BaseUrl}${Urls.TIMING}`)
              .then((groups) => {
                setEvents(events.data);
                setOrgs(orgs.data);
                setGroups(groups.data);
                setLoading(false);
              })
              .catch((e) => {
                setLoading(false);
                alert(e);
              });
          })
          .catch(() => {
            setLoading(false);
          });
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const mergeOrgData = () => {
    let data = [];
    events.map((event) => {
      let org = orgs.find((o) => o._id === event.orgId);
      let group = groups.find((g) => g.eventId === event._id);
      data.push({ ...event, org, group });
    });
    setEventList(data);
    setEventData(data);
    console.log(data);
  };

  useEffect(() => {
    mergeOrgData();
  }, [orgs]);

  const navigateHome = () => {
    // 👇️ navigate to /
    navigate("/admin/createvent");
  };
  return (
    <>
      <Header />

      <div className="mb-3 p-4 mb-6 admin">
        <div>
          <h1 className="admin">Events</h1>
        </div>
        <div>
          <h5 className="admin">Welcome to your Events Manager</h5>
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
                          <Input
                            placeholder="Search"
                            type="text"
                            onChange={(e) => {
                              let s = e.target.value;
                              let filterData = eventData.filter(
                                (a) =>
                                  a.org.organizationName.toLowerCase().includes(s) ||
                                  a.eventType.toLowerCase().includes(s) ||
                                  a.addresses[0].house.toLowerCase().includes(s)
                              );
                              setEventList(filterData);
                            }}
                          />
                        </InputGroup>
                        <ResultCounter list={eventList} />
                      </FormGroup>
                    </Form>
                  </div>
                  <div>
                    <button onClick={navigateHome} className="mainbuttons">
                      Add Event
                    </button>
                  </div>
                </div>
              </CardHeader>
              {/* <Loader /> */}
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
                // progressComponent={<Loader />}
                columns={columns}
                data={eventList}
                pagination
                striped
              />
            </Card>
            {/* <CardFooter className="py-4">
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
            </CardFooter> */}
          </div>
        </Row>
        <MyBottomTabs/>
      </Container>
    </>
  );
}

export default ManageEvent;
