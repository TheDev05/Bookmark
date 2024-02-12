import React, { useState, useEffect } from "react";
import Card from "../components/Card.jsx";
import Footer from "../components/Footer.jsx";
import style from "./Home.module.css";
import img1 from "../assests/title_img.jpg";
import { useCart, useDispatchCart } from "../components/ContextReducer.js";
import toast, { Toaster } from "react-hot-toast";

export default function () {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const [genre, setGenre] = useState("All Genres");
  const [isLoading, setIsLoading] = useState(true);

  // const loadData = async () => {
  //   let response = await fetch("http://localhost:5000/api/foodData", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   response = await response.json();

  //   setFoodCat(response[1]);
  //   setFoodItem(response[0]);

  //   // console.log(response[0]);
  //   if (response[0] != null) setIsLoading(false);
  // };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let response = await fetch("https://bookmark-api-nine.vercel.app/api/foodData", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        response = await response.json();

        setFoodCat(response[1]);
        setFoodItem(response[0]);

        setIsLoading(false); // Move this line here
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Make sure to set loading state to false even in case of an error
      }
    };

    fetchData();
  }, []); // empty dependency array, runs only once

  let dispatch = useDispatchCart();
  let data = useCart();

  const addtocart = async () => {
    console.log("hello");

    if (!localStorage.getItem("authToken")) {
      toast.error("Sign in first to Cart your Books");
      return;
    }

    if (
      data.find((e) => {
        return e.id == "props.foodName._id";
      }) == undefined
    ) {
      await dispatch({
        type: "ADD",
        id: "65089245m61apd551435f4e5",
        name: "Life of The Wild",
        price: 450,
        img: "https://demo.templatesjungle.com/booksaw/images/main-banner1.jpg",
      });

      toast.success("Added to cart!");
    } else toast.error("Book is alredy in cart!");

    // console.log("props",  props);
  };

  return (
    <>
      <div className={style.body}>
        <div className={style.featured}>
          <div className={style.left}>
            <div className={style.para}>
              <h1>
                Life of The <br></br>Wild
              </h1>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque
                eos numquam unde necessitatibus, ipsa eum, accusantium
                doloremque nisi natus soluta maiores ?
              </p>
              <button onClick={addtocart}>
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
          <div className={style.right}>
            <img src={img1} alt="" />
          </div>
        </div>

        <div className={style.partion}>
          <div className={style.holder}>
            <div className={style.line1}></div>
          </div>
        </div>

        <div className={style.book_section}>
          <div className={style.title}>
            <h2>Popular Books</h2>
          </div>
          <div className={style.genre}>
            <button
              onClick={() => {
                setGenre("All Genres");
              }}
            >
              All Genres
            </button>
            <button
              onClick={() => {
                setGenre("Business");
              }}
            >
              Business
            </button>
            <button
              onClick={() => {
                setGenre("Technology");
              }}
            >
              Technology
            </button>
            <button
              onClick={() => {
                setGenre("Romantic");
              }}
            >
              Romantic
            </button>
            <button
              onClick={() => {
                setGenre("Adventure");
              }}
            >
              Adventure
            </button>
            <button
              onClick={() => {
                setGenre("Fictinol");
              }}
            >
              Fictional
            </button>
          </div>

          <div className={style.books}>
            {
              foodItem.map((e) => {
                return e.CategoryName === genre || genre == "All Genres" ? (
                  <div key={e._id}>
                    <Card foodName={e} />
                  </div>
                ) : (
                  <></>
                );
              })
            }
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
