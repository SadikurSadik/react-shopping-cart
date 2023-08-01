import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCartList, removeProductFromCart } from "../utils/cart";
import { convertPriceStringToNumber } from "../utils/helper";
import CartItem from "./CartItem";
import Loading from "./Loading";

const CartList = () => {
  const [cartItems, setCartItems] = useState(null);

  useEffect(() => {
    fetchCartList()
      .then((data) => setCartItems(data))
      .catch((err) => console.log(err));
  }, []);

  const handleRemoveCart = (productId, func) => {
    removeProductFromCart(productId)
      .then((data) => {
        func(false);
        if (data.msg === "success") {
          // remove that item from local state: cartItems
          const items = cartItems.filter(
            (item) => item?.product?.id !== productId
          );
          setCartItems(items);
        }
      })
      .catch((err) => {
        func(false);
        console.log(err);
      });
  };

  const calculateTotalPrice = () => {
    const totalPrice = cartItems.reduce((total, currentValue) => {
      return total + convertPriceStringToNumber(currentValue);
    }, 0);

    return Number(parseFloat(totalPrice).toFixed(2)).toLocaleString("en", {
      minimumFractionDigits: 2,
    });
  };

  return (
    <div className="container z-10 mx-auto my-12 p-9">
      {cartItems ? (
        <div className="grid grid-cols-1 mt-2 md:grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="container col-span-2">
            <div className="grid grid-cols-1  md:grid-cols-1 lg:grid-cols-1 gap-3">
              {cartItems &&
                (cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <CartItem
                      item={item}
                      handleRemoveCart={handleRemoveCart}
                      key={item.id}
                    />
                  ))
                ) : (
                  <h6 className="font-bold">
                    No product found in the cart.
                    <Link
                      className=" ml-2 btn btn-sm btn-outline text-blue-500"
                      to={"/"}
                    >
                      Continue Shopping
                    </Link>
                  </h6>
                ))}
            </div>
          </div>

          {cartItems.length ? (
            <div className="card shadow-xl h-44 w-100 bg-white">
              <div className="card-body">
                <h2 className="card-title">Total Item: {cartItems.length}</h2>
                <h6 className="font-bold">
                  Total Price: ${cartItems ? calculateTotalPrice() : ""}
                </h6>
                <div className="card-actions">
                  <button className="btn btn-sm my-4 btn-primary btn-outline">
                    Check out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default CartList;
