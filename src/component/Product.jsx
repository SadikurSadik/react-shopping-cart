import React from "react";
import { addProductToCart } from "../utils/cart";

const Product = ({ product }) => {
  const handleAddToCart = () => {
    addProductToCart(product.id)
      .then((data) => {
        if (data?.msg === "success") {
          alert("Product added to cart successfully.");
        }
      })
      .catch((err) => console.log(err));
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
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
