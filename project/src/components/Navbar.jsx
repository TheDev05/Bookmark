import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

// import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart, useDispatchCart } from "./ContextReducer";

import toast, { Toaster } from "react-hot-toast";

import style from "../components/Navbar.module.css";
import { FaCartShopping } from "react-icons/fa6";

import { useState, useEffect } from "react";

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const [pages, updatePages] = useState([
    "Products",
    "Profile",
    "Cart",
    "Login",
    "Logout",
  ]);

  const navigate = useNavigate();
  let data = useCart();
  let size = data.length;

  const handleOpenNavMenu = (e) => {
    setAnchorElNav(e.currentTarget);
  };

  const handleCloseNavMenu = (e) => {
    setAnchorElNav(null);
    console.log(e.currentTarget.innerText);
    if (e.currentTarget.innerText.toUpperCase() == "PRODUCTS") {
      navigate("/");
    }

    if (e.currentTarget.innerText.toUpperCase() == "CART") {
      navigate("/cart");
    }

    if (e.currentTarget.innerText.toUpperCase() == "LOGIN") {
      navigate("/login");
    }

    if (e.currentTarget.innerText.toUpperCase() == "PROFILE") {
      navigate("/profile");
    }

    if (e.currentTarget.innerText.toUpperCase() == "LOGOUT") {
      const logout = () => {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("authToken");

        toast.success("Logout Succesful");
        navigate("/login");
      };

      logout();
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "#f3f2ec",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: "80px",
        color: "#896d56",
        // borderBottom: " 0.5px solid rgb(0, 0, 0, 0.1)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to={"/"}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "Times New Roman",
                fontSize: "40px",
                fontWeight: 550,
                color: "#896d56",
              }}
            >
              BookMark
            </Typography>
          </Link>

          <Box
            sx={{
              flexGrow: 1,
              color: "#896d56",
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) =>
                !localStorage.getItem("authToken") &&
                (page == "Logout" || page == "Cart" || page == "Profile") ? (
                  []
                ) : localStorage.getItem("authToken") && (page == "Login" || (page == "Cart" && size === 0))  ? (
                  []
                ) : (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                )
              )}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Times New Roman",
              fontSize: "40px",
              fontWeight: 550,
              color: "#896d56",
            }}
          >
            BookMark
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              position: "absolute",
              right: "0px",
              color: "#896d56",
            }}
          >
            {pages.map((page) =>
              !localStorage.getItem("authToken") &&
              (page == "Logout" || page == "Cart" || page == "Profile") ? (
                []
              ) : localStorage.getItem("authToken") &&
                (page == "Login" || (page == "Cart" && size === 0)) ? (
                []
              ) : (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "#896d56", display: "block" }}
                >
                  {page}
                </Button>
              )
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;

// ********************************************

// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useCart, useDispatchCart } from "./ContextReducer";

// import toast, { Toaster } from "react-hot-toast";

// import style from "../components/Navbar.module.css";
// import { FaCartShopping } from "react-icons/fa6";

// export default function Navbar() {
//   const navigate = useNavigate();
//   let data = useCart();

//   const logout = () => {
//     localStorage.removeItem("userEmail");
//     localStorage.removeItem("authToken");

//     toast.success("Logout Succesful");
//     navigate("/login");
//   };

//   return (
//     <div className={style.nav}>
//       <Link to={"/"}>
//         {" "}
//         <div className={style.logo}>Bookmark</div>{" "}
//       </Link>
//       <div className={style.auth}>
//         <Link to={"/"}>
//           {" "}
//           <div className={style.home}> Home</div>{" "}
//         </Link>

//         {!localStorage.getItem("authToken") ? (
//           <>
//             <Link to={"/createuser"}>
//               {" "}
//               <div className={style.signup}> Signup</div>{" "}
//             </Link>
//             <Link to={"/login"}>
//               {" "}
//               <div className={style.signin}> Login</div>{" "}
//             </Link>
//           </>
//         ) : (
//           <>
//             <Link to={"/profile"}>
//               {" "}
//               <div className={style.profile}> Profile</div>{" "}
//             </Link>

//             <div className={style.logout} onClick={logout}>
//               Logout
//             </div>

//             {data.length != 0 ? (
//               <Link to={"/cart"}>
//                 {" "}
//                 <div className={style.cart}>
//                   {" "}
//                   <span className={style.count}>
//                     <p>{data.length != 0 ? data.length : ""}</p>
//                   </span>
//                   <FaCartShopping />
//                 </div>{" "}
//               </Link>
//             ) : (
//               ""
//             )}
//           </>
//         )}
//       </div>
//     </div>

//     // <div>
//     //   <nav className="navbar navbar-expand-lg navbar-light bg-primary ">
//     //     <div className="container-fluid">
//     //       <Link className="navbar-brand" to="/">
//     //         GoFood
//     //       </Link>
//     //       <button
//     //         className="navbar-toggler"
//     //         type="button"
//     //         data-bs-toggle="collapse"
//     //         data-bs-target="#navbarNav"
//     //         aria-controls="navbarNav"
//     //         aria-expanded="false"
//     //         aria-label="Toggle navigation"
//     //       >
//     //         <span className="navbar-toggler-icon"></span>
//     //       </button>
//     //       <div className="collapse navbar-collapse" id="navbarNav">
//     //         <ul className="navbar-nav">
//     //           <li className="nav-item">
//     //             <Link className="nav-link active" aria-current="page" to="/">
//     //               Home
//     //             </Link>
//     //           </li>

//     //           {!localStorage.getItem("authToken") ? (
//     //             <>
//     //               <li className="nav-item">
//     //                 <Link className="nav-link" to="/login">
//     //                   Login
//     //                 </Link>
//     //               </li>

//     //               <li className="nav-item">
//     //                 <Link className="nav-link" to="/createuser">
//     //                   SignUp
//     //                 </Link>
//     //               </li>
//     //             </>
//     //           ) : (
//     //             <>
//     //               <Link to="/profile">
//     //                 {" "}
//     //                 <button>Profile</button>
//     //               </Link>

//     //               {data.length != 0 ? (
//     //                 <Link to={"/cart"}>
//     //                   <button>
//     //                     Cart {data.length != 0 ? data.length : ""}
//     //                   </button>{" "}
//     //                 </Link>
//     //               ) : (
//     //                 ""
//     //               )}

//     //               <button onClick={logout}>Log Out</button>
//     //             </>
//     //           )}
//     //         </ul>
//     //       </div>
//     //     </div>
//     //   </nav>
//     // </div>
//   );
// }
