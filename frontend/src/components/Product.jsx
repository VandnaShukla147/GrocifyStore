import React, { useEffect, useState } from 'react';
import ProductsItem from './ProductsItem'
import { useContext } from 'react'
import { UserContext } from '../Store'

const DUMMY_PRODUCTS = [
  {
    name: "Apple",
    text: "Fresh and juicy apples.",
    price: 120,
    imgUrl: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    stock: 50
  },
  {
    name: "Banana",
    text: "Sweet ripe bananas.",
    price: 60,
    imgUrl: "https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    stock: 100
  },
  {
    name: "Carrot",
    text: "Organic carrots.",
    price: 80,
    imgUrl: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    stock: 70
  },
  {
    name: "Broccoli",
    text: "Fresh green broccoli.",
    price: 150,
    imgUrl: "https://images.unsplash.com/photo-1518164147695-36c13dd568f5?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    stock: 40
  }
];

export default function Product(props) {
  const SearchcartList = useContext(UserContext).SearchcartList
  const [product, setProduct] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/products", {
      method: "GET",
      credentials: "include"
    })
      .then(async (res) => {
        const data = await res.json();
        if (data.status && data.products && data.products.length > 0) {
          setProduct(data.products)
        } else {
          setProduct(DUMMY_PRODUCTS);
        }
      })
      .catch(() => {
        setProduct(DUMMY_PRODUCTS);
      })
  }, [])
  return (
    <div className='Product' style={{ marginTop: props["Margin"].margin }} >
      {
        props.type === "Shop" ? (SearchcartList.map((ele) => {
          return <ProductsItem data={ele} key={ele.name} fulldata={ele}></ProductsItem>
        })) : (product.map((ele) => {
          return <ProductsItem data={ele} key={ele.name} fulldata={ele}></ProductsItem>
        }))
      }
    </div>
  )
}
