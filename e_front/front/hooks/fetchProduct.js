class HTTPError extends Error {}
import { useQuery } from "@tanstack/react-query";

const fetchProduct = async (slug) => {
  const request = await fetch(
    process.env.NEXT_PUBLIC_PRODUCTS + slug + "/"
    // `http://192.168.0.105:8000/api/products/${slug}/`
  );
  if (!request.ok) {
    throw new HTTPError(`Fetch error: ${request.statusText}`);
  }
  const data = await request.json();
  return data;
};

const useProduct = (slug) => {
  return useQuery(["product"], () => fetchProduct(slug));
};

export { fetchProduct, useProduct };
