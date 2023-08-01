const addProductToCart = async (productId) => {
  const res = await fetch(
    import.meta.env.VITE_BASE_URL + `create-cart/${productId}`,
    {
      method: "GET",
      headers: { token: localStorage.getItem("token") },
    }
  );
  const data = await res.json();

  return data;
};

const fetchCartList = async () => {
  const res = await fetch(import.meta.env.VITE_BASE_URL + "cart-list", {
    method: "GET",
    headers: { token: localStorage.getItem("token") },
  });
  const data = await res.json();

  return data.data;
};

const removeProductFromCart = async (productId) => {
  const res = await fetch(
    import.meta.env.VITE_BASE_URL + `remove-cart/${productId}`,
    {
      method: "GET",
      headers: { token: localStorage.getItem("token") },
    }
  );
  const data = await res.json();

  return data;
};

export { addProductToCart, fetchCartList, removeProductFromCart };
