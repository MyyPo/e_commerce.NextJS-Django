import Link from "next/link";
import Image from "next/image";
import React from "react";

import { useThumbnail } from "../../hooks/fetchThumbnail";
import Spinner from "../../components/Spinner";

function Suggestions(props) {
  const { data, isLoading, isFetching } = useThumbnail();

  return (
    <div className="w-full mt-2 border-4 rounded-md">
      <Link
        className="absolute w-full h-full"
        href={`/product/${encodeURIComponent(props.suggestion.slug)}`}
      >
        <a className="flex items-center w-auto h-12 gap-3 bg-gray-200 shadow-md justify-left">
          {data?.get_image ? (
            <div className="w-12 ml-3">
              <Image
                className="rounded-lg"
                width={44}
                height={44}
                src={encodeURI(data.get_image)}
                alt=""
              />
            </div>
          ) : (
            <div className="w-12 ml-3">
              <Spinner className="" />
            </div>
          )}
          <p className="">{props.suggestion.title}</p>
        </a>
      </Link>
    </div>
  );
}

export default Suggestions;
