import { useQuery } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

class HTTPError extends Error {}

const fetchThumbnail = async (req, res) => {
  const session = await getSession();
  const request = await fetch(`http://127.0.0.1:8000/api/products/silver`, {
    headers: { Authorization: `Bearer ${session.accessToken}` },
  });
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
