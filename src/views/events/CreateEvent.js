import React, { useEffect, useState } from "react";
import "../../assets/css/argon-dashboard-react.min.css";
import { Card, Container, Row, CardHeader, Input } from "reactstrap";

import Header from "components/Headers/Header.js";
import { createOrganization } from "services/Organization";
import { getOrganizations } from "services/Organization";
import { createEvent } from "services/Event";
import loaderAnimation from "assets/Loaders";
import Lottie from "react-lottie";
import axios from "axios";
import { Urls } from "utilities/Urls";
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loaderAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
function CreateEvent() {
  const [loading, setLoading] = useState(false);
  const [orgList, setOrgList] = useState([]);
  const [orgName, setOrgName] = useState("");
  const [timings, setTimings] = useState({
    eventId: "",
    priorEventStartTime: "",
    priorEventEndTime: "",
    eventStartTime: "",
    eventEndTime: "",
    afterEventStartTime: "",
    afterEventEndTime: "",
    capacity: 100,
  });
  const [state, setState] = useState({
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    orgId: "",
    event_id: 23,
    eventType: "",
    addresses: [
      {
        location: {
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        place: "",
        house: "",
        zip: "",
        _id: "64352db63be4664fe6a9cfbf",
      },
      {
        location: {
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        place: "Ford Garage Dearborn",
        house: "21906 Garrison Street",
        zip: "Dearborn, MI 48124",
        _id: "64352db63be4664fe6a9cfbf",
      },
    ],
    eventCapacity: 99,
    groupServicePeriod: "abc",
    volunteerCapacity: 20,
    eventCode: "1234",
  });

  const createTiming = async (id) => {
    await axios
      .post(Urls.BaseUrl + "api/v1/timing", {
        ...timings,
        eventId: id,
      })
      .then((r) => {
        setLoading(false);
        alert("Event added successfully");
      })
      .catch((e) => {
        alert(e);
        setLoading(false);
      });
  };

  const addEvent = (data) => {
    createEvent(data)
      .then((r) => {
        createTiming(r.data.id);
      })
      .catch((e) => {
        alert(e);
        setLoading(false);
      });
  };

  const onSubmit = () => {
    setLoading(true);
    const res = orgList.find(
      (o) => o.organizationName.toLowerCase() === orgName.toLowerCase()
    );
    if (res) {
      // res.organizationName
      addEvent({ ...state, orgId: res._id });
    } else {
      createOrganization({ organizationName: orgName }).then((r)=>{
        addEvent({ ...state, orgId: r.data.id });
      }).catch((e) => {
        alert(e);
        setLoading(false);
      });
    }
  };

  useEffect(() => {
    getOrganizations().then((r) => {
      setOrgList(r.data);
    });
  }, []);

  return (
    <>
      <Header />

      <div className="mb-3 p-4 mb-6 admin">
        <div>
          <h1 className="admin">Create Event</h1>
        </div>
      </div>

      {/* Page content */}
      <Container className="mt--7 mb-5 bg-gradient-info " fluid>
        {/* Dark table */}
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader
                className="bg-transparent"
                style={{ borderBottom: "2px solid #666CA3" }}
              >
                <div>
                  <h1 className="text-center d-flex align-item-center justify-content-center">
                    Add Event
                  </h1>
                </div>
              </CardHeader>
              <div className="d-flex justify-content-around pt-5">
                <div className="inputborder">
                  <Input
                    className="inputborder"
                    type="text"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="Organaization"
                  ></Input>
                </div>
                <div className="inputborder">
                  <Input
                    className="inputborder"
                    type="text"
                    placeholder="Type Event"
                    value={state.eventType}
                    onChange={(e) =>
                      setState({ ...state, eventType: e.target.value })
                    }
                  ></Input>
                </div>
                <div></div>
              </div>

              {/* <div className="d-flex justify-content-around pt-5">
                <div className="inputborder">
                  <Input
                    className="inputborder"
                    type="text"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="Organaization"
                  ></Input>
                </div>
                <div className="inputborder">
                  <Input
                    className="inputborder"
                    type="text"
                    placeholder="Type Event"
                    value={state.eventType}
                    onChange={(e) =>
                      setState({ ...state, eventType: e.target.value })
                    }
                  ></Input>
                </div>
                <div></div>
              </div> */}

              <div className="d-flex justify-content-around pt-5">
                <div className="inputborder">
                  <Input
                    className="inputborder"
                    type="text"
                    value={state.addresses[0].place}
                    onChange={(e) =>
                      setState({
                        ...state,
                        addresses: [
                          { ...state.addresses[0], place: e.target.value },
                          state.addresses[1],
                        ],
                      })
                    }
                    placeholder="Place"
                  ></Input>
                </div>
                <div className="inputborder">
                  <Input
                    className="inputborder"
                    type="text"
                    placeholder="House"
                    value={state.addresses[0].house}
                    onChange={(e) =>
                      setState({
                        ...state,
                        addresses: [
                          { ...state.addresses[0], house: e.target.value },
                          state.addresses[1],
                        ],
                      })
                    }
                  ></Input>
                </div>
                <div>{/* <Input>asdf</Input> */}</div>
              </div>
              <div className="pt-5 d-flex justify-content-center">
                <div
                  className="inputborder"
                  style={{ width: "100%", paddingRight: "1%" }}
                >
                  <Input
                    className="inputborder"
                    type="text"
                    placeholder="Zip"
                    value={state.addresses[0].zip}
                    onChange={(e) =>
                      setState({
                        ...state,
                        addresses: [
                          { ...state.addresses[0], zip: e.target.value },
                          state.addresses[1],
                        ],
                      })
                    }
                  ></Input>
                </div>
              </div>
              <div className="d-flex justify-content-around pt-5">
                <div className="inputborder">
                  <lable className="evnetcolor">Prep Event Start Time</lable>
                  <Input
                    className="inputborder"
                    type="date"
                    placeholder="Enter a date"
                    value={timings.priorEventStartTime}
                    onChange={(e) =>
                      setTimings({
                        ...timings,
                        priorEventStartTime: e.target.value,
                      })
                    }
                  ></Input>
                </div>
                <div className="inputborder">
                  <lable className="evnetcolor">Prep Event End Time</lable>
                  <Input
                    className="inputborder"
                    type="date"
                    placeholder="Type Event"
                    value={timings.priorEventEndTime}
                    onChange={(e) =>
                      setTimings({
                        ...timings,
                        priorEventEndTime: e.target.value,
                      })
                    }
                  ></Input>
                </div>
                <div>{/* <Input>asdf</Input> */}</div>
              </div>
              <div className="d-flex justify-content-around pt-5">
                <div className="inputborder">
                  <lable className="evnetcolor">Event Start Time</lable>
                  <Input
                    className="inputborder"
                    type="date"
                    placeholder="Enter a date"
                    value={timings.eventStartTime}
                    onChange={(e) =>
                      setTimings({ ...timings, eventStartTime: e.target.value })
                    }
                  ></Input>
                </div>
                <div className="inputborder">
                  <lable className="evnetcolor">Event End Time</lable>
                  <Input
                    className="inputborder"
                    type="date"
                    placeholder="Type Event"
                    value={timings.eventEndTime}
                    onChange={(e) =>
                      setTimings({ ...timings, eventEndTime: e.target.value })
                    }
                  ></Input>
                </div>
                <div>{/* <Input>asdf</Input> */}</div>
              </div>

              <div className="d-flex justify-content-around pt-5">
                <div className="inputborder">
                  <lable className="evnetcolor">Clean Up Start Time</lable>
                  <Input
                    className="inputborder"
                    type="date"
                    placeholder="Enter a date"
                    value={timings.afterEventStartTime}
                    onChange={(e) =>
                      setTimings({
                        ...timings,
                        afterEventStartTime: e.target.value,
                      })
                    }
                  ></Input>
                </div>
                <div className="inputborder">
                  <lable className="evnetcolor">Clean Up End Time</lable>
                  <Input
                    className="inputborder"
                    type="date"
                    placeholder="Type Event"
                    value={timings.afterEventEndTime}
                    onChange={(e) =>
                      setTimings({
                        ...timings,
                        afterEventEndTime: e.target.value,
                      })
                    }
                  ></Input>
                </div>
                <div>{/* <Input>asdf</Input> */}</div>
              </div>
              <div className="d-flex pb-4 justify-content-around pt-4">
                <div className="inputborder" style={{ marginTop: "23px" }}>
                  <Input
                    className="inputborder"
                    type="number"
                    placeholder="Event Capacity"
                    value={state.eventCapacity}
                    onChange={(e) =>
                      setState({ ...state, eventCapacity: e.target.value })
                    }
                  ></Input>
                </div>
                <div className="inputborder">
                  <select
                    class="form-select pt-3 inputborder"
                    style={{ colo: "#666CA3" }}
                    aria-label="Default select example"
                    onChange={(e) =>
                      setState({ ...state, groupServicePeriod: e.target.value })
                    }
                  >
                    <option selected hidden disabled>
                      Group service period
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
                <div>{/* <Input>asdf</Input> */}</div>
              </div>

              <div className="addevents">
                <button className="mainbuttons" onClick={onSubmit}>
                  Add Event
                </button>
                {loading ? (
                  <Lottie
                    style={{}}
                    options={defaultOptions}
                    height={30}
                    width={30}
                    isClickToPauseDisabled
                  />
                ) : (
                  <></>
                )}
              </div>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default CreateEvent;
