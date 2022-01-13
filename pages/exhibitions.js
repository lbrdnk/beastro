import Image from "next/image";
import { createRef, useEffect, useState } from "react";

import Exhibition from "../components/exhibition"
import { getApiAccessToken } from "../lib/utils";

import { useSWR } from "swr";

import Lightbox from "../components/lightbox";



export async function getStaticProps(context) {

    const token = await getApiAccessToken();

    const response = await fetch(
        process.env.NEXT_PUBLIC_CMS_BASE_URL
        + "/exhibitions?"
        + new URLSearchParams({ _limit: 100 }), {
        headers: new Headers({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        })
    });

    if (response.status !== 200) {
        throw (new Error(`Authentication returned ${response.status}`))
    }

    const data = await response.json()

    // TODO remove?
    data.reverse();

    // dorobit props
    const d2 = data.map(({ id = null, description = null, invitation = {}, opening_record = [], opening = null }) => ({
        id,
        description,
        invitation,
        opening: {
            photos: opening_record.map(({ id, url, width, height }) => ({ id, url, width, height })),
            dateTime: opening, // from arguments
        }
    }));

    // const noInvIdx = d2.findIndex(({ description }) => description === "0037");
    // if (noInvIdx === -1) {
    //     throw new Error("Unable to find 0037 exhibition")
    // }

    return {
        props: { data: d2 },
    }
}

export default function Exhibitions({ data }) {

    // when adding new exhibition, update refs array
    const [exRefs, setExRefs] = useState(Array(data.length).fill().map(() => createRef()))

    // lightbox
    const [isLightBoxOpened, setIsLightBoxOpened] = useState(false);
    const closeLightbox = () => setIsLightBoxOpened(false);
    const [lightboxImages, setLightboxImages] = useState([]);
    const [selectedLightboxImageId, setSelectedLightboxImageId] = useState(null);


    return (
        <>
            {isLightBoxOpened && <Lightbox initialSelectedId={selectedLightboxImageId} images={lightboxImages} closeFn={closeLightbox} />}

            <div className="flex justify-center">

                <div className="flex-grow max-w-3xl space-y-20 m-2 mt-4">
                    {data.map((e, i) => (
                        <Exhibition key={e.id} e={e} ref={exRefs[i]}
                            description={e.description}
                            invitation={e.invitation}
                            opening={e.opening}
                            openLightbox={(selectedImgId) => {
                                setLightboxImages(
                                    e.invitation ? (
                                        [e.invitation, ...e.opening.photos]
                                    ) : (
                                        [...e.opening.photos]
                                    ))
                                setSelectedLightboxImageId(selectedImgId);
                                setIsLightBoxOpened(true);
                            }}
                        />)
                    )}
                </div>
            </div>
        </>
    );
}


//     {/* <div onClick={openLightbox}>open lightbox</div> */}
//     {/* {newPageData.length} */}

//     {/* navigacia */}
//     {/* 
// <div className="sticky left-0 top-20 w-64 p-4 h-[calc(100vh-80px)]">
//     <div className="bg-gray-50 shadow-lg w-full h-full overflow-scroll">
//         <ul className="">
//             {data.map((exhibition, index) => {
//                 return (
//                     <li
//                         key={exhibition.id}
//                         onClick={e => {
//                             // console.log(exRefs[index].current)
//                             console.log(exRefs)
//                             exRefs[index].current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
//                         }}
//                     >
//                         <span className="">{exhibition.description}</span>
//                     </li>
//                 )
//             })}
//         </ul>
//     </div>
// </div> */}