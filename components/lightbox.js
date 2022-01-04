import { useState, useRef, useEffect, createRef } from "react";
import Image from "next/image";

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
                        <div ref={thumbRefs[idx]} className="relative h-full hover:cursor-pointer">
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

export default ({ initialSelectedId, images, closeFn, ...props }) => {

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


{/* <img className="block h-full" src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${images[0].url}`} /> */ }



{/* <Image 
width={img.width} 
height={img.height}
layout="fill"
objectFit="contain"
src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${img.url}`} /> */}