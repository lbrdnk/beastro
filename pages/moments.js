import { useState, useEffect } from "react";
import Image from "next/image";
import { getApiAccessToken, getBoxFittingDimensions, useWindowDimensions } from "../lib/utils";

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

// TODO: adjust to shrinkage 
const groupByHeight = (photoArr, colCount) => {

    const groups = photoArr.reduce((accHeights, currPhoto) => {

        const { minIdx } = accHeights.heights.reduce(({ curMin, minIdx }, curVal, curIdx) => (
            curVal < curMin ? { curMin: curVal, minIdx: curIdx } : { curMin, minIdx }
        ), {
            curMin: Number.MAX_VALUE,
            minIdx: -1
        })

        return {
            heights: [
                ...accHeights.heights.slice(0, minIdx),
                accHeights.heights[minIdx] + currPhoto.height,
                ...accHeights.heights.slice(minIdx + 1, accHeights.heights.length)
            ],
            groups: [
                ...accHeights.groups.slice(0, minIdx),
                [...accHeights.groups[minIdx], currPhoto],
                ...accHeights.groups.slice(minIdx + 1, accHeights.groups.length)
            ]
        }
    }, {
        heights: Array(colCount).fill(0),
        groups: Array(colCount).fill([])
    });

    return groups;
}

export default ({
    ...props
}) => {

    const ms = props.data;

    const allPhotos = ms.map(m => [...m.photos]).flat()

    const gs = groupByHeight(allPhotos, 5).groups;

    return (

        // main container
        <div className="flex flex-row w-full justify-center items-start p-4 ">
            {/* photo container */}
            <div className="flex flex-row w-full justify-center items-stretch max-w-5xl space-x-4">

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
                                        sizes={"10vw"}
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
