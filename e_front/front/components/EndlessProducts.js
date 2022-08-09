import React from 'react'
import { fetchInfiniteProducts, useInfiniteProducts } from '../hooks/fetchInfiniteProducts';
import Link from 'next/link';


export function EndlessProducts(props) {
  const {data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage} =
    useInfiniteProducts("products", ({ pageParam }) => fetchInfiniteProducts({pageParam}), {
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
  // const {session} = props
  // console.log(session)
  return (
    <div className='grid justify-center grid-flow-row grid-rows-1'>
      {isLoading ? (
        <p>loading...</p>
      ) : (
        <>
          
            {data.pages.map((group, i) =>
              group.response.map((product) => 
              <Link href={`/product/${encodeURIComponent(product.slug)}`} key={i}>{product.title}</Link>)
            )}
          
          <button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
              ? "Load More"
              : "Nothing more to load"}
          </button>
        </>
      )}
    </div>
  );
}