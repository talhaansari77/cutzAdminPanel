import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import CreateEvent from "views/events/CreateEvent";
import Notification from "views/Notification";
import Description from "views/Description";
import Loginpage from "views/Loginpage";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<BrowserRouter>
		<Routes>
			<Route path="/admin/*" element={<AdminLayout />} />
			<Route path="/auth/*" element={<AuthLayout />} />
			<Route path="/createvent/*" element={<CreateEvent/>} />
			<Route path="/notification/*" element={<Notification/>} />
			<Route path="/desription/*" element={<Description/>} />
			<Route path="*" element={<Navigate to="/admin/index" replace />} />
			<Route path="/Events/createvent" element={<Navigate to="/admin/Events/createvent" replace />} />
			<Route path="/Events/notification" element={<Navigate to="/admin/Events/notification" replace />} />
			<Route path="/Events/desription" element={<Navigate to="/admin/Events/desription" replace />} />
			<Route path="/" element={<Loginpage/>}/>
		</Routes>
	</BrowserRouter>
);
