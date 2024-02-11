import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import style from "./Home.module.css";
import img1 from "../assests/title_img.jpg";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useCart, useDispatchCart } from "../components/ContextReducer.js";
import toast, { Toaster } from "react-hot-toast";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

export default function () {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  // const [search, setSearch] = useState("");

  const [genre, setGenre] = useState("All Genres");
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    let response = await fetch("https://bookmark-api-nine.vercel.app/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();

    setFoodCat(response[1]);
    setFoodItem(response[0]);

    // console.log(response[0]);
  };

  useEffect(() => {
    setIsLoading(true);
    loadData().then(() => {
      setIsLoading(false);
    });
  }, [foodItem]);

  // if (foodItem.length == 0)
  //   return (
  //     <div className={style.loader}>
  //       <span>Stacking Books, Hold Tight!</span>
  //     </div>
  //   );

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
      {isLoading == false ? (
        <div className={style.body}>
          <div className={style.featured}>
            <div className={style.left}>
              <div className={style.para}>
                <h1>
                  Life of The <br></br>Wild
                </h1>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Cumque eos numquam unde necessitatibus, ipsa eum, accusantium
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
              {/* <ImBooks className={style.icons} />{" "}
        <div className={style.line1}></div> */}
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
              {foodItem.length !== 0 ? (
                foodItem.map((e) => {
                  return e.CategoryName === genre || genre == "All Genres" ? (
                    <div key={e._id}>
                      <Card foodName={e} />
                    </div>
                  ) : (
                    <></>
                  );
                })
              ) : (
                <div>No data is found</div>
              )}
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        // <div>
        //   <div>
        //     <input
        //       type="search"
        //       name="search"
        //       placeholder="search here"
        //       value={search}
        //       onChange={(e) => {
        //         setSearch(e.target.value);
        //       }}
        //     />
        //   </div>

        //   <div className="container">
        //     {foodItem.length !== 0 ? (
        //       foodItem
        //         .filter(
        //           (item) =>
        //             item.CategoryName === "Starter" &&
        //             item.name.toLowerCase().includes(search.toLowerCase())
        //         )
        //         .map((filterItems) => {
        //           return (
        //             <div key={filterItems._id} className="col-12 col-md">
        //               <Card foodName={filterItems} />
        //             </div>
        //           );
        //         })
        //     ) : (
        //       <div>No data is found</div>
        //     )}
        //   </div>

        //   <div>
        // <Footer />
        //   </div>
        // </div>
        <div className={style.loader}>
          <span>Stacking Books, Hold Tight!</span>
        </div>
      )}
    </>
  );
}
