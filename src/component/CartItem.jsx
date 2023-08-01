import React from "react";

const CartItem = ({ item, handleRemoveCart }) => {
  return (
    <div className="card card-side bg-white shadow-xl">
      <figure>
        <img className="w-40" src={item?.product?.image} alt="Product Image" />
      </figure>
      <div className="card-body">
        <h6 className="text-black">{item?.product?.title}</h6>
        <h3 className="text-xl font-bold text-gray-700">
          Price: ${item?.product?.price}
        </h3>
        <div className="card-actions justify-end">
          <button
            className="btn btn-sm btn-primary btn-outline"
            onClick={() => handleRemoveCart(item?.product?.id)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
