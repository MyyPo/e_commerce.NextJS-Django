import React from "react";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";

import { fetchInfiniteProducts } from "../hooks/fetchInfiniteProducts";
import { EndlessProducts } from "../components/EndlessProducts";
import { fetchSlugs } from "../hooks/fetchSlugs";
import { useInfiniteProducts } from "../hooks/fetchInfiniteProducts";
import ProductFilter from "../components/ProductFilter/ProductFilter";

const Home = () => {
  return (
    <>
      <div className="flex justify-center md:justify-end">
        <div className="hidden md:w-1/2 lg:w-1/3 md:flex">
          <ProductFilter />
        </div>
        <div className="w-full md:w-1/2 lg:w-7/12 lg:mr-12">
          <EndlessProducts />
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(
    ["products", process.env.NEXT_PUBLIC_PRODUCTS],
    () => fetchInfiniteProducts(process.env.NEXT_PUBLIC_PRODUCTS)
  );

  await queryClient.prefetchQuery(["slugs"], () => fetchSlugs());
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}

export default Home;
