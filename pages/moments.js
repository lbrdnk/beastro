import { useState, useEffect } from "react";
import Image from "next/image";
import { getApiAccessToken, getBoxFittingDimensions, useWindowDimensions, groupByHeight } from "../lib/utils";

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

    // no point counting photo columns when window size was not set
    // -> no point rendering when have no photo columns
    if (windowWidth === 0) {
        return null
    }

    let columnCount = 3;
    if (windowWidth >= 480) {
        columnCount = 5;
    }

    const gs = groupByHeight(allPhotos, columnCount).groups;

    return (

        // main container
        <div className="flex flex-row w-full justify-center items-start p-4 ">
            {/* photo container */}
            <div className="flex flex-row w-full justify-center items-stretch max-w-3xl space-x-4">

                {gs.map((colPhotoArr, idx) => {
                    return (
                        <div key={idx} className="flex flex-col flex-grow justify-between space-y-4">
                            {colPhotoArr.map((photo, index) => (
                                <div
                                    key={photo.id}
                                    className="relative shadow-lg"
                                >
                                    <Image
                                        src={process.env.NEXT_PUBLIC_CMS_BASE_URL + photo.url}
                                        width={photo.width}
                                        height={photo.height}
                                        layout="responsive"
                                        sizes={"30vw"}
                                        lazyBoundary="1400px"
                                    />
                                </div>

                            ))}
                        </div>
                    )
                })}
            </div>
        </div>
    );

}
