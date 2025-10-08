import { UserContext } from '../Store'
import Product from './Product'
import React, { useContext, useEffect, useRef, useState } from 'react'

const DUMMY_PRODUCTS = [
  // Fruits
  {
    name: "Apple",
    text: "Fresh and juicy apples.",
    price: 120,
    imgUrl: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    stock: 50,
    category: "fruit"
  },
  {
    name: "Banana",
    text: "Sweet ripe bananas.",
    price: 60,
    imgUrl: "https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    stock: 100,
    category: "fruit"
  },
  // Vegetables
  {
    name: "Carrot",
    text: "Organic carrots.",
    price: 80,
    imgUrl: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    stock: 70,
    category: "vegetables"
  },
  {
    name: "Broccoli",
    text: "Fresh green broccoli.",
    price: 150,
    imgUrl: "https://images.unsplash.com/photo-1518164147695-36c13dd568f5?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    stock: 40,
    category: "vegetables"
  },
  // Dairy
  {
    name: "Milk",
    text: "Pure and fresh cow milk.",
    price: 50,
    imgUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    stock: 200,
    category: "dairy"
  },
  {
    name: "Cheese",
    text: "Delicious cheddar cheese.",
    price: 200,
    imgUrl: "https://images.unsplash.com/photo-1683314573422-649a3c6ad784?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    stock: 60,
    category: "dairy"
  },
  // Snacks
  {
    name: "Potato Chips",
    text: "Crispy and salty potato chips.",
    price: 30,
    imgUrl: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    stock: 120,
    category: "snacks"
  },
  {
    name: "Chocolate Bar",
    text: "Rich and creamy chocolate bar.",
    price: 40,
    imgUrl: "https://images.unsplash.com/photo-1623660053975-cf75a8be0908?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    stock: 90,
    category: "snacks"
  },
  // Household
  {
    name: "Laundry Detergent",
    text: "Powerful cleaning laundry detergent.",
    price: 180,
    imgUrl: "https://images.unsplash.com/photo-1624372635282-b324bcdd4907?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    stock: 35,
    category: "household"
  },
  {
    name: "Dish Soap",
    text: "Gentle and effective dish soap.",
    price: 60,
    imgUrl: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    stock: 80,
    category: "household"
  }
];

export default function Shop() {
    let store = useContext(UserContext)
    const [topicsList, settopicsList] = useState([])
    const [search, setSearch] = useState("");
    const TopicOnClick = (e, name) => {
        if (e.currentTarget.classList.contains('Topic')) {
            e.currentTarget.classList.remove("Topic")
            e.currentTarget.classList.add("targetTopic")
            let temp = new Set(store.searchList)
            temp.add(name)
            store.setsearchList(temp)
        }
        else {
            e.currentTarget.classList.remove("targetTopic")
            e.currentTarget.classList.add("Topic")
            let temp = new Set(store.searchList)
            temp.delete(name)
            store.setsearchList(temp)
            // console.log(store.searchList)
        }
    }
    const ref = useRef(null)
    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset;
        if (ref.current.scrollLeft === 0) {

        }
    };
    let handleClick = () => {
        let option;
        let category = [];
        if (store.searchList.has("All")) {
            option = {
                all: true,
                search: search,
                category: category
            }
        }
        else {
            store.searchList.forEach(element => {
                category.push(element)
            });
            option = {
                all: false,
                search: search,
                category: category
            }
        }
        fetch("http://localhost:4000/getProducts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(option),
            credentials: "include"
        })
        .then(async (res) => {
            const data = await res.json();
            console.log(data)
            if (data.status && data.products && data.products.length > 0) {
                store.setSearchcartList(data.products)
            }
            else {
                // Filter dummy products by selected categories
                let filtered = DUMMY_PRODUCTS;
                if (!store.searchList.has("All") && store.searchList.size > 0) {
                  const selected = Array.from(store.searchList).map(cat => cat.toLowerCase());
                  filtered = DUMMY_PRODUCTS.filter(p => selected.includes(p.category));
                }
                store.setSearchcartList(filtered)
            }
        })
        .catch((err) => {
            console.log(err)
            // Filter dummy products by selected categories
            let filtered = DUMMY_PRODUCTS;
            if (!store.searchList.has("All") && store.searchList.size > 0) {
              const selected = Array.from(store.searchList).map(cat => cat.toLowerCase());
              filtered = DUMMY_PRODUCTS.filter(p => selected.includes(p.category));
            }
            store.setSearchcartList(filtered)
        })
    }


    let handleSort = (str) => {
        let product = store.SearchcartList;
        if (str === "lowToHighi") {
            let newProduct = [...product].sort((a, b) => a.price - b.price);
            // console.log(newProduct);
            store.setSearchcartList(newProduct);
        }
        else if (str === "highiToLow") {
            let newProduct = [...product].sort((a, b) => b.price - a.price);
            // console.log(newProduct);
            store.setSearchcartList(newProduct);
        }
        else if(str==="Name"){
            let newProduct = [...product].sort((a, b) => a.name.localeCompare(b.name));
            // console.log(newProduct);
            store.setSearchcartList(newProduct);
        }

    }
    useEffect(() => {
        settopicsList(["All", "Dairy", "fruit", "Household", "Snacks", "Vegetables"]);
        handleClick();
    }, []);

    return (
        <div className='ShopMainPAge'>
            <div className="Sticky">
                <div className="searchBox">
                    <input type="text" name="Search" id="Search" placeholder='Search' value={search} onChange={(e) => { setSearch(e.target.value) }} />
                    <button className='SearchBtn' onClick={handleClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </button>
                </div>

                <div className="topic">

                    <div className="boxTopic">
                        <span className='leftBtnTopic' onClick={() => scroll(-30)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 8a7 7 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </span>
                        <div className="ScrollTipicBox" ref={ref}>

                            {topicsList.map((ele, index) => {
                                let flag = store.searchList.has(ele);
                                return <span key={index} onClick={(event) => { TopicOnClick(event, ele) }} className={(flag) ? "topics targetTopic" : "topics Topic"}>{ele}</span>
                            })}
                        </div>
                        <span className='rightBtnTopic' onClick={() => scroll(30)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 8a7 7 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </span>
                    </div>

                </div>
                <button className="btn btn-Primary  " type="button" id="Apply" aria-haspopup="true" aria-expanded="false" onClick={handleClick}>
                    Apply
                </button>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle bg-dark " type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Filter
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                        <button className="dropdown-item" type="button" onClick={() => {
                            handleSort("lowToHighi")
                        }}>Price Low to High</button>
                        <button className="dropdown-item" type="button"
                            onClick={() => {
                                handleSort("highiToLow")
                            }}
                        >Price High to low</button>
                        <button className="dropdown-item" type="button"
                            onClick={() => {
                                handleSort("Name")
                            }}
                        >Sort by Name</button>

                    </div>
                </div>

            </div>
            <div className='ShopPage'>

                    <div className="ShopPageSecondSection">
                        <Product 
    Margin={{ margin: "20px" }} 
    type="Shop" 
    searchQuery={search}   
    />

                </div>
            </div>
        </div>
    )
}
