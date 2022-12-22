import { useState, useEffect } from "react";
import Image from "next/legacy/image";
import { groupByHeight, loadMoments } from "../lib/utils";


import Lightbox from "../components/lightbox";

export async function getStaticProps(context) {

    const moments = await loadMoments();

    const data = moments;

    return {
        props: {
            data,
        }
    }
}

export default function Moments({
    ...props
}) {

    const ms = props.data;

    const allPhotos = ms;

    const [windowWidth, setWindowWidth] = useState(0);

    // checking size of display to get column count
    useEffect(() => {
        const windowSizeHandler = () => {
            setWindowWidth(window.innerWidth)
        }
        windowSizeHandler() // thanks to THIS -- i can use empty dep list
        window.addEventListener("resize", windowSizeHandler)
        return () => window.removeEventListener("resize", windowSizeHandler)
    }, [])

    let columnCount = 3;
    if (windowWidth >= 480) {
        columnCount = 5;
    }

    let imageSize = windowWidth >= 480 ? "200px" : "30vw";

    const gs = groupByHeight(allPhotos, columnCount).groups;

    const imagesForLight = gs.reduce((group, acc) => [...acc, ...group], [])

    const [isLightBoxOpened, setIsLightBoxOpened] = useState(false);
    const closeLightbox = () => setIsLightBoxOpened(false);
    const [lightboxImages, setLightboxImages] = useState(imagesForLight);
    const [selectedLightboxImageId, setSelectedLightboxImageId] = useState(null);


    // THIS MUST BE PLACED AFTER HOOKS
    // no point counting photo columns when window size was not set
    // -> no point rendering when have no photo columns
    if (windowWidth === 0) {
        return null
    }

    return (
        <>
            {isLightBoxOpened && <Lightbox initialSelectedId={selectedLightboxImageId} images={lightboxImages} closeFn={closeLightbox} />}

            <div className="flex flex-row w-full justify-center items-start pt-2">
                {/* photo container */}
                <div className="flex flex-row w-full justify-center items-stretch max-w-3xl space-x-4 pl-2 pr-2">

                    {gs.map((colPhotoArr, idx) => {
                        return (
                            <div key={idx} className="flex flex-col flex-grow justify-between space-y-4">
                                {colPhotoArr.map((photo, index) => (
                                    <div
                                        key={photo.id}
                                        className="relative shadow-lg cursor-pointer"
                                        onClick={() => {
                                            setSelectedLightboxImageId(photo.id);
                                            setIsLightBoxOpened(true);
                                        }}
                                    >
                                        <Image
                                            src={photo.url}
                                            width={photo.width}
                                            height={photo.height}
                                            layout="responsive"
                                            sizes={imageSize}
                                            quality={50}
                                        // lazyBoundary="1400px"
                                        />
                                    </div>

                                ))}
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    );
}
