import React, { useContext, useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { NavLink, useNavigate } from "react-router-dom";
import { LoginContext } from "../components/ContextProvider/Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const { logindata, setLoginData } = useContext(LoginContext);
  const notifyLogout = () => toast("Logout Successfull!");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const Login = () => {
    navigate("/login");
  };
  const [list, setList] = useState([]);

  const logoutuser = async () => {
    console.log("aya ke ni");
    let token = localStorage.getItem("usersdatatoken");
    console.log("token :", token);

    const res = await fetch("/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
      credentials: "include",
    });

    console.log("respms", res);

    const data = await res.json();
    console.log(data);

    if (data.status == 201) {
      console.log("user logout");
      localStorage.removeItem("usersdatatoken");
      setLoginData(false);
      navigate("/");
    } else {
      console.log("error");
    }
  };
  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");
    console.log(token);
    const res = await fetch("http://localhost:5000/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await res.json();
    //console.log(data);
    if (data.status == 401 || !data) {
      console.log("User Not verify");
    } else if (data.status === 201) {
      console.log("admin verify");
      setLoginData(data);
      navigate("/admin");
    } else {
      console.log("user verify", data);
      setLoginData(data);
      navigate("/");
    }
  };
  const refreshHandler = () => {
    let token = localStorage.getItem("usersdatatoken");

    console.log(token);
    if (token != null) {
      DashboardValid();
    } else {
      console.log("Nothing to do ");
    }
  };

  useEffect(() => {
    console.log("loginData in header ");
  }, []);

  return (
    <>
      <ToastContainer />
      <header className="header-section d-none d-xl-block">
        <div className="header-wrapper">
          <div className="header-bottom header-bottom-color--golden section-fluid sticky-header sticky-color--golden">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12 d-flex align-items-center justify-content-between">
                  <div className="header-logo">
                    <div className="logo">
                      <a href="index.html">
                        <img src="assets/images/logo/logo_white.png" alt="" />
                      </a>
                    </div>
                  </div>

                  <div className="main-menu menu-color--black menu-hover-color--golden">
                    <nav>
                      <ul>
                        <li className="has-dropdown">
                          <NavLink
                            className="active main-menu-link"
                            to={"/"}
                            onClick={refreshHandler}
                          >
                            Home{" "}
                          </NavLink>

                          {/* <ul className="sub-menu">
                                            <li><a href="index.html">Home 1</a></li>
                                            <li><a href="index-2.html">Home 2</a></li>
                                            <li><a href="index-3.html">Home 3</a></li>
                                            <li><a href="index-4.html">Home 4</a></li>
                                        </ul> */}
                        </li>
                        <li className="">
                          <NavLink to={"/shop"}>Shop </NavLink>
                        </li>
                        <li className="">
                          <NavLink to={"/myaccount"}>My Account </NavLink>

                          {/* <ul className="sub-menu">
                                            <li><NavLink to={"/cart"}>Cart</NavLink></li>
                                            <li><NavLink to={"/wishlist"}>Wishlist</NavLink></li>
                                            <li><NavLink to={"/orders"}>My Orders</NavLink></li>
                                            <li><NavLink to={"/profile"}>My Profile</NavLink></li>
                                            
                                        </ul> */}
                        </li>
                        {/* <li className="">
                                        <a href="#">My Orders </a>
                                        
                                        <ul className="sub-menu">
                                            <li><a href="faq.html">Frequently Questions</a></li>
                                            <li><a href="privacy-policy.html">Privacy Policy</a></li>
                                            <li><a href="404.html">404 Page</a></li>
                                        </ul>
                                    </li> */}
                        <li>
                          <NavLink to={"/aboutus"}>About Us</NavLink>
                        </li>
                        <li>
                          <a href="https://www.linkedin.com/in/soel-shaikh/">
                            Contact Us
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>

                  <ul className="header-action-link action-color--black action-hover-color--golden">
                    {logindata?.validUserOne ? (
                      <>
                        <li>
                          <NavLink
                            to={"/wishlist"}
                            className="offcanvas-toggle"
                          >
                            <i className="icon-heart"></i>
                            <span className="item-count">
                              {logindata?.validUserOne?.wishlists?.length}
                            </span>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to={"/cart"} className="offcanvas-toggle">
                            <i className="icon-bag"></i>
                            <span className="item-count">
                              {logindata?.validUserOne?.carts?.length}
                            </span>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to={"/balance"} className="offcanvas-toggle">
                            <i className="fa fa-inr"></i>
                            <span className="item-count">
                              {logindata?.validUserOne?.balance}
                            </span>
                          </NavLink>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <NavLink to={"/login"} className="offcanvas-toggle">
                            <i className="icon-heart"></i>
                            <span className="item-count">0</span>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to={"/login"} className="offcanvas-toggle">
                            <i className="icon-bag"></i>
                            <span className="item-count">0</span>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to={"/login"} className="offcanvas-toggle">
                            <i className="fa fa-inr"></i>
                            <span className="item-count">0</span>
                          </NavLink>
                        </li>
                      </>
                    )}

                    <li onClick={handleClick}>
                      <a className="offcanvas-toggle">
                        <i
                          className="fa fa-user"
                          style={{ fontSize: "26px", marginLeft: "0.6rem" }}
                        ></i>
                      </a>
                    </li>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      {logindata?.validUserOne ? (
                        <div>
                          <MenuItem
                            onClick={() => {
                              logoutuser();
                              handleClose();
                              notifyLogout();
                            }}
                          >
                            Logout
                          </MenuItem>
                        </div>
                      ) : (
                        <div>
                          <MenuItem
                            onClick={() => {
                              Login();
                              handleClose();
                            }}
                          >
                            Login/Sign up
                          </MenuItem>
                          {/* <MenuItem onClick={
                                                            () => {
                                                                Register()
                                                                handleClose()
                                                            }}></MenuItem> */}
                        </div>
                      )}
                    </Menu>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
