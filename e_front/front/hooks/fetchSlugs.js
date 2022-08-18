import { useQuery } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

class HTTPError extends Error {}

const fetchSlugs = async (req, res) => {
  const session = await getSession();
  const request = await fetch(
    `http://127.0.0.1:8000/api/products/slugs/get/?page_size=1000`,
    { headers: { Authorization: `Bearer ${session.accessToken}` } }
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
