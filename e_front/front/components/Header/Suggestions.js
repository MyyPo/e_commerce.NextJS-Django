import Link from "next/link";
import Image from "next/image";
import React from "react";
import fins from "../../public/fins.png";

import { useThumbnail } from "../../hooks/fetchThumbnail";
import Spinner from "../../components/Spinner";

function Suggestions(props) {
  const { data, isLoading, isFetching } = useThumbnail();

  return (
    <button
      onClick={() => props.setSearchWindow(false)}
      className="w-full mt-2 border-4 rounded-md md:-mt-1"
    >
      <Link
        className="w-full h-full"
        href={`/product/${encodeURIComponent(props.suggestion.slug)}`}
      >
        <a className="flex items-center h-20 gap-3 bg-gray-200 shadow-md md:h-12 justify-left">
          {data?.get_image ? (
            <div className="flex h-12 ml-3 md:w-12">
              <Image
                className="rounded-lg "
                width={48}
                height={48}
                // src={fins}
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
    </button>
  );
}

export default Suggestions;
