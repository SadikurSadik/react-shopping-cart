import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyLogin } from "../utils/auth";
import { addProductToCart } from "../utils/cart";

const OtpPage = () => {
  const [loading, setLoading] = useState(false);
  const [pin, setPin] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const addToCartId = searchParams.get("add-to-cart");

  const handleVerifyLogin = () => {
    setLoading(true);
    verifyLogin(email, pin)
      .then((data) => {
        if (data?.msg === "success") {
          localStorage.setItem("token", data.data);
          if (addToCartId) {
            setTimeout(() => {
              addProductToCart(addToCartId)
                .then((data) => {
                  setLoading(false);
                  navigate("/cart-list");
                })
                .catch((err) => {
                  setLoading(false);
                  navigate("/");
                });
            }, 2000);
          } else {
            setLoading(false);
            navigate("/");
          }
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <div className="container  mx-auto">
      <div className="grid grid-cols-1 mt-2 md:grid-cols-1 lg:grid-cols-1 gap-3">
        <div className="flex items-center w-full justify-center h-screen">
          <div className="card w-8/12 card-side bg-white shadow-xl">
            <figure>
              <img
                className="h-96 w-96"
                src="/images/login-banner.png"
                alt="Movie"
              />
            </figure>
            <div className="card-body justify-center items-center">
              <div className="w-8/12">
                <h1 className="text-2xl my-4">PIN VERIFICATION</h1>
                <p className="mb-4 text-gray-600 text-sm">
                  4 Digit Verification PIN has been send to your email
                </p>
                <input
                  type="text"
                  placeholder="4 Digit Pin"
                  className="input w-full bg-white rounded-lg input-bordered"
                  onChange={(e) => setPin(e.target.value)}
                />
                <button
                  className="btn rounded-lg w-full my-4 btn-primary"
                  onClick={handleVerifyLogin}
                  disabled={loading}
                >
                  {loading && (
                    <span className="loading loading-spinner loading-sm"></span>
                  )}
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
