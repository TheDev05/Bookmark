import React from "react";
import { useCart, useDispatchCart } from "./ContextReducer";

import toast, { Toaster } from "react-hot-toast";

import style from "./Card.module.css";
import { MdShoppingCart } from "react-icons/md";

import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

const divStyle = {
  // background: "red",
  // transition: "ease in",
};

export default function (props) {
  let dispatch = useDispatchCart();
  let data = useCart();

  console.log(props.foodName.img);

  const addtocart = async () => {
    console.log("hello");

    if (!localStorage.getItem("authToken")) {
      toast.error("Sign in first to Cart your Books");
      return;
    }

    if (
      data.find((e) => {
        return e.id == props.foodName._id;
      }) == undefined
    ) {
      await dispatch({
        type: "ADD",
        id: props.foodName._id,
        name: props.foodName.name,
        price: props.foodName.cost,
        img: props.foodName.img,
      });

      toast.success("Added to cart!");
    } else toast.error("Book is alredy in cart!");

    // console.log("props",  props);
  };

  return (
    <div className={style.card}>
      <div className={style.top}>
        <img className={style.cardImage} src={props.foodName.img} alt="" />

        <button className={style.button} onClick={addtocart}>
          <MdShoppingCart className={style.cardIcon} />
        </button>
      </div>

      <div className={style.bottom}>
        <div className={style.title}>
          <p>{props.foodName.name}</p>
        </div>
        <div className={style.author}>
          <p>{props.foodName.author}</p>
        </div>
        <div className={style.cost}>
          <p>Rs. {props.foodName.cost}</p>
        </div>
      </div>
    </div>

    // <div>
    //   <div>
    //     <div className="card mt-3 " style={{ width: "18rem" }}>
    //       <img
    //         src={props.foodName.img}
    //         className="card-img-top"
    //         alt="..."
    //         style={{ height: "150px", objectFit: "fill" }}
    //       />
    //       <div className="card-body">
    //         <h5 className="card-title">{props.foodName.name}</h5>
    //         <p className="card-text">{props.foodName.description}</p>
    //         <div className="container w-100">
    //           <select className="m-2 h-100  bg-success">
    //             {Array.from(Array(6), (e, i) => {
    //               return (
    //                 <option key={i + 1} value={i + 1}>
    //                   {i + 1}
    //                 </option>
    //               );
    //             })}
    //           </select>

    //           <select className="m-2 h-100  bg-success">
    //             {priceOptions.map((data) => {
    //               return (
    //                 <option key={data} value={data}>
    //                   {data}
    //                 </option>
    //               );
    //             })}
    //           </select>
    //           <div>Price: 300/Plate</div>

    //           <button onClick={addtocart}>Cart</button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
