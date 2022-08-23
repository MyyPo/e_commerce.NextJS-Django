import React, { useState, useEffect } from "react";
import {
  fetchInfiniteProducts,
  useInfiniteProducts,
} from "../hooks/fetchInfiniteProducts";
import Link from "next/link";
import Image from "next/image";
import mask from "../public/mask.jpg";
import Spinner from "./Spinner";

export function EndlessProducts(props) {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteProducts(
      "products",
      ({ pageParam }) => fetchInfiniteProducts({ pageParam }),
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    );

  return (
    <div className="flex flex-col items-center justify-end">
      <div
        className={`grid mt-16 md grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-24`}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {data.pages.map((group, e) =>
              group.response.map((product) => (
                <Link
                  key={e}
                  href={`/product/${encodeURIComponent(product.slug)}`}
                >
                  <a className="flex flex-col justify-end text-center bg-gray-400 rounded-xl">
                    <div className="">
                      <Image
                        className="w-full rounded-xl"
                        layout="intrinsic"
                        src={mask}
                        alt={"mask"}
                      />
                    </div>
                    <div> {product.title}</div>
                    <div>123</div>
                  </a>
                </Link>
              ))
            )}
          </>
        )}
      </div>
      <div className="flex justify-center w-full mx-auto my-12">
        <button
          className="w-32 h-16 text-sm font-medium text-center text-white rounded-lg animate-appear hover:text-black focus:text-black bg-gradient-to-br from-gray-500 to-gray-700 hover:bg-black"
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
    </div>
  );
}
