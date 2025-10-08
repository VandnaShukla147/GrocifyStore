import { UserContext } from '../Store'
import Product from './Product'
import React, { useContext, useEffect, useRef, useState } from 'react'

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
        }
    }
    
    const ref = useRef(null)
    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset;
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
            if (data.status && data.products) {
                store.setSearchcartList(data.products)
            } else {
                store.setSearchcartList([])
            }
        })
        .catch((err) => {
            console.error("Error fetching products:", err)
            store.setSearchcartList([])
        })
    }

    let handleSort = (str) => {
        let product = store.SearchcartList;
        if (str === "lowToHighi") {
            let newProduct = [...product].sort((a, b) => a.price - b.price);
            store.setSearchcartList(newProduct);
        }
        else if (str === "highiToLow") {
            let newProduct = [...product].sort((a, b) => b.price - a.price);
            store.setSearchcartList(newProduct);
        }
        else if(str==="Name"){
            let newProduct = [...product].sort((a, b) => a.name.localeCompare(b.name));
            store.setSearchcartList(newProduct);
        }
    }
    
    useEffect(() => {
        settopicsList([
          "All", 
          "Dairy", 
          "Fruit", 
          "Household", 
          "Snacks", 
          "Vegetables", 
          "Drinks", 
          "Personal Care", 
          "Pet Care"
        ]);
        handleClick();
    }, []);

    return (
        <div className='ShopMainPAge'>
            <div className="Sticky">
                <div className="searchBox">
                    <input 
                      type="text" 
                      name="Search" 
                      id="Search" 
                      placeholder='Search' 
                      value={search} 
                      onChange={(e) => { setSearch(e.target.value) }} 
                    />
                    <button className='SearchBtn' onClick={handleClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </button>
                </div>

                <div