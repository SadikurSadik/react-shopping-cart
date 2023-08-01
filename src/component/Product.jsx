import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProductToCart } from "../utils/cart";

const Product = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!token) {
      navigate(`/login?add-to-cart=${product.id}`);
    } else {
      setLoading(true);
      addProductToCart(product.id)
        .then((data) => {
          setLoading(false);
          if (data?.msg === "success") {
            alert("Product added to cart successfully.");
          }
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  };

  return (
    <div className="card w-100 bg-white shadow-xl">
      <figure>
        <img src={product.image} alt="Product Image" />
      </figure>
      <div className="card-body">
        <h6 className="text-black">{product.title}</h6>
        <p className="text-sm text-gray-400">{product.short_des}</p>
        <h6 className="font-bold">Price: ${product.price}</h6>
        <div className="card-actions justify-end">
          <button
            onClick={handleAddToCart}
            className="btn btn-sm btn-outline btn-primary"
            disabled={loading}
          >
            {loading && (
              <span className="loading loading-spinner loading-sm"></span>
            )}
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
