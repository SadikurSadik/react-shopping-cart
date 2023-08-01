import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { userLogin } from "../utils/auth";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const addToCartId = searchParam.get("add-to-cart");

  const handleLogin = () => {
    setLoading(true);
    userLogin(email)
      .then((data) => {
        setLoading(false);
        if (data?.msg === "success") {
          let url = `/otp?email=${email}`;
          if (addToCartId) {
            url += `&add-to-cart=${addToCartId}`;
          }
          navigate(url);
        } else {
          setLoading(false);
          console.log("Something went wrong. Please try again.");
        }
      })
      .catch((error) => console.log(error));
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
                <h1 className="text-2xl my-4">WELCOME BACK</h1>
                <p className="mb-4 text-sm text-gray-600">
                  Enter your email address and get verification pin
                </p>
                <input
                  value={email}
                  type="text"
                  placeholder="Email.."
                  className="input w-full bg-white rounded-lg input-bordered"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  className="btn rounded-lg w-full my-4 btn-primary"
                  onClick={handleLogin}
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

export default LoginPage;
