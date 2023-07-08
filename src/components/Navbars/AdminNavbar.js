import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  // Form,
  // FormGroup,
  // InputGroupAddon,
  // InputGroupText,
  // Input,
  // InputGroup,
  Navbar,
  Nav,
  // Container,
  Media,
  Modal,
} from "reactstrap";
import { Popup } from "reactjs-popup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const AdminNavbar = (props) => {
  const token = localStorage.getItem("token");
  const { user } = useSelector((state) => state.CreateUserReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const navigateHome = () => {
    // 👇️ navigate to /
    navigate("/admin/notification");
  };

  const navigateHomee = () => {
    // 👇️ navigate to /
    navigate("/admin/desription");
  };

  return (
    <>
      <Navbar
        className="navbar-top navbar-dark d-flex justify-content-end "
        expand="md"
        id="navbar-main"
      >
        <span
          className="ni ni-bell-55 mr-3"
          onClick={navigateHomee}
          alt="asdf"
        ></span>

        <span
          class="fas fa-envelope mr-2"
          onClick={navigateHome}
          alt="asdf"
        ></span>

        <Nav
          className="align-items-center d-none d-md-flex pr-4 d-sm-block"
          navbar
        >
          <UncontrolledDropdown nav>
            <DropdownToggle className="pr-0" nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img
                    alt="..."
                    src={require("../../assets/img/theme/team-4-800x800.jpg")}
                  />
                </span>
                <Media className="ml-2 d-none d-lg-block">
                  <span
                    className="mb-0 text-sm font-weight-bold"
                    style={{ color: "#666CA3" }}
                  >
                    {localStorage.getItem("firstName") + " " + localStorage.getItem("lastName")}
                  </span>
                </Media>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">Welcome!</h6>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-single-02" />
                <span>My profile</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-settings-gear-65" />
                <span>Settings</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-calendar-grid-58" />
                <span>Activity</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-support-16" />
                <span>Support</span>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                <i className="ni ni-user-run" />
                <button
                      className="rdinppx1"
                      type="submit"
                      onClick={() => {
                        localStorage.clear();
                        navigate("/");
                        window.location.reload()
                      }}
                      position="center"
                    >
                      Log out
                    </button>
                
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* </Container> */}
      </Navbar>
    </>
  );
};

export default AdminNavbar;
