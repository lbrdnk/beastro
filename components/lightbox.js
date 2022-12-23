import { useState } from "react";
import LegacyImage from "next/legacy/image";
import Image from "next/image"

import arrowLeft from "../public/icons/arrow_left.svg"
import arrowRight from "../public/icons/arrow_right.svg"

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
        setSelectedImgId(images[newIndex].id)
    }

    return (
        <>
            {/* container for padding and wh setting only */}
            <div className="z-30 gap-2 fixed w-screen h-screen top-0 left-0 flex justify-center items-stretch bg-gray-800 bg-opacity-90">
                {/* stretch grow? */}
                <div className="relative h-full w-full flex">

                    <div className="relative w-1/2 bg-red-100 opacity-25">
                        {// wrapped in case null is prev image and url not derefable
                         // cache for "central" image should be used here but not in next
                            prevImg && <Image
                                src={prevImg.url}
                                fill
                                sizes={"10vw"}
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
                                sizes={"10vw"}
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
                                    <div className="relative h-full w-full">
                                        <LegacyImage
                                            src={arrowLeft.src}
                                            layout="fill"
                                            objectFit="contain"
                                            className="opacity-50"
                                        />
                                    </div>
                                </div>

                                <div className="relative"
                                    style={{
                                        flexGrow: 1
                                    }}
                                >
                                    <LegacyImage
                                        src={selectedImg.url}
                                        // width={selectedImg.width}
                                        // height={selectedImg.height}
                                        // layout="responsive"
                                        layout="fill"
                                        objectFit="contain"
                                    />
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
                                    <div className="relative h-full w-full">
                                        <LegacyImage
                                            src={arrowRight.src}
                                            layout="fill"
                                            objectFit="contain"
                                            className="opacity-50"
                                        />
                                    </div>
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