import { useState, useEffect, useRef } from "react";
import { getBoxFittingDimensions, useWindowDimensions } from "../lib/utils"
import Image from "next/image";

export default function Exhibition({ e }) {

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

    return (
        // container
        <div className="flex flex-col justify-center items-center">

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
                                    priority
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
                            priority
                        />
                    </div>
                </div>
            )}
        </div>
    )
}