import Link from "next/link";
import Image from "next/image";

import { useThumbnail } from "../../hooks/fetchThumbnail";
import React from "react";

function Suggestions(props) {
  const { data, isLoading, isFetching } = useThumbnail();

  return (
    <div className="w-full mt-2 border-4 rounded-md">
      <Link
        className="absolute w-full"
        href={`/product/${encodeURIComponent(props.suggestion.slug)}`}
      >
        <div className="flex items-center w-auto h-12 gap-3 bg-gray-200 shadow-md justify-left">
          {data?.get_image ? (
            <div className="ml-3">
              <Image
                className="rounded-lg"
                width={44}
                height={44}
                src={encodeURI(data.get_image)}
                alt=""
              />
            </div>
          ) : (
            <div className="w-5 h-5 ml-3 border-4 border-t-4 border-gray-300 rounded-full border-t-gray-600 animate-spin"></div>
          )}
          <p className="">{props.suggestion.title}</p>
        </div>
      </Link>
    </div>
  );
}

export default Suggestions;
