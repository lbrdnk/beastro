import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const baseUrl = "http://localhost:1337"

// potrebujem toto -- nestaci mi next/image fill mode? asi ne
function getBoxFittingDimensions(availWidth, availHeight, imageWidth, imageHeight) {

    const coef = Math.max(imageWidth / availWidth, imageHeight / availHeight);
    // sem clamp min
    const width = parseInt(Math.ceil(imageWidth / coef));
    const height = parseInt(Math.ceil(imageHeight / coef));

    // console.log(availWidth, availHeight, imageWidth, imageHeight, width, height)

    return { width, height }
}

function useWindowDimensions() {

    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateWindowDimensions = () => {
            const { innerWidth: width, innerHeight: height } = window;
            setDimensions({ width, height })
        };
        updateWindowDimensions()
        window.addEventListener("resize", updateWindowDimensions)
        return () => window.addEventListener("resize", updateWindowDimensions)
    }, [])

    console.log("dim", dimensions)

    return dimensions;
}

// 1. check proportions of invitation
export default function Exhibition({ e }) {

    const { width: innerWidth, height: innerHeight } = useWindowDimensions()

    const headerSize = 80;

    let imageUsedWidth, imageUsedHeight;
    if (e.invitation) {
        const { width: imageOrigWidth, height: imageOrigHeight } = e.invitation;
        ({
            width: imageUsedWidth,
            height: imageUsedHeight
        } = getBoxFittingDimensions(innerWidth, innerHeight - headerSize, imageOrigWidth, imageOrigHeight));
    }

    // console.log(image)

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
                {e.photos.map(({ width, height, url }) => {
                    console.log("update")
                    const availWidth = innerWidth;
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
                                    src={baseUrl + url}
                                    width={parseInt(width)}
                                    height={parseInt(height)}
                                    layout="responsive"
                                    sources={"100vw"}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* photos end */}

            {e.invitation && (
                <div className={`X${imageUsedWidth} Y${imageUsedHeight} sticky w-full flex justify-center items-center`}
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
                            src={baseUrl + e.invitation.url}
                            width={parseInt(e.invitation.width)}
                            height={parseInt(e.invitation.height)}
                            layout="responsive"
                            sources={"60vw"}
                        />
                    </div>
                </div>
            )}
            {/* popisok */}
            {/* <div>{e.description}</div> */}

        </div>
    )
}