import { useInfiniteQuery } from "@tanstack/react-query";
// import { getSession } from "next-auth/react";

// const fetchInfiniteProducts = async ({
//   pageParam = "http://127.0.0.1:8000/api/products/",
// }) => {
//   const session = await getSession();
//   console.log(session);
//   const request = await fetch(pageParam, {
//     headers: { Authorization: `Bearer ${session.accessToken}` },
//   });
//   const { results, next } = await request.json();
//   return { response: results, nextPage: next };
// };
const fetchInfiniteProducts = async ({
  pageParam = "http://192.168.0.105:8000/api/products/",
}) => {
  const request = await fetch(pageParam);
  const { results, next } = await request.json();
  return { response: results, nextPage: next };
};

function useInfiniteProducts() {
  return useInfiniteQuery(
    ["products"],
    ({ pageParam }) => fetchInfiniteProducts({ pageParam }),
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  );
}

export { fetchInfiniteProducts, useInfiniteProducts };
