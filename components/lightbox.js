import { useEffect, useRef, useState } from "react";
import LegacyImage from "next/legacy/image";
import Image from "next/image"

import arrowLeft from "../public/icons/arrow_left.svg"
import arrowRight from "../public/icons/arrow_right.svg"

export function boxFittingDimensions(ow, oh, iw, ih) {
    // transform rectangle's sides' lengths iw, ih with aspect ratio
    // unmodified, so it will fit into rect ow, oh
    //
    // original, inner
    //
    // picking min -- works because
    // if coef > 1 sides are to be enlarged. While enlarging intuition is
    // to enlarge least we can.
    // largest iw or ih wont become bigger than its o_ counterpart
    //
    // when downsizing (coef < 1), downsize MOST
    // biggest iw or ih must fit
    const coef = Math.min(ow / iw, oh / ih)
    return [iw * coef, ih * coef]
}

function Lightbox({ initialSelectedId, images, closeFn, ...props }) {

    const [selectedImgId, setSelectedImgId] = useState(initialSelectedId);

    const selectedImgIndex = images.findIndex(({ id }) => id === selectedImgId)
    if (selectedImgIndex === -1) {
        throw Error(`Unable to find image for id ${selectedImgId}`)
    }

    const prevImgIndex = selectedImgIndex - 1;
    const prevImg = prevImgIndex >= 0 ? images[prevImgIndex] : null;

    const selectedImg = images[selectedImgIndex]

    const nextImgIndex = selectedImgIndex + 1;
    const nextImg = nextImgIndex < images.length ? images[nextImgIndex] : null;

    const selectImage = addend => {
        const newIndex = selectedImgIndex + addend;
        if (newIndex < 0 || newIndex >= images.length) {
            return
        }
        setMainImgDesriedDims([])
        setSelectedImgId(images[newIndex].id)
    }

    // need ref to box where image will be rendered
    //
    // TODO upscaling onReisze
    const mainImgContainerRef = useRef(null);
    const [mainImgDesriedDims, setMainImgDesriedDims] = useState([]);
    useEffect(() => {
        setMainImgDesriedDims(
            boxFittingDimensions(
                mainImgContainerRef.current.offsetWidth,
                mainImgContainerRef.current.offsetHeight,
                selectedImg.width,
                selectedImg.height
            )
        )
    }, [selectedImgId])

    const isMainImgLast = selectedImgIndex + 1 === images.length
    const isMainImgFirst = selectedImgIndex === 0

    return (
        <>
            {/* container for padding and wh setting only */}
            <div className="z-30 gap-2 fixed w-screen h-screen top-0 left-0 flex justify-center items-stretch bg-gray-800 bg-opacity-90">
                {/* stretch grow? */}
                <div className="relative h-full w-full flex">

                    <div className="relative w-1/2 bg-red-100 opacity-25">
                        {
                            // wrapped for case null is prev image and url not derefable
                            // cache for "central" image should be used here but not in next
                            prevImg && <Image
                                src={prevImg.url}
                                fill
                                sizes={"50vw"}
                                alt="cicimbrus"
                                className="w-full object-cover"
                            />
                        }
                    </div>

                    <div className="relative w-1/2 border-green-100 opacity-25">
                        {// wrapped in case null is prev image and url not derefable
                            nextImg && <Image
                                src={nextImg.url}
                                fill
                                sizes={"50vw"}
                                alt="cicimbrus"
                                className="w-full object-cover"
                                priority
                            />
                        }
                    </div>

                    {true ? (
                        <div className="absolute left-[8px] right-[8px] ml-auto mr-auto top-[8px] bottom-[8px] mt-auto mb-auto">
                            {/* inner flex */}
                            <div className="flex space-x-2 w-full h-full">

                                {/* sipka */}
                                <div
                                    className="relative max-w-[32px] md:max-w-[128px] h-[100%] flex-grow"
                                    style={{
                                        flexGrow: 1,
                                        // maxWidth: "128px"
                                    }}
                                    onClick={() => selectImage(-1)}
                                >
                                    {!isMainImgFirst &&
                                        <div className="relative h-full w-full">
                                            <LegacyImage
                                                src={arrowLeft.src}
                                                layout="fill"
                                                objectFit="contain"
                                                className="opacity-50"
                                            />
                                        </div>
                                    }
                                </div>

                                <div
                                    ref={mainImgContainerRef}
                                    className="relative"
                                    style={{
                                        flexGrow: 1
                                    }}
                                >
                                    {/* show image right after we do have desired image dimensions
                                        to fit in bounding box
                                      */}
                                    {mainImgDesriedDims.length === 2 &&
                                        <Image
                                            src={selectedImg.url}
                                            fill
                                            sizes={`${parseInt(mainImgDesriedDims[0])}px`}
                                            alt="cicimbrus"
                                            className="object-contain"
                                            priority
                                        />
                                    }
                                </div>

                                {/* sipka */}
                                <div
                                    className="relative max-w-[32px] md:max-w-[128px] h-[100%] flex-grow"
                                    style={{
                                        flexGrow: 1,
                                        // maxWidth: "128px"
                                    }}
                                    onClick={() => selectImage(1)}
                                >
                                    {!isMainImgLast &&
                                        <div className="relative h-full w-full">
                                            <LegacyImage
                                                src={arrowRight.src}
                                                layout="fill"
                                                objectFit="contain"
                                                className="opacity-50"
                                            />
                                        </div>
                                    }
                                </div>

                            </div>
                        </div>

                    ) : null}

                    <div className="absolute h-16 w-16 shadow-lg top-[8px] right-[8px] bg-white cursor-pointer" onClick={closeFn}>
                        <span
                            className="w-full h-full align-middle flex items-center justify-center text-center text-3xl text-gray-500"
                        >
                            X
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Lightbox;