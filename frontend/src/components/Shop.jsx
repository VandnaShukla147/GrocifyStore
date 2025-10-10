import { UserContext } from "../Store";
import Product from "./Product";
import React, { useContext, useEffect, useRef, useState } from "react";

export default function Shop() {
  let store = useContext(UserContext);
  const [topicsList, settopicsList] = useState([]);
  const [search, setSearch] = useState("");

  const TopicOnClick = (e, name) => {
    if (e.currentTarget.classList.contains("Topic")) {
      e.currentTarget.classList.remove("Topic");
      e.currentTarget.classList.add("targetTopic");
      let temp = new Set(store.searchList);
      temp.add(name.toLowerCase()); // normalize before adding
      store.setsearchList(temp);
    } else {
      e.currentTarget.classList.remove("targetTopic");
      e.currentTarget.classList.add("Topic");
      let temp = new Set(store.searchList);
      temp.delete(name.toLowerCase());
      store.setsearchList(temp);
    }
  };

  const ref = useRef(null);
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

  let handleClick = async () => {
    let option;
    let category = [];

    if (store.searchList.has("all")) {
      option = {
        all: true,
        search: search,
        category: [],
      };
    } else {
      store.searchList.forEach((element) => {
        category.push(element.toLowerCase());
      });
      option = {
        all: false,
        search: search,
        category: category,
      };
    }

    try {const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products/search`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(option),
});


      const data = await res.json();
      console.log("API Response:", data);

      // Handle both {status, products} and raw array
      if (Array.isArray(data)) {
        store.setSearchcartList(data);
      } else if (data.status && data.products) {
        store.setSearchcartList(data.products);
      } else {
        store.setSearchcartList([]);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      store.setSearchcartList([]);
    }
  };

  let handleSort = (str) => {
    let product = store.SearchcartList;
    if (str === "lowToHighi") {
      store.setSearchcartList([...product].sort((a, b) => a.price - b.price));
    } else if (str === "highiToLow") {
      store.setSearchcartList([...product].sort((a, b) => b.price - a.price));
    } else if (str === "Name") {
      store.setSearchcartList([...product].sort((a, b) => a.name.localeCompare(b.name)));
    }
  };

  useEffect(() => {
    settopicsList([
      "all",
      "dairy",
      "fruit",
      "household",
      "snacks",
      "vegetables",
    ]);
    handleClick();
  }, []);

  return (
    <div className="ShopMainPAge">
      <div className="Sticky">
        {/* 🔍 Search box */}
        <div className="searchBox">
          <input
            type="text"
            name="Search"
            id="Search"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="SearchBtn" onClick={handleClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16" height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001
                c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 
                1.415-1.414l-3.85-3.85a1.007 1.007 0 0 
                0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 
                5.5 5.5 0 0 1 11 0z"
              />
            </svg>
          </button>
        </div>

        {/* 🏷️ Topic filter */}
        <div className="topic">
          <div className="boxTopic">
            <span className="leftBtnTopic" onClick={() => scroll(-30)}>◀</span>
            <div className="ScrollTipicBox" ref={ref}>
              {topicsList.map((ele, index) => {
                let flag = store.searchList.has(ele.toLowerCase());
                return (
                  <span
                    key={index}
                    onClick={(event) => TopicOnClick(event, ele)}
                    className={flag ? "topics targetTopic" : "topics Topic"}
                  >
                    {ele}
                  </span>
                );
              })}
            </div>
            <span className="rightBtnTopic" onClick={() => scroll(30)}>▶</span>
          </div>
        </div>

        {/* Apply button */}
        <button className="btn btn-Primary" onClick={handleClick}>
          Apply
        </button>

        {/* Sort dropdown */}
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle bg-dark" type="button">
            Filter
          </button>
          <div className="dropdown-menu">
            <button className="dropdown-item" onClick={() => handleSort("lowToHighi")}>
              Price Low to High
            </button>
            <button className="dropdown-item" onClick={() => handleSort("highiToLow")}>
              Price High to Low
            </button>
            <button className="dropdown-item" onClick={() => handleSort("Name")}>
              Sort by Name
            </button>
          </div>
        </div>
      </div>

      {/* 🛒 Product section */}
      <div className="ShopPage">
        <div className="ShopPageSecondSection">
          <Product Margin={{ margin: "20px" }} type="Shop" searchQuery={search} />
        </div>
      </div>
    </div>
  );
}
