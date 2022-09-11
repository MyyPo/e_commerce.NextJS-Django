import React, { useReducer, useState, useEffect } from "react";
import Image from "next/image";
import fins from "../../public/fins.png";
import ProductModal from "./ProductModal";

const initialState = {
  photoOpened: 1,
  modal: false,
};

const skeletonPhotos = ["q", "w", "e", "r"];

const photoReducer = (state, action) => {
  switch (action.type) {
    case "NEXT_PHOTO":
      return {
        ...state,
        photoOpened: state.photoOpened + 1,
      };
    case "PREVIOUS_PHOTO":
      return {
        ...state,
        photoOpened: state.photoOpened - 1,
      };
    case "SET_PHOTO":
      return {
        ...state,
        photoOpened: action.payLoad,
      };
    case "OPEN_MODAL":
      return {
        ...state,
        modal: true,
        modalPhotoOpened: state.photoOpened,
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        modal: false,
      };
    case "NEXT_MODAL_PHOTO":
      return {
        ...state,
        modalPhotoOpened: state.modalPhotoOpened + 1,
      };
    case "SET_MODAL_PHOTO":
      return {
        ...state,
        modalPhotoOpened: action.payLoad,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

function ProductCarousel() {
  const [state, setState] = useReducer(photoReducer, initialState);

  useEffect(() => {
    if (state.modal) {
      document.getElementById("__next").style.position = "fixed";
    } else {
      document.getElementById("__next").style.position = "";
    }
  }, [state]);

  return (
    <div className="flex justify-center w-full mt-6 md:w-1/2">
      <div className="relative w-2/3">
        {/* {initialState.map((photo) => ( */}
        <div className="relative animate-appear">
          <div className={`${skeletonPhotos.length == 1 && "hidden"}`}>
            {state.photoOpened} / {skeletonPhotos.length}
          </div>
          <ProductModal
            state={state}
            setState={setState}
            skeletonPhotos={skeletonPhotos}
          ></ProductModal>
          {/* <Image layout="responsive" src={fins} alt="fins" /> */}
        </div>
        {/* ))} */}
        <a
          onClick={() =>
            state.photoOpened > 1 && setState({ type: "PREVIOUS_PHOTO" })
          }
          className={` absolute -left-8 md:text-3xl text-5xl font-bold cursor-pointer top-[45%] md:top-1/2  ${
            state.photoOpened == 1 && "hidden"
          } `}
        >
          &#10094;
        </a>
        <a
          onClick={() =>
            state.photoOpened < skeletonPhotos.length &&
            setState({ type: "NEXT_PHOTO" })
          }
          className={`absolute -right-8 md:text-3xl text-5xl font-bold cursor-pointer top-[45%] md:top-1/2
        ${state.photoOpened == skeletonPhotos.length && "hidden"}`}
        >
          &#10095;
        </a>
        <div className={` w-full mt-2 text-center`}>
          {skeletonPhotos.length > 1 &&
            skeletonPhotos.map((photo, index) => (
              <span
                onClick={() =>
                  setState({ type: "SET_PHOTO", payLoad: index + 1 })
                }
                className={`inline-block w-4 h-4 m-2 rounded-full cursor-pointer ${
                  state.photoOpened == index + 1
                    ? "bg-black ring-4 ring-black"
                    : "bg-gray-500"
                }`}
                key={photo}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default ProductCarousel;
