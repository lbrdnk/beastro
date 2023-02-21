import { useEffect, useRef, useState } from "react";
import LegacyImage from "next/legacy/image";
import Image from "next/image"

// import { MdOutlineArrowLeft, MdOutlineArrowRight } from "react-icons/md";
import { AiOutlineCaretRight, AiOutlineCaretLeft } from "react-icons/ai";

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

    // TODO keyboard handling for desktop

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

    // TODO rem redundant divs, bg images residue
    return (
        <>
            {/* container for padding and wh setting only */}
            <div className="z-30 gap-2 fixed w-screen h-screen top-0 left-0 flex justify-center items-stretch bg-gray-800 bg-opacity-90">
                {/* stretch grow? */}
                <div className="relative h-full w-full flex">

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
                                    <div className="h-full w-full flex justify-center items-center">
                                        {/* <AiOutlineCaretLeft size={32} color="red" title="next" /> */}
                                        <AiOutlineCaretLeft style={{width: "100%", height: "100%"}} color="red" title="next" />
                                    </div>
                                    // <MdOutlineArrowLeft />
                                    // <div className="relative h-full w-full">
                                    //     <LegacyImage
                                    //         src={arrowLeft.src}
                                    //         layout="fill"
                                    //         objectFit="contain"
                                    //         className="opacity-50"
                                    //     />
                                    // </div>
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
                                        alt="lightbox img"
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
                                    <div className="h-full w-full flex  justify-center items-center">
                                        {/* <div className="h-[64px] w-[128px] overflow-hidden flex justify-center items-center"> */}
                                        <AiOutlineCaretRight style={{width: "100%", height: "100%"}} color="red" title="next" />
                                        {/* </div> */}
                                    </div>
                                }
                            </div>

                        </div>
                    </div>
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


/*

size={500}

[300px] left-[-300px]
*/