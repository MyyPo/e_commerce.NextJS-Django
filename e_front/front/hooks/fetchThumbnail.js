import { useQuery } from "@tanstack/react-query";

class HTTPError extends Error {}

const fetchThumbnail = async (req, res) => {
  const request = await fetch(`http://192.168.0.105:8000/api/products/silver`);
  if (!request.ok) {
    throw new HTTPError(`Fetch error: ${request.statusText}`);
  }
  const data = await request.json();
  return data;
};

const useThumbnail = () => {
  return useQuery(["thumbnail"], () => fetchThumbnail());
};

export { fetchThumbnail, useThumbnail };
