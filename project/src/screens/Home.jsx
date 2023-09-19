import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";

import style from "./Home.module.css";
import { ImBooks } from "react-icons/im";

export default function () {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  // const [search, setSearch] = useState("");

  const [genre, setGenre] = useState("All Genres");

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();

    setFoodCat(response[1]);
    setFoodItem(response[0]);

    console.log(response[0]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className={style.body}>
      <div className={style.featured}>
        <div className={style.left}>
          <div className={style.para}>
            <h1>
              Life of The <br></br>Wild
            </h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque
              eos numquam unde necessitatibus, ipsa eum, accusantium doloremque
              nisi natus soluta maiores ?
            </p>
            <button>Featured</button>
          </div>
        </div>
        <div className={style.right}>
          <img
            src="https://private-user-images.githubusercontent.com/73834703/268693071-d0ccdb43-e9c0-4ceb-8fe4-08c2b72772c9.jpg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTEiLCJleHAiOjE2OTUwNTA5MDcsIm5iZiI6MTY5NTA1MDYwNywicGF0aCI6Ii83MzgzNDcwMy8yNjg2OTMwNzEtZDBjY2RiNDMtZTljMC00Y2ViLThmZTQtMDhjMmI3Mjc3MmM5LmpwZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFJV05KWUFYNENTVkVINTNBJTJGMjAyMzA5MTglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjMwOTE4VDE1MjMyN1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWQ1MjM1MGE2ODA2YTVlYzEwM2IyNzI4MDZhYjZiN2ExZWM5ODZkYTZmZjk1NjJhYzM3NDcyYTBmMTM0NDgzNWYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.4iLZOwUXxZiFL6Kf_8Dw_1Qnk_wa8V9Zk_xavogvEvU"
            alt=""
          />
        </div>
      </div>

      <div className={style.partion}>
        <div className={style.holder}>
          <div className={style.line1}></div>
          <ImBooks className={style.icons} />{" "}
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
  );
}
