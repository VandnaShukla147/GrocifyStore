import React, { useEffect, useState, useContext } from 'react';
import ProductsItem from './ProductsItem';
import { UserContext } from '../Store';
import { motion } from 'framer-motion';

const DUMMY_PRODUCTS = [
  {
    name: "Apple",
    text: "Fresh and juicy apples.",
    price: 120,
    imgUrl: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?...",
    stock: 50
  },
  {
    name: "Banana",
    text: "Sweet ripe bananas.",
    price: 60,
    imgUrl: "https://images.unsplash.com/photo-1528825871115-3581a5387919?...",
    stock: 100
  },
  {
    name: "Carrot",
    text: "Organic carrots.",
    price: 80,
    imgUrl: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?...",
    stock: 70
  },
  {
    name: "Broccoli",
    text: "Fresh green broccoli.",
    price: 150,
    imgUrl: "https://images.unsplash.com/photo-1518164147695-36c13dd568f5?...",
    stock: 40
  }
];

export default function Product(props) {
  const SearchcartList = useContext(UserContext).SearchcartList;
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/products", {
      method: "GET",
      credentials: "include"
    })
      .then(async (res) => {
        const data = await res.json();
        if (data.status && data.products && data.products.length > 0) {
          setProduct(data.products);
        } else {
          setProduct(DUMMY_PRODUCTS);
        }
      })
      .catch(() => {
        setProduct(DUMMY_PRODUCTS);
      });
  }, []);

  // ✅ filter products based on searchQuery passed from Shop.jsx
  const filteredProducts = (props.type === "Shop" ? SearchcartList : product)
    .filter((ele) =>
      ele.name.toLowerCase().includes((props.searchQuery || "").toLowerCase())
    );

  return (
    <div className="w-full px-6" style={{ marginTop: props["Margin"].margin }}>
      {/* Product Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((ele, index) => (
          <motion.div
            key={ele.name || index}
            className="glass-card p-4 rounded-2xl shadow-lg"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <ProductsItem data={ele} fulldata={ele} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
