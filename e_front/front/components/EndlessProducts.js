import React, { useState, useEffect } from "react";
import {
  fetchInfiniteProducts,
  useInfiniteProducts,
} from "../hooks/fetchInfiniteProducts";

import SkeletonProductCard from "./SkeletonProductCard";
import ProductCard from "./ProductCard";

import Spinner from "./Spinner";

export function EndlessProducts() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteProducts(
      "products",
      ({ pageParam }) => fetchInfiniteProducts({ pageParam }),
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    );

  const skeletonCards = Array(8).fill(0);

  return (
    // <div className="flex justify-center md:justify-end">
    //   <div className="w-full md:w-1/2 lg:w-7/12 lg:mr-12">
    <>
      <div
        className={`grid mt-4 md:mt-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-10`}
      >
        {isLoading &&
          skeletonCards.map((index) => <SkeletonProductCard key={index} />)}

        <>
          {data?.pages.map((group, e) =>
            group.response.map((product) => (
              <ProductCard key={e} product={product} />
            ))
          )}
        </>
      </div>
      {data && (
        <div className="flex items-center justify-center mt-4 md:mt-6">
          <button
            className="w-32 h-16 text-sm font-medium text-center text-white rounded-lg animate-appear focus:text-black bg-gradient-to-b hover:from-gray-600 hover:to-gray-700 from-gray-900 to-gray-600"
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
              ? "Load More"
              : "Nothing more to load"}
          </button>
        </div>
      )}
    </>
    //   </div>
    // </div>
  );
}
