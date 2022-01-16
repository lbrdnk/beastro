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

    const gs = groupByHeight(allPhotos, 5).groups;

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
