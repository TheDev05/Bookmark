import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart, useDispatchCart } from "./ContextReducer";

import toast, { Toaster } from "react-hot-toast";

import style from "../components/Navbar.module.css";
import { FaCartShopping } from "react-icons/fa6";

export default function Navbar() {
  const navigate = useNavigate();
  let data = useCart();

  const logout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("authToken");

    toast.success("Logout Succesful");
    navigate("/login");
  };

  return (
    <div className={style.nav}>
      <Link to={"/"}>
        {" "}
        <div className={style.logo}>Bookmark</div>{" "}
      </Link>
      <div className={style.auth}>
        <Link to={"/"}>
          {" "}
          <div className={style.home}> Home</div>{" "}
        </Link>

        {!localStorage.getItem("authToken") ? (
          <>
            <Link to={"/createuser"}>
              {" "}
              <div className={style.signup}> Signup</div>{" "}
            </Link>
            <Link to={"/login"}>
              {" "}
              <div className={style.signin}> Login</div>{" "}
            </Link>
          </>
        ) : (
          <>
            <Link to={"/profile"}>
              {" "}
              <div className={style.profile}> Profile</div>{" "}
            </Link>

            <div className={style.logout} onClick={logout}>
              Logout
            </div>

            {data.length != 0 ? (
              <Link to={"/cart"}>
                {" "}
                <div className={style.cart}>
                  {" "}
                  <span className={style.count}>
                    <p>{data.length != 0 ? data.length : ""}</p>
                  </span>
                  <FaCartShopping />
                </div>{" "}
              </Link>
            ) : (
              ""
            )}
          </>
        )}
      </div>
    </div>

    // <div>
    //   <nav className="navbar navbar-expand-lg navbar-light bg-primary ">
    //     <div className="container-fluid">
    //       <Link className="navbar-brand" to="/">
    //         GoFood
    //       </Link>
    //       <button
    //         className="navbar-toggler"
    //         type="button"
    //         data-bs-toggle="collapse"
    //         data-bs-target="#navbarNav"
    //         aria-controls="navbarNav"
    //         aria-expanded="false"
    //         aria-label="Toggle navigation"
    //       >
    //         <span className="navbar-toggler-icon"></span>
    //       </button>
    //       <div className="collapse navbar-collapse" id="navbarNav">
    //         <ul className="navbar-nav">
    //           <li className="nav-item">
    //             <Link className="nav-link active" aria-current="page" to="/">
    //               Home
    //             </Link>
    //           </li>

    //           {!localStorage.getItem("authToken") ? (
    //             <>
    //               <li className="nav-item">
    //                 <Link className="nav-link" to="/login">
    //                   Login
    //                 </Link>
    //               </li>

    //               <li className="nav-item">
    //                 <Link className="nav-link" to="/createuser">
    //                   SignUp
    //                 </Link>
    //               </li>
    //             </>
    //           ) : (
    //             <>
    //               <Link to="/profile">
    //                 {" "}
    //                 <button>Profile</button>
    //               </Link>

    //               {data.length != 0 ? (
    //                 <Link to={"/cart"}>
    //                   <button>
    //                     Cart {data.length != 0 ? data.length : ""}
    //                   </button>{" "}
    //                 </Link>
    //               ) : (
    //                 ""
    //               )}

    //               <button onClick={logout}>Log Out</button>
    //             </>
    //           )}
    //         </ul>
    //       </div>
    //     </div>
    //   </nav>
    // </div>
  );
}
