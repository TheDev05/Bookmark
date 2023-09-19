import React, { useState, useEffect } from "react";
import style from "../screens/Profile.module.css";

export default function MyOrders() {
  const [Info, setInfo] = useState([]);

  const loadData = async (e) => {
    // e.preventDefault();
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("http://localhost:5000/api/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
      }),
    });

    response = await response.json();
    setInfo(response[0]);

    console.log("response", Info);
  };

  useEffect(() => {
    loadData();
  }, []);

  return Info.length != 0 ? (
    <div className={style.body}>
      <div className={style.message}> ERR_404: 
        Hang Tight, <span>{Info.name}</span>! <br></br> Developer is busy right now. but,
        This'll be fixed soon.
      </div>
    </div>
  ) : (
    <div className={style.body}><div className={style.message}></div></div>
  );
}
