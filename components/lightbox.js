import { useState, useRef, useEffect, createRef } from "react";
import Image from "next/image";

import arrowLeft from "../iconmonstr-arrow-79.svg"
import arrowRight from "../iconmonstr-arrow-37.svg"



// WIP -- namiesto tohoto spravit "stripes"
const ThumbsFixedCount = ({ selectedId, setSelectedId, images }) => {

    // images

    const selectedImgIndex = images.findIndex(({ id }) => id === selectedId);
    const thumbCount = 3;


    // pick images to be rendered in thumbnails from all images provided to lightbox element
    // should only work for odd thumbCount
    const startIndex = Math.min(
        Math.max(0, selectedImgIndex - parseInt((thumbCount - 1) / 2)),
        images.length - thumbCount
    );
    // const endIndex = Math.min(startIndex + thumbCount, images.length - 1);
    const visibleThumbs = images.slice(startIndex, startIndex + thumbCount);

    return (
        <div className="m-auto flex justify-center h-40 w-full bg-red-200 gap-0">
            {visibleThumbs.map(({ id, width, height, url }) => {

                // this should be computed somwhere else, to avoid on every render
                const containerHeight = 144;
                const containerWidth = parseInt(width / (height / containerHeight));

                return (
                    <div
                        key={id}
                        className={"relative h-full" + (id !== selectedId ? " opacity-60" : "")}
                        style={{
                            width: `${containerWidth}px`,
                            height: `${containerHeight}px`,
                            flexGrow: containerWidth,
                            flexShrink: containerWidth,
                        }}
                    >
                        <Image
                            src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${url}`}
                            // width={width}
                            // height={height}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                )
            })}
        </div>
    )
}

const LightboxCenter = ({ initialSelectedId, images, closeFn, ...props }) => {

    // SVG / graphics will be done after functionality is fine
    // const arrow = (
    //     <svg width="100" height="480" version="1.1" xmlns="http://www.w3.org/2000/svg">

    //         {/* <line x1="10" x2="50" y1="110" y2="150" stroke="orange" stroke-width="5" /> */}

    //         <polyline points="99 479 0 239 99 0"
    //             stroke="orange" fill="transparent" stroke-width="5" />
    //     </svg>
    // )

    const [selectedId, setSelectedId] = useState(initialSelectedId);

    const selectedImgIdx = images.findIndex(img => img.id === selectedId);
    if (selectedImgIdx === -1) {
        // return <div>problem</div>
        throw new Error("Unable to find image for id")
    }

    // copy
    const selectedImg = { ...images[selectedImgIdx] }

    // may be moved into useEffect
    const selectNextImage = (currentImgId, images, aug) => {

        const curIdx = images.findIndex(({ id }) => currentImgId === id);
        if (curIdx === -1) {
            throw new Error("Unable to find image for id")
        }

        const nextIdx = curIdx + aug;
        if (nextIdx < 0 || nextIdx >= images.length) {
            return
        }

        const { id: nextImgId } = images[nextIdx]
        setSelectedId(nextImgId);
    }

    // keyboard input handling
    useEffect(() => {
        const kbHandler = (e) => {
            console.log(e)
            switch (e.code) {
                case "ArrowLeft":
                    e.preventDefault()
                    selectNextImage(selectedId, images, -1);
                    break;
                case "ArrowRight":
                    e.preventDefault()
                    selectNextImage(selectedId, images, 1);
                    break;
                case "Escape":
                    e.preventDefault();
                    closeFn();
                    break;
                default:
                    console.log("OTHER")
                    break;
            }
        }
        document.addEventListener("keydown", kbHandler);
        return () => document.removeEventListener("keydown", kbHandler);
    }, [images, selectedId])


    return (
        <>
            <div className="rounded-full hover:cursor-pointer text-center fixed w-14 h-14 top-4 right-8 p-4 bg-white bg-opacity-90 z-30" onClick={closeFn}>X</div>
            <div className={
                "flex flex-col gap-2 " +
                "fixed top-0 left-0 z-20 " +
                "w-screen h-screen " +
                "pt-4 pb-4 " +
                // "flex-shrink-0 " +
                "bg-gray-900 bg-opacity-95"
            }>
                <div className="flex flex-col justify-center flex-grow">
                    <div className="relative h-full">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${selectedImg.url}`}
                            // width={images[selectedImgIdx].width}
                            // height={images[selectedImgIdx].height}
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>

                </div>
                <ThumbsFixedCount
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                    images={images}
                // closeFn={closeFn} 
                />
            </div>
        </>
    )
}




// spodek
const LightboxBottom = ({ initialSelectedId, images, closeFn, ...props }) => {

    const [selectedId, setSelectedId] = useState(initialSelectedId);

    const selectedImgIdx = images.findIndex(img => img.id === selectedId);
    if (selectedImgIdx === -1) {
        // return <div>problem</div>
        throw new Error("Unable to find image for id")
    }

    // copy
    const selectedImg = { ...images[selectedImgIdx] }

    // may be moved into useEffect
    const selectNextImage = (currentImgId, images, aug) => {

        const curIdx = images.findIndex(({ id }) => currentImgId === id);
        if (curIdx === -1) {
            throw new Error("Unable to find image for id")
        }

        const nextIdx = curIdx + aug;
        if (nextIdx < 0 || nextIdx >= images.length) {
            return
        }

        const { id: nextImgId } = images[nextIdx]
        setSelectedId(nextImgId);
    }

    // keyboard input handling
    useEffect(() => {
        const kbHandler = (e) => {
            console.log(e)
            switch (e.code) {
                case "ArrowLeft":
                    e.preventDefault()
                    selectNextImage(selectedId, images, -1);
                    break;
                case "ArrowRight":
                    e.preventDefault()
                    selectNextImage(selectedId, images, 1);
                    break;
                case "Escape":
                    e.preventDefault();
                    closeFn();
                    break;
                default:
                    console.log("OTHER")
                    break;
            }
        }
        document.addEventListener("keydown", kbHandler);
        return () => document.removeEventListener("keydown", kbHandler);
    }, [images, selectedId])

    return (
        <>
            <div className="rounded-full hover:cursor-pointer text-center fixed w-14 h-14 top-4 right-8 p-4 bg-white bg-opacity-90 z-30" onClick={closeFn}>X</div>
            <div className={
                "flex flex-col space-y-8 " +
                "fixed top-0 left-0 z-20 " +
                "w-screen h-screen " +
                "pt-4 pb-4 " +
                // "flex-shrink-0 " +
                "bg-gray-900 bg-opacity-95"
            }>
                <div className="flex flex-row justify-center flex-grow">
                    {/* <div className="relative w-1/5 h-3/5">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${selectedImg.url}`}
                            // width={images[selectedImgIdx].width}
                            // height={images[selectedImgIdx].height}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div> */}
                    <div className="relative w-3/5">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${selectedImg.url}`}
                            // width={images[selectedImgIdx].width}
                            // height={images[selectedImgIdx].height}
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                    {/* <div className="relative w-1/5">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${selectedImg.url}`}
                            // width={images[selectedImgIdx].width}
                            // height={images[selectedImgIdx].height}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div> */}

                </div>

            </div>
        </>
    )
}












// TODO toto komplet prerobit
// dat tam sipky? resp swipe na telefone
const Thumbnails = ({ selectedId, setSelectedId, images, closeFn, ...props }) => {

    // set only once per lifetime of object
    const [thumbRefs, setThumbRefs] = useState(Array(images.length).fill().map(() => createRef()));

    const selectedIdx = images.findIndex(({ id }) => id === selectedId)
    if (selectedIdx === -1) {
        throw new Error("Unable to find image for id")
    }

    // scroll to selected image
    useEffect(() => {
        thumbRefs[selectedIdx].current.scrollIntoView({ behavior: "smooth", block: "start", inline: "center" });
    }, [selectedId, images, thumbRefs])


    return (
        /* following div used just for centering.
         * when doing flex with overflow-x-scroll
         * and setting justification to center, it breaks
         * layout, for reasons that i currently have no time
         * to investigate.
         */
        <div className="flex justify-center pl-8 pr-8">
            <div className="h-48 w-auto flex overflow-x-scroll space-x-8">

                {images.map((img, idx) => {
                    // if (idx > 6) return null
                    return (
                        <div key={img.id} ref={thumbRefs[idx]} className="relative h-full hover:cursor-pointer">
                            <img
                                // width={img.width} 
                                // height={img.height}
                                className="block h-full max-w-max"
                                // layout="fill"
                                // objectFit="contain"
                                src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${img.url}`}
                                style={img.id === selectedId ? { opacity: "1" } : { opacity: "0.5" }}
                                onClick={() => setSelectedId(img.id)}
                            />
                        </div>

                    )
                })}
            </div>
        </div>
    )
}

export const Lightbox1 = ({ initialSelectedId, images, closeFn, ...props }) => {

    const [selectedId, setSelectedId] = useState(initialSelectedId);

    const selectedImgIdx = images.findIndex(img => img.id === selectedId);
    if (selectedImgIdx === -1) {
        // return <div>problem</div>
        throw new Error("Unable to find image for id")
    }

    // copy
    const selectedImg = { ...images[selectedImgIdx] }

    // may be moved into useEffect
    const selectNextImage = (currentImgId, images, aug) => {

        const curIdx = images.findIndex(({ id }) => currentImgId === id);
        if (curIdx === -1) {
            throw new Error("Unable to find image for id")
        }

        const nextIdx = curIdx + aug;
        if (nextIdx < 0 || nextIdx >= images.length) {
            return
        }

        const { id: nextImgId } = images[nextIdx]
        setSelectedId(nextImgId);
    }

    // keyboard input handling
    useEffect(() => {
        const kbHandler = (e) => {
            console.log(e)
            switch (e.code) {
                case "ArrowLeft":
                    e.preventDefault()
                    selectNextImage(selectedId, images, -1);
                    break;
                case "ArrowRight":
                    e.preventDefault()
                    selectNextImage(selectedId, images, 1);
                    break;
                case "Escape":
                    e.preventDefault();
                    closeFn();
                    break;
                default:
                    console.log("OTHER")
                    break;
            }
        }
        document.addEventListener("keydown", kbHandler);
        return () => document.removeEventListener("keydown", kbHandler);
    }, [images, selectedId])


    return (
        <>
            <div className="rounded-full hover:cursor-pointer text-center fixed w-14 h-14 top-4 right-8 p-4 bg-white bg-opacity-90 z-30" onClick={closeFn}>X</div>
            <div className={
                "flex flex-col space-y-8 " +
                "fixed top-0 left-0 z-20 " +
                "w-screen h-screen " +
                "pt-4 pb-4 " +
                // "flex-shrink-0 " +
                "bg-gray-900 bg-opacity-95"
            }>
                <div className="flex flex-col justify-center flex-grow">
                    <div className="relative h-full">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${selectedImg.url}`}
                            // width={images[selectedImgIdx].width}
                            // height={images[selectedImgIdx].height}
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                </div>
                <Thumbnails
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                    images={images}
                // closeFn={closeFn} 
                />
            </div>
        </>
    )
}





















// TODO lightbox4 -- s obrazom v pozadi pol na pol
function Lightbox3({ initialSelectedId, images, closeFn, ...props }) {

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
            <div className="z-30 gap-2 fixed w-screen h-screen top-0 left-0 flex justify-center items-center bg-gray-800 bg-opacity-90">
                <div
                    className="relative max-w-[32px] md:max-w-[128px] h-[100%]"
                    style={{
                        flexGrow: 1,
                        // maxWidth: "128px"
                    }}
                    onClick={() => selectImage(-1)}
                >
                    {prevImg ? (
                        <>
                            <Image
                                src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${prevImg.url}`}
                                layout="fill"
                                objectFit="cover"
                                className="filter blur-sm"
                            />
                            <div className="relative h-full w-full">
                                <Image
                                    src={arrowLeft.src}
                                    layout="fill"
                                    objectFit="contain"
                                    className="opacity-60"
                                />
                            </div>
                        </>
                    ) : null}

                </div>
                <div className="relative self-stretch"
                    style={{
                        flexGrow: 1
                    }}
                >
                    <Image
                        src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${selectedImg.url}`}
                        // width={selectedImg.width}
                        // height={selectedImg.height}
                        // layout="responsive"
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
                <div
                    className="relative max-w-[32px] md:max-w-[128px] h-[100%]"
                    style={{
                        flexGrow: 1,
                        // maxWidth: "128px"
                    }}
                    onClick={() => selectImage(1)}
                >
                    {nextImg ? (
                        <>
                            <Image
                                src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${nextImg.url}`}
                                layout="fill"
                                objectFit="cover"
                                className="filter blur-sm"
                            />
                            <div className="relative h-full w-full">
                                <Image
                                    src={arrowRight.src}
                                    layout="fill"
                                    objectFit="contain"
                                    className="opacity-60"
                                />
                            </div>
                        </>
                    ) : null}

                </div>
            </div>
            <div
                className="rounded-full hover:cursor-pointer text-center fixed w-14 h-14 top-4 right-8 p-4 bg-white bg-opacity-90 z-30"
                onClick={closeFn}
            >
                X
            </div>
        </>
    )
}

function Lightbox4({ initialSelectedId, images, closeFn, ...props }) {

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

    const nextNextImg = selectedImgIndex + 2 < images.length ? images[selectedImgIndex + 2] : null;
    // console.log(nextNextImg)

    const prevPrevImg = selectedImgIndex - 2 >= 0 ? images[selectedImgIndex - 2] : null;

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

                    <div className="relative w-1/2 filter blur-sm">
                        {prevImg ? (
                            <>

                                <Image
                                    src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${prevImg.url}`}
                                    layout="fill"
                                    objectFit="cover"
                                    className=""
                                />

                                {prevPrevImg ? (
                                    <div className="relative w-1/2 filter blur-sm">
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${prevPrevImg.url}`}
                                            layout="fill"
                                            objectFit="cover"
                                            priority
                                        // className="hidden"
                                        />
                                    </div>
                                ) : null}

                            </>
                        ) : null}
                    </div>

                    <div className="relative w-1/2 filter blur-sm">
                        {nextImg ? (
                            <>

                                <Image
                                    src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${nextImg.url}`}
                                    layout="fill"
                                    objectFit="cover"
                                    className=""
                                />

                                {nextNextImg ? (
                                    <div className="relative w-1/2 filter blur-sm">
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${nextNextImg.url}`}
                                            layout="fill"
                                            objectFit="cover"
                                            priority
                                        // className="hidden"
                                        />
                                    </div>
                                ) : null}

                            </>
                        ) : null}
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
                                        <Image
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
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${selectedImg.url}`}
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
                                        <Image
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

                    {/* TODO following absolute position */}
                    {/* <div
                        className="rounded-full hover:cursor-pointer text-center fixed w-14 h-14 top-4 right-8 p-4 bg-white bg-opacity-90 z-30"
                        onClick={closeFn}
                    >
                        X
                    </div> */}
                    <div className="absolute h-16 w-16 shadow-lg top-[8px] right-[8px] bg-white" onClick={closeFn}>
                        <span
                            className="w-full h-full align-middle flex items-center justify-center text-center text-3xl text-gray-500"
                        >
                            X
                        </span>
                    </div>
                </div>
            </div>
            {/* prefetching of next next images */}
            {/* {nextNextImg ? (
                <div className="w-screen h-screen relative">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${nextImg.url}`}
                        layout="fill"
                        objectFit="cover"
                        className=""
                    />
                </div>
            ) : null} */}
        </>
    )
}


// based on Lightbox3 -- similar colors, "ploty", consistent with exhibitions
function Lightbox5({ initialSelectedId, images, closeFn, ...props }) {
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
            <div className="z-30 gap-2 fixed w-screen h-screen top-0 left-0 flex justify-center items-center bg-gray-800 bg-opacity-90">
                <div
                    className="relative max-w-[32px] md:max-w-[128px] h-[100%]"
                    style={{
                        flexGrow: 1,
                        // maxWidth: "128px"
                    }}
                    onClick={() => selectImage(-1)}
                >
                    {prevImg ? (
                        <>
                            <Image
                                src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${prevImg.url}`}
                                layout="fill"
                                objectFit="cover"
                                className="filter blur-sm"
                            />
                            <div className="relative h-full w-full">
                                <Image
                                    src={arrowLeft.src}
                                    layout="fill"
                                    objectFit="contain"
                                    className="opacity-60"
                                />
                            </div>
                        </>
                    ) : null}

                </div>
                <div className="relative self-stretch"
                    style={{
                        flexGrow: 1
                    }}
                >
                    <Image
                        src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${selectedImg.url}`}
                        // width={selectedImg.width}
                        // height={selectedImg.height}
                        // layout="responsive"
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
                <div
                    className="relative max-w-[32px] md:max-w-[128px] h-[100%]"
                    style={{
                        flexGrow: 1,
                        // maxWidth: "128px"
                    }}
                    onClick={() => selectImage(1)}
                >
                    {nextImg ? (
                        <>
                            <Image
                                src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${nextImg.url}`}
                                layout="fill"
                                objectFit="cover"
                                className="filter blur-sm"
                            />
                            <div className="relative h-full w-full">
                                <Image
                                    src={arrowRight.src}
                                    layout="fill"
                                    objectFit="contain"
                                    className="opacity-60"
                                />
                            </div>
                        </>
                    ) : null}

                </div>
            </div>
            <div
                className="rounded-full hover:cursor-pointer text-center fixed w-14 h-14 top-4 right-8 p-4 bg-white bg-opacity-90 z-30"
                onClick={closeFn}
            >
                X
            </div>
        </>
    )
}



export default Lightbox4;

// central lightbox4
{/* <div className="relative self-stretch"
                        style={{
                            flexGrow: 1
                        }}
                    >
                        <Image
                            src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${selectedImg.url}`}
                            // width={selectedImg.width}
                            // height={selectedImg.height}
                            // layout="responsive"
                            layout="fill"
                            objectFit="contain"
                        />
                    </div> */}









{/* <img className="block h-full" src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${images[0].url}`} /> */ }



{/* <Image 
width={img.width} 
height={img.height}
layout="fill"
objectFit="contain"
src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${img.url}`} /> */}