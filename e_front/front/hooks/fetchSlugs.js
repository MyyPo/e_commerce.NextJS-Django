import { useQuery } from "@tanstack/react-query";

class HTTPError extends Error {}

const fetchSlugs = async (req, res) => {
  const request = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_SLUGS + "?page_size=1000"
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
