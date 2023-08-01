import { useEffect, useState } from "react";
import { fetchProducts } from "../utils/product";
import Loading from "./Loading";
import Product from "./Product";

const ProductList = () => {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data))
      .catch((error) => setError(error));
  }, []);

  let output;
  if (error) {
    output = <div>Something went wrong.</div>;
  } else if (products && products.length > 0) {
    output = products.map((item) => <Product product={item} key={item.id} />);
  } else {
    output = <div>No product found.</div>;
  }

  return (
    <div className="container z-10 mx-auto my-12 p-9">
      {products === null ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 mt-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {output}
        </div>
      )}
    </div>
  );
};
export default ProductList;
