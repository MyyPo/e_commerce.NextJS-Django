import React from "react";
import Image from "next/image";
import fins from "../../public/fins.png";
import mask from "../../public/mask.jpg";
import SignInPortal from "../Header/SignInPortal";

function ProductModal({ state, setState, skeletonPhotos }) {
  return (
    <>
      <Image
        onClick={() => setState({ type: "OPEN_MODAL" })}
        className="cursor-pointer"
        layout="responsive"
        src={state.photoOpened == 2 ? mask : fins}
        alt="fins"
      ></Image>
      <>
        <SignInPortal selector="#SignIn">
          <div
            className={`${
              state.modal ? "block" : "hidden"
            } fixed top-0 left-0 z-10  w-screen h-screen backdrop-grayscale  bg-black bg-opacity-90  flex justify-center`}
          >
            <span
              className="absolute cursor-pointer text-[50px] font-bold text-white left-3/4 top-2 md:right-1/3 md:-top-4"
              onClick={() => setState({ type: "CLOSE_MODAL" })}
            >
              &times;
            </span>
            <div className="w-full h-full mt-24 md:mt-12 md:w-2/3 md:h-2/3 lg:w-1/3 lg:h-2/3">
              <Image
                // onClick={() => setState({ type: "OPEN_MODAL" })}
                className="w-full h-full"
                layout="responsive"
                src={state.modalPhotoOpened == 2 ? mask : fins}
                alt="fins"
              ></Image>

              <div className="flex justify-center gap-1 mt-2">
                {skeletonPhotos.length > 1 &&
                  skeletonPhotos.map((photo, index) => (
                    <div
                      onClick={() =>
                        setState({
                          type: "SET_MODAL_PHOTO",
                          payLoad: index + 1,
                        })
                      }
                      key={photo}
                      className={`w-1/4 cursor-pointer`}
                    >
                      <Image
                        className="w-full h-full"
                        layout="responsive"
                        src={fins}
                        alt="fins"
                      ></Image>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </SignInPortal>
      </>
      <div className="" onClick={() => setState({ type: "OPEN_MODAL" })}></div>
    </>
  );
}

export default ProductModal;
