import React from "react";
import Suggestions from "./Suggestions";
import { useState } from "react";
import { useSlugs } from "../../hooks/fetchSlugs";
import XMark from "../../public/x.svg";

function SearchBarMobile({ setSearchWindow, searchWindow }) {
  const { data, isLoading, isFetching } = useSlugs();
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const onChangeHandler = (text) => {
    let matches = [];
    if (text.length > 2) {
      matches = data.filter((slug) => {
        const regex = new RegExp(`${text}`, "gi");
        return slug.slug.match(regex);
      });
    }
    setSuggestions(matches);
    setText(text);
  };
  if (searchWindow)
    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 w-11/12 m-auto bg-gray-300 rounded-lg md:hidden ring-4 ring-gray-200 z-60 h-3/4">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="absolute top-0 right-0">
            <button
              className="w-8 h-8 md:w-10 md:h-10"
              onClick={() => setSearchWindow(false)}
            >
              <XMark className="fill-gray-600" />
            </button>
          </div>
          <div className="flex items-center justify-center w-full h-12 mt-3">
            <div className="relative flex justify-center w-4/5 ">
              <input
                className="w-full h-12 text-sm text-gray-900 bg-gray-100 border-gray-300 rounded-full shadow-lg md:placeholder-gray-600 md:rounded-lg hover:bg-white placeholder:font-bold pl-11"
                type="text"
                placeholder="Search here"
                onChange={(e) => onChangeHandler(e.target.value)}
                value={text}
                required
                onBlur={() => {
                  setTimeout(() => {
                    setSuggestions([]);
                  }, 100);
                }}
              />
              <div className="absolute right-3 top-1">
                <button
                  className="w-12 h-10 text-white bg-gray-800 ring-2 ring-gray-600 rounded-xl"
                  onClick={() => setSearchWindow(false)}
                >
                  Go!
                </button>
              </div>
            </div>
          </div>
          <div className="w-full h-full px-2">
            {suggestions &&
              suggestions.map((suggestion, i) => (
                <Suggestions
                  setSearchWindow={setSearchWindow}
                  key={i}
                  suggestion={suggestion}
                />
              ))}
          </div>
        </div>
      </div>
    );
}

export default SearchBarMobile;
