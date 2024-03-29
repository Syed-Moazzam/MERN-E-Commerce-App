import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import TabCarousal from "./TabCarousal";
import SearchBar from "./SearchBar";
import ShowProducts from "./ShowProducts";
import ChooseUs from "./ChooseUs";
import { getLatestProducts, getMostSellingProducts } from "../../api";

function HomeUser() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mostSellingproducts, setmostSellingproducts] = useState([]);

  const latestProducts = () => {
    getLatestProducts()
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sellingProducts = () => {
    getMostSellingProducts()
      .then((res) => setmostSellingproducts(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // window.scrollTo(0, 0);
    setLoading(true);
    latestProducts();
    sellingProducts();
  }, []);
  return (
    <Box bg="radial-gradient(150px 150px at 95% 0%, rgba(253, 186, 43, 0.3) 0%, rgba(253, 186, 43, 0) 100%), radial-gradient(150px 150px at 5% 0%, rgba(120, 213, 242, 0.3) 0%, rgba(253, 186, 43, 0) 100%)">
      <SearchBar />
      <TabCarousal />
      {products?.length > 0 && <ShowProducts
        loading={loading}
        products={products}
        title="Latest Products"
      />}

      {mostSellingproducts?.length > 0 && <ShowProducts
        loading={loading}
        products={mostSellingproducts}
        title="Most Selling Products"
      />}
      <ChooseUs />
    </Box>
  );
}

export default HomeUser;
