import { useState, useEffect } from "react";
import Image from "next/image";

const baseUrl = `${process.env.CMS_BASE_URL}/moments`

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

    // console.log("dim", dimensions)

    return dimensions;
}

export async function getStaticProps(context) {

    const res = await fetch(baseUrl);
    const data = await res.json()

    if (!data) {
        return {
            notFound: true,
        }
    }

    // data.reverse();

    return {
        props: { data }, // will be passed to the page component as props
    }
}

export default function Moments({ data }) {

    const headerHeight = 80;

    const moments = [...data]

    const { width: innerWidth, height: innerHeight } = useWindowDimensions();

    const availWidth = Math.min(innerWidth, 768);
    const availHeight = innerHeight - headerHeight;




    return (

        // main container
        <div className="mt-20 flex flex-row w-full justify-center items-center">

            {/* photo container */}
            <div className="flex flex-row flex-wrap w-full max-w-3xl justify-center items-center">

                {data.map(({ photos }) => {
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
                                        src={"http://localhost:1337" + photo.url}
                                        width={photo.width}
                                        height={photo.height}
                                        layout="responsive"
                                        sizes={"100vw"}
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
