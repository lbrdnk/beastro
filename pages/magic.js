// import { useState, useEffect } from "react";
import Image from "next/image";
import { getApiAccessToken, getBoxFittingDimensions, useWindowDimensions } from "../lib/utils";

export async function getStaticProps(context) {

    const token = await getApiAccessToken();


    const response = await fetch(
        process.env.NEXT_PUBLIC_CMS_BASE_URL
        + "/moments?"
        + new URLSearchParams({ _limit: 50 }), {
        headers: new Headers({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        })
    });

    if (response.status !== 200) {
        throw (new Error(`Authentication returned ${response.status}`))
    }

    const data = await response.json();

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
    const headerHeight = 80;

    const { width: innerWidth, height: innerHeight } = useWindowDimensions();

    const availWidth = Math.min(innerWidth, 768);
    const availHeight = innerHeight - headerHeight;


    return (

        // main container
        <div className="mt-20 flex flex-row w-full justify-center items-center">
            {/* photo container */}
            <div className="flex flex-row flex-wrap w-full max-w-3xl justify-center items-center">

                {props.data.map(({ photos }) => {

                    photos.reverse();

                    return photos.map((photo, index) => {

                        const { width: imageOrigWidth, height: imageOrigHeight } = photo;
                        const { width, height } = getBoxFittingDimensions(availWidth, availHeight, imageOrigWidth, imageOrigHeight);

                        return (
                            <div
                                key={photo.id}
                                className="p-4 "
                                style={{
                                    width: `${width}px`,
                                    height: `${height}px`
                                }}
                            >
                                <div
                                    key={photo.id}
                                    className="relative bg-white shadow-xl"
                                    style={{

                                    }}
                                >
                                    <Image
                                        src={process.env.NEXT_PUBLIC_CMS_BASE_URL + photo.url}
                                        width={photo.width}
                                        height={photo.height}
                                        layout="responsive"
                                        sizes={"100vw"}
                                        priority
                                    />
                                </div>
                            </div>
                        );
                    })
                })}
            </div>
        </div>
    );
}
