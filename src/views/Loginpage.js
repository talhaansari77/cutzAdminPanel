import React, { useState } from "react";
import loginpagelogo from "../assets/img/imges/image_2023-01-19_224110357 2.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Urls } from "utilities/Urls";
import Lottie from "react-lottie";
import loaderAnimation from "assets/Loaders";

function Loginpage() {
  const navigate = useNavigate();

  const navigateHome = (email) => {
    email === "innerview34@gmail.com"
      ? navigate("/admin/index")
      : navigate("/admin/clients/manageclients");

      window.location.reload()
  };

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const addUser = (data) =>
    dispatch({
      type: "CreateUser",
      payload: data,
    });
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loaderAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const onSubmit = async () => {
    let data = { email, password };
    if (!email) {
      setError({ ...error, email: "invalid email" });
    } else if (!password) {
      setError({ ...error, email: "invalid password" });
    } else {
      setLoading(true);
      axios
        .post(Urls.BaseUrl + Urls.ADMIN + "/login", data)
        .then((r) => {
          axios
            .get(Urls.BaseUrl + Urls.ADMIN + "/" + r.data.id, {
              headers: {
                Authorization: "Bearer " + r.data.token,
              },
            })
            .then((i) => {
              // addUser({ ...i.data, token: r.data.token });
              localStorage.setItem("token", r.data.token);
              localStorage.setItem("firstName", i.data.firstName);
              localStorage.setItem("lastName", i.data.lastName);
              localStorage.setItem("email", i.data.email);
              setTimeout(() => {
                navigateHome(i.data.email);
              }, 500);
              setLoading(false);
            })
            .catch((e) => {
              setLoading(false);
            });
        })
        .catch((e) => {
          setLoading(false);
          alert(e);
        });
    }
  };

  return (
    <>
      <div
        className="container_fluied d-flex justify-content-between align-items-center"
        style={{ position: "relative", padding: "7px" }}
      >
        <div>
          <img width={200} src={loginpagelogo} alt="" />
        </div>
        <div>
          <h1>Admin</h1>
        </div>
      </div>
      <div className="line"></div>

      <div className="mt-2 d-flex justify-content-center mainstyle">
        <div className="loginhearder">
          <h2 className="headlogin"> Welcome</h2>
          <input
            className="d-flex in1"
            placeholder="email"
            type="Email"
            onChange={(e) => setEmail(e.target.value)}
            onKeyUp={() => setError({ ...error, email: "" })}
          />
          <p style={{ color: "red" }}>{error.email}</p>
          <input
            className="d-flex in2"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            onKeyUp={() => setError({ ...error, password: "" })}
          />
          <p style={{ color: "red" }}>{error.password}</p>
          <button className="btn1" onClick={onSubmit}>
            {loading ? (
              <Lottie
                style={{}}
                options={defaultOptions}
                height={30}
                width={30}
                isClickToPauseDisabled
              />
            ) : (
              "Login"
            )}
          </button>
          <p className="loginpara">FORGOT PASSWORD</p>
        </div>
        {/* <div className="d-flex">
                <input type="email" />
                <input type="email" />
            </div> */}
      </div>
    </>
  );
}

export default Loginpage;
