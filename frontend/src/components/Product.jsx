import React, { useEffect, useState, useContext } from 'react';
import ProductsItem from './ProductsItem';
import { UserContext } from '../Store';
import { motion } from 'framer-motion';

export default function Product(props) {
  const SearchcartList = useContext(UserContext).SearchcartList;
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:4000/api/products/", {
      method: "GET", 
    })
      .then(async (res) => {
        const data = await res.json();
        if (data.status && data.products && data.products.length > 0) {
          setProduct(data.products);
          setError(null);
        } else {
          setError("No products available");
          setProduct([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
        setProduct([]);
        setLoading(false);
      });
  }, []);

  // Filter products based on searchQuery passed from Shop.jsx
  const filteredProducts = (props.type === "Shop" ? SearchcartList : product)
    .filter((ele) =>
      ele.name.toLowerCase().includes((props.searchQuery || "").toLowerCase())
    );

  if (loading) {
    return (
      <div className="w-full px-6 flex justify-center items-center min-h-[400px]" style={{ marginTop: props["Margin"].margin }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full px-6 flex justify-center items-center min-h-[400px]" style={{ marginTop: props["Margin"].margin }}>
        <div className="text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="w-full px-6 flex justify-center items-center min-h-[400px]" style={{ marginTop: props["Margin"].margin }}>
        <div className="text-center">
          <p className="text-gray-600">No products found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-6" style={{ marginTop: props["Margin"].margin }}>
      {/* Product Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((ele, index) => (
          <motion.div
            key={ele._id || index}
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