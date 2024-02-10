import React from "react";

import toast, { Toaster } from "react-hot-toast";

import { Link } from "react-router-dom";
import { useCart, useDispatchCart } from "./ContextReducer";
import { useNavigate } from "react-router-dom";

import img1 from "../assests/payment.png";

import style from "../components/Cart.module.css";
import { MdRemoveShoppingCart } from "react-icons/md";

export default function Cart() {
  let dispatch = useDispatchCart();
  let data = useCart();

  const navigate = useNavigate();

  if (data.length === 0) {
    return navigate("/");
  }

  let totalPrice = data.reduce(
    (total, food) => total + parseInt(food.price),
    0
  );

  const userCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    // console.log("userEmial:", userEmail);
    let response = await fetch("https://bookmark-api-nine.vercel.app/api/orderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });

    // console.log("Order response:", response);
    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }

    toast.success("Order Placed");
  };

  // console.log(data);

  return (
    <div className={style.context}>
      <div className={style.header}>
        <Link to={"/"}>
          {" "}
          <div className={style.continue}>Continue Shopping</div>
        </Link>
      </div>
      <div className={style.main_area}>
        <div className={style.product}>

          {data.map((e, index) => {
            return (
              <>
                <div className={style.product_details}>
                  <div className={style.items}>
                    <div className={style.left}>
                      <img className={style.cover} src={e.img} alt="" />
                      <div className={style.book_details}>
                        <h5 className={style.title}>{e.name}</h5>
                        <p className={style.id}>Book ID: {e.id} </p>
                        <b>
                          <p className={style.price}>Price: {e.price} Rupees</p>
                          <p
                            className={style.delete}
                            onClick={() => {
                              dispatch({ type: "REMOVE", index: index });
                            }}
                          >
                            Delete
                          </p>
                        </b>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}

          

        </div>

        <div className={style.details1}>
            <div className={style.title}>ORDER SUMMARY</div>
            <div className={style.gst}> GST and other charges: 0 Rupees</div>
            <div className={style.shipping}>Shipping charges: 0 Rupees</div>
            <div className={style.total}>
              Sub Total: <b>{totalPrice} rupees only</b>
            </div>
            <div className={style.methods}>
              Payment Methods: <img src={img1} alt="" />
            </div>
            <button className={style.checkOutButton} onClick={userCheckOut}>
              Checkout Now
            </button>
          </div>


        <div className={style.details}>
          <div className={style.title}>ORDER SUMMARY</div>
          <div className={style.gst}> GST and other charges: 0 Rupees</div>
          <div className={style.shipping}>Shipping charges: 0 Rupees</div>
          <div className={style.total}>
            Sub Total: <b>{totalPrice} rupees only</b>
          </div>
          <div className={style.methods}>
            Payment Methods: <img src={img1} alt="" />
          </div>
          <button className={style.checkOutButton} onClick={userCheckOut}>
            Checkout Now
          </button>
        </div>
      </div>
    </div>
  );
}

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
