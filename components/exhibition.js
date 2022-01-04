import { useState, useEffect, useRef } from "react";
import React from "react";
import { getBoxFittingDimensions, useWindowDimensions } from "../lib/utils"
import Image from "next/image";

import { SRLWrapper, useLightbox } from "simple-react-lightbox";


const Exhibition = React.forwardRef(({
    openLightbox,
    e,
    description,
    invitation: { url: invitationUrl, width: invitationWidth, height: invitationHeight, id: invitationId },
    opening: {
        photos: openingPhotos,
        dateTime: openingDateTime
    },
    ...props }, ref) => {

    const { width: innerWidth, height: innerHeight } = useWindowDimensions()

    const headerSize = 80;

    let imageUsedWidth, imageUsedHeight;
    if (e.invitation) {
        const { width: imageOrigWidth, height: imageOrigHeight } = e.invitation;
        ({
            width: imageUsedWidth,
            height: imageUsedHeight
        } = getBoxFittingDimensions(Math.min(innerWidth, 768), innerHeight - headerSize, imageOrigWidth, imageOrigHeight));
    }
    if (false) {
        return (
            // container
            // ref for scroll into view
            <div ref={ref}
                className="flex flex-col justify-center items-center bg-green-200">

                {/* photos container*/}
                <div
                    // p-4 removed
                    className={
                        "flex flex-col w-full justify-center items-center space-y-4"
                        + (e.invitation ? " before:h-[calc(100vh-80px)] before:mt-20" : "")
                    }
                >
                    {/* toto sa neupdatne pri zmene velkosti okna? */}
                    {e.opening_record.map(({ width, height, url }) => {
                        // console.log("update")
                        const availWidth = Math.min(innerWidth, 768);
                        const availHeight = innerHeight - headerSize;
                        const {
                            width: imageUsedWidth,
                            height: imageUsedHeight
                        } = getBoxFittingDimensions(availWidth, availHeight, width, height);

                        return (

                            // photo frame -- margin -- 
                            <div key={url} className="w-full z-20 p-4 md:p-8"
                                style={{
                                    width: imageUsedWidth + "px",
                                    height: imageUsedHeight + "px",
                                }}>

                                <div key={url} className="relative z-20 shadow-2xl p-2 bg-white"

                                >
                                    <Image
                                        src={process.env.NEXT_PUBLIC_CMS_BASE_URL + url}
                                        width={parseInt(width)}
                                        height={parseInt(height)}
                                        layout="responsive"
                                        sources={"100vw"}
                                        lazyBoundary="900px"
                                    // priority
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
                {/* photos end */}

                {e.invitation && (
                    <div className={`sticky w-full flex justify-center items-center`}
                        style={{
                            bottom: `calc(calc(100vh - 80px) / 2 - ${imageUsedHeight / 2}px)`,
                            width: imageUsedWidth + "px",
                            height: imageUsedHeight + "px"
                        }}
                    >
                        <div
                            className="sticky bottom-0 w-full h-full"
                            style={{
                                // bottom: "0px"
                            }}
                        >
                            <Image
                                src={process.env.NEXT_PUBLIC_CMS_BASE_URL + e.invitation.url}
                                width={parseInt(e.invitation.width)}
                                height={parseInt(e.invitation.height)}
                                layout="responsive"
                                sources={"60vw"}
                                lazyBoundary="900px"
                            // priority
                            />
                        </div>
                    </div>
                )}
            </div>
        )
    }

    // props -- description, invitation, opening/photos, date

    // const openLightbox = () => setLightboxOp

    return (
        <div ref={ref} className="flex flex-col w-full space-y-4 border-b-4 border-dashed border-gray-50 last:border-none pb-8">
            <div className="flex flex-row w-full space-x-4">
                <div className="relative w-[384px]"
                    onClick={() => openLightbox(invitationId)}
                >
                    <Image
                        src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${invitationUrl}`}
                        layout="responsive"
                        width={invitationWidth}
                        height={invitationHeight}

                    />
                </div>
                <div className="flex-grow flex flex-col">
                    {/* TODO gallery component */}
                    {openingPhotos && openingPhotos.map(({ id, url, width, height }) => {

                        return (
                            // tmp w/h
                            <div key={id} className="relative flex-grow flex-shrink"
                                onClick={() => openLightbox(id)}
                            >
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${url}`}
                                    layout="fill"
                                    // width={width}
                                    // height={height}
                                    sources={"60vw"}
                                    objectFit="cover"
                                    quality={75}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <h1 className="text-6xl">{description}</h1>
            {/*  */}
            {/* <h1 className="text-6xl" style={{
                // fontFamily: "'Kosugi', sans-serif",
                // fontSize: "1rem",
                // letterSpacing: "2px",
                // fontWeight: "bold",
                // height: "32px",
                // verticalAlign: "baseline"
                // lineHeight: "32px"
            }}>Exhibitions</h1> */}
        </div>
    )

})

export default Exhibition