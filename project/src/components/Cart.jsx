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
    let response = await fetch("http://localhost:5000/api/orderData", {
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
        <div className={style.checkout} onClick={userCheckOut}>
          {" "}
          Checkout Now
        </div>
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
                        <p className={style.price}>Price: {e.price} Rupees</p>
                        <p className={style.amount}>Quantity: 02</p>
                      </div>
                    </div>
                    <div className={style.mid}>
                      <p className={style.book_price}>{e.price} Rupees only</p>
                    </div>
                    <div className={style.right}>
                      <div className={style.remove}>
                        <MdRemoveShoppingCart
                          className={style.trash}
                          onClick={() => {
                            dispatch({ type: "REMOVE", index: index });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
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
          <button onClick={userCheckOut}>Checkout Now</button>
        </div>
      </div>
    </div>
  );
}
