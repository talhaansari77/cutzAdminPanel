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

import Header from "components/Headers/Header.js";
import Loader from "utilities/Loaders";
import axios from "axios";
import { Urls } from "utilities/Urls";
import moment from "moment";
import { ResultCounter } from "components/ResultCounter";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { MyBottomTabs } from "components/MyBottomTabs";

function VolunteersRecord() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [volunteerList, setVolunteerList] = useState([]);
  const [volunteerData, setVolunteerData] = useState([]);
  const navigate = useNavigate();
  const [volunteerRes, setVolunteerRes] = useState([]);
  const [volunteerEvents, setVolunteerEvents] = useState([]);
  const [volunteerGroups, setVolunteerGroups] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
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
      selector: (row) => row.volunteer.firstName,
    },
    {
      name: "Last Name",
      sortable: true,
      selector: (row) => row.volunteer.lastName,
    },
    {
      name: "Organization",
      sortable: true,
      selector: (row) => row.volunteer.organization,
    },
    {
      name: "Event",
      sortable: true,
      selector: (row) => row?.event?.eventType,
    },
    {
      name: "Location",
      sortable: true,
      selector: (row) => row?.event?.addresses?.[0].place,
    },
    {
      name: "Reserved Time",
      sortable: true,
      selector: (row) => moment(row?.group?.eventStartTime).utc().format("DD/MM/YY h:s A"),
    },
    {
      name: "End Time",
      sortable: true,
      selector: (row) => moment(row?.group?.eventEndTime).utc().format("DD/MM/YY h:s A"),
    },
    {
      name: "Status",
      sortable: true,
      selector: (row) =>
        "Present at",
    },
    {
      name: "Action",
      sortable: true,
      selector: (row) =>row?.event?.event_id,
    },
    
  ];
  const getVolunteerRes = async () => {
    setLoading(true);
    await axios
      .get(Urls.BaseUrl + Urls.EVENTS_RESERVATION_VOLUNTEER + "/getall")
      .then((reserves) => {
        axios
          .get(`${Urls.BaseUrl}${Urls.GET_VOLUNTEER}/getall`)
          .then((volunteer) => {
            axios
              .get(`${Urls.BaseUrl}${Urls.TIMING}`)
              .then((groups) => {
                axios
                  .get(`${Urls.BaseUrl}${Urls.GET_EVENTS}`)
                  .then((events) => {
                    setVolunteerRes(reserves.data);
                    setVolunteerGroups(groups.data);
                    setVolunteers(volunteer.data);
                    setVolunteerEvents(events.data);
                    setLoading(false);
                  })
                  .catch((e) => {
                    setLoading(false);
                    alert(e);
                  });
              })
              .catch((e) => {
                setLoading(false);
                alert(e);
              });
          })
          .catch((e) => {
            setLoading(false);
            alert(e);
          });
      })
      .catch((e) => {
        setLoading(false);
        alert(e);
      });
  };
  useEffect(() => {
    if (!token) {
        navigate("/");
      }
    getVolunteerRes();
  }, []);

  useEffect(() => {
    let data = [];
    volunteerRes.map((reserve) => {
      let volunteer = volunteers.find((c) => c._id === reserve.volunteerID);
      let group = volunteerGroups.find((g) => g._id === reserve.eventGroupID);
      let event = volunteerEvents.find((e) => e._id === reserve.eventID);
      data.push({ ...reserve, volunteer, group, event });
    });
    setVolunteerList(data);
    setVolunteerData(data);
    console.log(data);
  }, [volunteerEvents]);

  return (
    <>
      <Header />

      <div className="mb-3 p-4 mb-6 admin">
        <div>
          <h1 className="admin">Volunteers Record</h1>
        </div>
        <div>
          <h5 className="admin">Welcome to your Volunteers Record Manager</h5>
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
                                let filterData = volunteerData.filter(
                                  (a) =>
                                    a.volunteer.firstName.toLowerCase().includes(s) ||
                                    a.volunteer.lastName.toLowerCase().includes(s) ||
                                    a.volunteer.email.toLowerCase().includes(s)
                                );
                                setVolunteerList(filterData);
                            }}
                          />
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
                    <th scope="col">Event</th>
                    <th scope="col">Location</th>
                    <th scope="col">Reserved Time</th>
                    <th scope="col">End Time</th>
                    <th scope="col">Status</th>
                    <th scope="col">Event ID</th>
                  </tr>
                </thead>
                <Loader loading={loading} />
                <tbody>
                {volunteerList.length ? (
                    volunteerList.map((v, index) => (
                      <tr>
                        <th scope="row">
                          <Media className="align-items-center">
                            <Media>
                              <span className="mb-0 text-sm">{index + 1}</span>
                            </Media>
                          </Media>
                        </th>
                        <td>{v.volunteer.firstName}</td>
                        <td>{v.volunteer.lastName}</td>
                        <td>{v.volunteer.employer}</td>
                        {/* <td>
                          <div className="d-flex align-items-center">
                            <span className="mr-2">{c.client.organization}</span>
                          </div>
                        </td> */}
                        <td className="text-right">{v?.event?.eventType}</td>
                        <td className="text-right">{v?.event?.addresses?.[0].place}</td>
                        <td className="text-right">{moment(v?.group?.eventStartTime).utc().format("DD/MM/YY h:s A")}</td>
                        <td className="text-right">{moment(v?.group?.eventEndTime).utc().format("DD/MM/YY h:s A")}</td>
                        <td className="text-right">ended at</td>
                        <td className="text-right">{v?.event?.event_id}</td>
                        
                        {/* <td className="text-right"> */}
                        {/* <div className="d-flex"> */}
                        {/* <div><button className="edit mr-2">Edit</button></div> */}
                        {/* <div><button className="delete">Cancel</button></div> */}
                        {/* </div> */}
                        {/* </td> */}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={12} align={"center"}>
                        No Record To Show
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card>
            
          </div>
        </Row>
        <div className="header bg-gradient-info pb-3 pt-5 pt-md-5">
          <MyBottomTabs/>
        </div>
      </Container>
    </>
  );
}

export default VolunteersRecord;
