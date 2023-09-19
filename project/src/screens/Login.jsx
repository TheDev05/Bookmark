import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";
import style from "../screens/Login.module.css";

import img1 from "../assests/books.png"

export default function Login() {
  const [creds, setCreds] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  const onChange = (event) => {
    setCreds({ ...creds, [event.target.name]: event.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://bookmark-api-nine.vercel.app/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: creds.email,
        password: creds.password,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) toast.error(json.errors);
    else {
      localStorage.setItem("userEmail", creds.email);
      localStorage.setItem("authToken", json.authToken);
      // console.log(localStorage.getItem("authToken"));
      toast.success("Login succesful");
      navigate("/");
    }
  };

  return (
    <div className={style.body}>
      <div className={style.left}>
        <img className={style.login_cover} src={img1} alt="" />
      </div>
      <div className={style.right}>
        <div className={style.card}>
          <div className={style.head}>
            <h4>Sign In</h4>
            <p>Don't have an account,<Link to={"/createuser"}> <span>get one for free.</span></Link></p>
          </div>
          <input
            type="text"
            id=""
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
          <button onClick={submit}>Login</button>
        </div>
      </div>
    </div>

    // <div>
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
    //     type="password"
    //     placeholder="Enter Password"
    //     name=""
    //     id=""
    //     name="password"
    //     value={creds.password}
    //     onChange={onChange}
    //   />

    //   <button onClick={submit}>SignIn</button>
    //   <Link to="/createuser">create a account</Link>
    // </div>
  );
}
