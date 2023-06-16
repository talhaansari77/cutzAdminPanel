import React, { useState } from "react";
import loginpagelogo from "../assets/img/imges/image_2023-01-19_224110357 2.png";
import { useNavigate } from "react-router-dom";

function Loginpage() {
  const navigate = useNavigate();

  const navigateHome = () => {
    // 👇️ navigate to /
    navigate("/admin/index");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const onSubmit = () => {
    if (!email) {
      setError({ ...error, email: "invalid email" });
    } else if (!password) {
      setError({ ...error, email: "invalid password" });
    } else {
      if (email === "innerview34@gmail.com" && password === "12345") {
        navigateHome();
      }
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
            onKeyUp={()=>setError({...error,email:''})}
          />
          <p style={{color:"red"}}>{error.email}</p>
          <input
            className="d-flex in2"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            onKeyUp={()=>setError({...error,password:''})}

          />
          <p style={{color:"red"}}>{error.password}</p>
          <button className="btn1" onClick={onSubmit}>
            Login
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