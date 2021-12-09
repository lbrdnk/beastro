import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const baseUrl = "http://localhost:1337"

// 1. check proportions of invitation
export default function Exhibition({ e }) {

    const ref = useRef(null);
    const [dimensions, setDimensions] = useState([]);

    // TODO check if must be here, if im not able to use ref val directly
    useEffect(() => {
        if (ref && ref.current) {
            // console.log(ref)
            setDimensions([ref.current.offsetWidth, ref.current.offsetHeight])
        }
    }, [ref])

    return (
        <div className="flex flex-col justify-center items-center">
            
            {/* photos */}
            <div className="before:h-[calc(100vh-80px)] before:mt-20 flex flex-col w-full justify-center space-y-4 p-4">

                {e.photos.map(({ width, height, url }) => {
                    return (

                        // photo frame
                        <div key={url} className="z-20 bg-white flex justify-center items-center w-full p-4 shadow-lg">

                            {/* photo */}
                            <div key={url} className="w-full relative bg-white">
                                <Image
                                    src={baseUrl + url}
                                    width={parseInt(width)}
                                    height={parseInt(height)}
                                    layout="responsive"
                                    sources={"60vw"}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* photos end */}

            <div className="sticky bg-green-200 w-full flex justify-center items-center"
                style={{
                    // TODO pridat clamp aby to bolo od hora max kusok
                    bottom: `calc(calc(100vh - 80px) / 2 - ${dimensions[1] / 2}px)`
                }}
            >
                <div
                    ref={ref}
                    className="sticky bottom-0 w-full bg-red-200"
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
            
            {/* popisok */}
            <div>{e.description}</div>
        </div>
    )
}