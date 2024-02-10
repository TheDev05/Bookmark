import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";
import style from "../screens/Signup.module.css";

import img1 from "../assests/books.png";

export default function Signup() {
  const [creds, setCreds] = useState({
    name: "Guest",
    email: "guest@guest.com",
    password: "guest@123",
    location: "",
  });

  const navigate = useNavigate();

  const onChange = (event) => {
    setCreds({ ...creds, [event.target.name]: event.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://bookmark-api-nine.vercel.app/api/createuser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: creds.name,
          email: creds.email,
          password: creds.password,
          location: creds.location,
        }),
      }
    );

    const json = await response.json();
    console.log(json);

    if (!json.success) toast.error(json.errors);
    else toast.success("Registeration Succesful");

    navigate("/login");
  };

  return (
    <div className={style.body}>
      <div className={style.left}>
        <img className={style.login_cover} src={img1} alt="" />
      </div>
      <div className={style.right}>
        <div className={style.card}>
          <div className={style.head}>
            <h4>Sign Up</h4>
            <p>
              already have an account,
              <Link to={"/login"}>
                {" "}
                <span>login from here.</span>
              </Link>
            </p>
          </div>
          <input
            type="text"
            id=""
            name="name"
            value={creds.name}
            onChange={onChange}
            placeholder="Name"
          />
          <input
            type="text"
            name="email"
            value={creds.email}
            onChange={onChange}
            placeholder="Email"
            id=""
          />
          <input
            type="password"
            name="password"
            value={creds.password}
            onChange={onChange}
            placeholder="Password"
            id=""
          />
          <button onClick={submit}>Sign Up</button>
        </div>
      </div>
    </div>

    // <div>
    //   <input
    //     type="text"
    //     placeholder="Enter Name"
    //     name=""
    //     id=""
    //     name="name"
    //     value={creds.name}
    //     onChange={onChange}
    //   />
    //   <input
    //     type="password"
    //     placeholder="Enter Password"
    //     name=""
    //     id=""
    //     name="password"
    //     value={creds.password}
    //     onChange={onChange}
    //   />
    //   <input
    //     type="email"
    //     placeholder="Enter email"
    //     name=""
    //     id=""
    //     name="email"
    //     value={creds.email}
    //     onChange={onChange}
    //   />
    //   <input
    //     type="text"
    //     placeholder="Enter location"
    //     name=""
    //     id=""
    //     name="location"
    //     value={creds.location}
    //     onChange={onChange}
    //   />
    //   <button onClick={submit}>SignUp</button>
    //   <Link to="/login">already have a account</Link>
    // </div>
  );
}
