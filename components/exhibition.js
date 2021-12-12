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

    // console.log(e.invitation)

    // ! TODO natvrdo vypocitat exhibition width / height
    // TODO ref or state
    let usableBox = useRef([0, 0]);
    useEffect(() => {
            
        usableBox.current = [window.innerWidth, window.innerHeight];
        
            // return usableBox
            // console.log(window.innerWidth)
            // console.log(window.innerHeight)
    })

    // height max = usableBox[1] - <height of visible header part>
    // width  max = md-screen || full screen

    // TODO refactor
    const headerSize = 80;
    const maxInvBoxHeight = usableBox.current[1] - headerSize;
    const maxInvBoxWidth = usableBox.current[0];
    console.log([maxInvBoxHeight, maxInvBoxWidth])


    // fill it with pic -- responsive?


    return (
        <div className="flex flex-col justify-center items-center">

            {/* photos */}
            <div
                className={
                    "flex flex-col w-full justify-center space-y-4 p-4"
                    + (e.invitation ? " before:h-[calc(100vh-80px)] before:mt-20" : "")
                }
            >

                {e.photos.map(({ width, height, url }) => {
                    return (

                        // photo frame -- shadow
                        //                        <div key={url} className="z-20 bg-white w-full p-2 shadow-2xl">

                        <div key={url} className="w-full z-20 relative shadow-2xl p-2 bg-white">
                            <Image
                                src={baseUrl + url}
                                width={parseInt(width)}
                                height={parseInt(height)}
                                layout="responsive"
                                sources={"100vw"}
                            />
                        </div>
                    );
                })}
            </div>
            {/* photos end */}

            {e.invitation && (
                <div className="sticky w-full flex justify-center items-center"
                    style={{
                        // TODO pridat clamp aby to bolo od hora max kusok
                        bottom: `calc(calc(100vh - 80px) / 2 - ${dimensions[1] / 2}px)`,

                        height: maxInvBoxHeight + "px",
                        width: maxInvBoxHeight + "px"
                    }}
                >
                    <div
                        ref={ref}
                        className="sticky bottom-0 w-full"
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
            <div>{e.description}</div>

        </div>
    )
}