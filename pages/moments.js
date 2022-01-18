import { useState, useEffect } from "react";
import Image from "next/image";
import { getApiAccessToken, getBoxFittingDimensions, useWindowDimensions, groupByHeight } from "../lib/utils";


import Lightbox from "../components/lightbox";

export async function getStaticProps(context) {

    const token = await getApiAccessToken();


    const response = await fetch(
        process.env.NEXT_PUBLIC_CMS_BASE_URL
        + "/moments?"
        + new URLSearchParams({ _limit: 500 }), {
        headers: new Headers({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        })
    });

    if (response.status !== 200) {
        throw (new Error(`Authentication returned ${response.status}`))
    }

    const data = await response.json();

    // generate layout

    // TODO remove?
    data.reverse();

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

    const allPhotos = ms.map(m => [...m.photos]).flat()



    // initialize null vs 0
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

    // console.log(windowWidth)



    let columnCount = 3;
    if (windowWidth >= 480) {
        columnCount = 5;
    }

    // TODO: maybe it makes sense to be more specific with constrains here, performance wise
    // let imageSize = windowWidth >= 480 ? "30vw" : "15vw";
    let imageSize = windowWidth >= 480 ? "200px" : "30vw"; // this looks fine
    // let imageSize = "200px";

    const gs = groupByHeight(allPhotos, columnCount).groups;

    const imagesForLight = gs.reduce((group, acc) => [...acc, ...group], [])

    const [isLightBoxOpened, setIsLightBoxOpened] = useState(false);
    const closeLightbox = () => setIsLightBoxOpened(false);
    const [lightboxImages, setLightboxImages] = useState(imagesForLight);
    const [selectedLightboxImageId, setSelectedLightboxImageId] = useState(null);
    // TODO how to recreate images list to scroll line by line?
    // currently scrolling by columns


    // THIS MUST BE PLACED AFTER HOOKS
    // no point counting photo columns when window size was not set
    // -> no point rendering when have no photo columns
    if (windowWidth === 0) {
        return null
    }

    return (
        <>
            {isLightBoxOpened && <Lightbox initialSelectedId={selectedLightboxImageId} images={lightboxImages} closeFn={closeLightbox} />}

            <div className="flex flex-row w-full justify-center items-start pt-2 md:pt-4 pl-2 pr-2 md:pl-0 md:pr-0">
                {/* photo container */}
                <div className="flex flex-row w-full justify-center items-stretch max-w-3xl space-x-4">

                    {gs.map((colPhotoArr, idx) => {
                        return (
                            <div key={idx} className="flex flex-col flex-grow justify-between space-y-4">
                                {colPhotoArr.map((photo, index) => (
                                    <div
                                        key={photo.id}
                                        className="relative shadow-lg"
                                        onClick={() => {
                                            setSelectedLightboxImageId(photo.id);
                                            setIsLightBoxOpened(true);
                                        }}
                                    >
                                        <Image
                                            src={process.env.NEXT_PUBLIC_CMS_BASE_URL + photo.url}
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
