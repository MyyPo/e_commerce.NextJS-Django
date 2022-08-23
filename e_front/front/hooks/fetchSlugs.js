import { useQuery } from "@tanstack/react-query";

class HTTPError extends Error {}

const fetchSlugs = async (req, res) => {
  const request = await fetch(
    `http://192.168.0.105:8000/api/products/slugs/get/?page_size=1000`
  );
  if (!request.ok) {
    throw new HTTPError(`Fetch error: ${request.statusText}`);
  }
  const data = await request.json();
  return data;
};

const useSlugs = () => {
  return useQuery(["slugs"], () => fetchSlugs());
};

export { fetchSlugs, useSlugs };
