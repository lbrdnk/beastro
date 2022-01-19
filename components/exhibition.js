import { useState, useEffect, useRef } from "react";
import React from "react";
import { getBoxFittingDimensions, useWindowDimensions } from "../lib/utils"
import Image from "next/image";

// import { SRLWrapper, useLightbox } from "simple-react-lightbox";

import { groupByHeight } from "../lib/utils";

// mozno pre vacsie mnozstvo?
const Groups = ({ images, openLightbox, ...props }) => {

    const { groups: imgGroups } = groupByHeight(images, 2);

    // console.log(imgGroups)

    return (
        <div className="flex flex-grow flex-shrink space-x-4 justify-between">
            {imgGroups.map((colPhotoArr, idx) => {
                // console.log(colPhotoArr)
                return (
                    <div 
                        key={idx}
                        className="flex flex-col flex-grow justify-center space-y-4">
                        {colPhotoArr.map((photo, index) => (
                            <div
                                key={photo.id}
                                className="relative shadow-lg"
                                onClick={() => openLightbox(photo.id)}
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
                    // null
                )
            })}
        </div>
        // <div>x</div>
    )
}

// sexy svetla a este zopar
const Stripes = ({ images, openLightbox, ...props }) => {
    // console.log(images)
    return (
        // <div>images</div>
        <div className="flex flex-grow flex-shrink space-x-4 justify-between">
            {images.map(img => {

                return (
                    <div key={img.id} className="relative h-full flex-grow shadow-lg max-w-[128px]"
                        onClick={() => openLightbox(img.id)}
                    >
                        <Image
                            src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${img.url}`}
                            layout="fill"
                            objectFit="cover"
                        // width={invitationWidth}
                        // height={invitationHeight}

                        />
                    </div>
                )
            })}
        </div>
    )
}

const Conservative = ({ images, openLightbox }) => {
    return (
        // flex-row justify-start content-start
        <div className="flex-grow bg-yellow-200 h-20">
            x
            {/* {images.map(img => {
                return (
                    <img src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${img.url}`}
                        // width={img.width} height={img.height} 
                        // layout="responsive"
                        className="block cursor-pointer"
                        onClick={() => openLightbox(img.id)}
                    />
                )
            })} */}
        </div>
    )
}

const Horizontal = ({ invitation, images, description, openLightbox, rootRef }) => {

    const invitationRef = useRef(null);
    const [height, setHeight] = useState(null);

    // THIS IS PROBABLY BROKEN
    useEffect(() => {
        setHeight(invitationRef.current && invitationRef.current.clientHeight)
    }, [])

    // useEffect(() => console.log(height))

    return (
        <div
            ref={rootRef}
            className="flex flex-col w-full space-y-4 border-b-4 border-dashed pb-8 border-gray-50 last:border-none"
        >

            <div className="flex w-full flex-row overflow-x-scroll items-start space-x-4">

                {invitation ? (

                    <img
                        ref={invitationRef}
                        src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${invitation.url}`}
                        className="block w-1/3"
                        onClick={() => openLightbox(invitation.id)}
                    />

                ) : (
                    null
                )}

                {images && height ? (
                    images.map(img => {
                        return (
                            // <div className="relative block" style={{height: `${height}px`}}>
                            <img
                                key={img.id}
                                className="block object-contain"
                                src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${img.url}`}
                                style={{ height: `${height}px` }}
                                // width={img.width}
                                // height={img.height}
                                // layout="intrinsic"
                                onClick={() => openLightbox(img.id)}
                            />
                            // </div>
                        )
                    })
                ) : null}


            </div>

            <h1 className="text-6xl">{description}</h1>
        </div>
    )
}


const Floating = ({ rootRef, invitation, images, description, openLightbox }) => {

    return (
        <div
            ref={rootRef}
            className="flex flex-col w-full space-y-4 border-b-4 border-dashed pb-8 border-gray-50 last:border-none"
        >

            <div className="flex w-full flex-row items-stretch space-x-4">

                {invitation ? (

                    <div className={`relative${images.length === 0 ? " w-full" : " w-2/3"}`}>
                        <img
                            // ref={invitationRef}
                            src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${invitation.url}`}
                            className="block w-full sticky top-24"
                            onClick={() => openLightbox(invitation.id)}
                        />
                    </div>

                ) : (
                    null
                )}


                {images && images.length > 0 ? (
                    <div className="space-y-4 w-1/3 only:w-full">
                        {images.map(img => {
                            return (
                                // <div className="relative block" style={{height: `${height}px`}}>
                                <img
                                    key={img.id}
                                    className="block shadow-xl"
                                    src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${img.url}`}
                                    // style={{ height: `${height}px` }}
                                    onClick={() => openLightbox(img.id)}
                                />
                                // </div>
                            )
                        })}
                    </div>
                ) : null}


            </div>

            <h1 className="text-6xl">{description}</h1>
        </div>
    )
}

// WIP
const LandscapeFlyer = ({ rootRef, invitation, images, description, openLightbox }) => {

    return (
        <div
            ref={rootRef}
            className="flex flex-col w-full space-y-4 border-b-4 border-dashed pb-8 border-gray-50 last:border-none"
        >

            <div>
                {invitation ? (
                    <img src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${invitation.url}`} />
                ) : null}
            </div>
            <div className="flex flex-wrap ">
                {images ? (
                    images.map(({ id, url, width, height }) => {
                        return (
                            <img key={id} src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${url}`}
                                className="object-contain flex-grow last:h-auto h-[160px]"
                            />
                        )
                    })
                ) : null}
            </div>

            <h1 className="text-6xl">{description}</h1>
        </div>
    )
}

// DONE -- hotovo, neni to responzivne, neriesi to pripad ak je vela obrazkov, width 0 bude
const Stripes2 = ({ rootRef, invitation, images, description, openLightbox }) => {
    return (

        <div
            className="flex flex-col w-full space-y-4 border-b-4 border-dashed pb-8 border-gray-50 last:border-none"
        >

            <div className="flex w-full flex-row items-stretch space-x-4">

                {invitation ? (

                    <img
                        // ref={invitationRef}
                        src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${invitation.url}`}
                        className="block w-1/2"
                        onClick={() => openLightbox(invitation.id)}
                    />

                ) : (
                    null
                )}
                <div className="flex w-full h-auto flex-shrink flex-grow space-x-4 justify-between">
                    {images.map(img => {

                        return (
                            <div 
                                key={img.id}
                                className="relative h-auto flex-grow flex-shrink shadow-lg"
                                onClick={() => openLightbox(img.id)}
                            >
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${img.url}`}
                                    layout="fill"
                                    objectFit="cover"
                                // objectPosition="center bottom"
                                // width={img.width}
                                // height={img.height}

                                />
                            </div>
                        )
                    })}
                </div>
            </div>

            <h1 className="text-4xl text-gray-900">{description}</h1>
        </div>
    )
}

// DONE -- na telefone to vyzera pouzitelne, dalej desktop a landscape/stvorec
const StripesSticky = ({ rootRef, invitation, images, description, openLightbox }) => {

    const invitationRef = useRef(null);
    const [invitationBoundingRect, setInvitationBoundingRect] = useState(null);

    // na toto mi netreba effect?
    // useEffect(() => {
    //     if (invitationBoundingRect) {
    //         console.log(invitationBoundingRect.getBoundingClientRect());
    //     }
    // }, [invitationBoundingRect])

    let invitationHeight = 0;
    let invitationWidth = 0;
    if (invitationBoundingRect) {
        invitationHeight = invitationBoundingRect.getBoundingClientRect().height;
        invitationWidth = invitationBoundingRect.getBoundingClientRect().width;
    }

    // desktop vs mobile -- DOES IT MAKE SENSE TO USE LISTENER
    const [imgColWidth, setImgColWidth] = useState(72);
    // should be moved up -- rather make this comp effect free
    // useEffect(() => {
    //     if (window.innerWidth > 480) { // desktop
    //         setImgColWidth(72)
    //     } else if (window.innerWidth > 370) { // iphone678?
    //         setImgColWidth(48)
    //     } else {
    //         setImgColWidth(32)
    //     }
    // }, [])

    const getWidth = () => window.innerWidth;
    useEffect(() => {
        const updateColWidth = () => {
            if (getWidth() > 480) { // desktop
                setImgColWidth(72)
            } else if (getWidth() > 370) { // iphone678?
                setImgColWidth(48)
            } else {
                // setImgColWidth(32)
                setImgColWidth(48)
            }
        }
        updateColWidth()
        window.addEventListener("resize", updateColWidth)
        return () => window.removeEventListener("resize", updateColWidth)
    }, [])
    // zbytocne vela listenerov, staci vyssie jeden TODO toto porob normalne "efektivnve"

    // TODO refactor with upper effects -- lot of redundant code / rendering
    // TODO debouncing and throttling -- just to find out how it works, when should be considered
    const [windowWidth, setWindowWidth] = useState(0);
    useEffect(() => {
        const updateWindowWidth = () => {
            // console.log(`updating width to ${window.innerWidth}`)
            setWindowWidth(window.innerWidth)
        }
        updateWindowWidth()
        window.addEventListener("resize", updateWindowWidth)
        return () => window.removeEventListener("resize", updateWindowWidth)
    }, [])
    // invitation size -- just trying
    let invitationImgSizes = "49vw"; // 1vw margin estimation, probably wrong lets see, FOR less than 768
    if (windowWidth > 768) {
        invitationImgSizes = "384px";
    } else if (images.length === 0) {
        invitationImgSizes = "768px";
    }


    // Get window height to set "fences" lazy bound accordingly
    // TODO move into context / hook
    const [windowHeight, setWindowHeight] = useState(0);
    useEffect(() => {
        const updateWindowHeight = () => {
            // console.log(`updating width to ${window.innerHeight}`)
            setWindowHeight(window.innerHeight)
        }
        updateWindowHeight()
        window.addEventListener("resize", updateWindowHeight)
        return () => window.removeEventListener("resize", updateWindowHeight)
    }, [])
    const lazyBound = `${2 * windowHeight}px`

    // set fences height
    let fencesHeight = "60vh";
    if (windowWidth > 480) {
        fencesHeight = "75vh";
    }
    
    // following probably useless ? or maybe interfering with SSG
    if (windowHeight === 0) {
        return null;
    }

    // makes no sense to render (and do img fetching) while i do not know
    // window width, to fetch proper img size
    // ? avoid duplicate img fetching
    if (windowWidth === 0) {
        return null;
    }



    return (

        <div
            className="flex flex-col w-full space-y-4 border-b-4 border-dashed pb-8 border-gray-50 last:border-none"
        >
            <div className="flex w-full flex-row items-start gap-x-2">

                {invitation ? (

                    <div ref={invitationRef} className="flex-grow sticky top-[88px] w-1/2">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${invitation.url}`}
                            width={invitation.width}
                            height={invitation.height}
                            layout="responsive"
                            sizes={invitationImgSizes}
                            // objectFit="cover"
                            onClick={() => openLightbox(invitation.id)}
                            onLoadingComplete={() => setInvitationBoundingRect(invitationRef.current)}
                            quality={50}
                        />
                    </div>
                ) : (
                    null
                )}

                {images && images.length > 0 ? (
                    <div className="flex w-1/2 flex-grow flex-wrap gap-2 justify-end">
                        {images.map(img => {

                            return (
                                <div
                                    key={img.id}
                                    className="relative flex-grow shadow-xl"
                                    onClick={() => openLightbox(img.id)}
                                    style={{
                                        height: fencesHeight, //`${invitationHeight > 256 ? invitationHeight : 384}px`,
                                        width: `${imgColWidth}px`,
                                    }}
                                >
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${img.url}`}
                                        layout="fill"
                                        objectFit="cover"
                                        quality={50}
                                        lazyBoundary={lazyBound}
                                    // objectPosition="50% 50px"
                                    // width={img.width}
                                    // height={img.height}
                                    />
                                </div>
                                // null
                            )
                        })}
                    </div>
                ) : null}
            </div>

            {/* <h1 className="text-4xl text-gray-900">{description}</h1> */}
        </div>
    )
}



// const ExhibitionOLD = React.forwardRef(({
//     openLightbox,
//     e,
//     description,
//     invitation,
//     opening: {
//         photos: openingPhotos,
//         dateTime: openingDateTime
//     },
//     ...props }, ref) => {

//     const { width: innerWidth, height: innerHeight } = useWindowDimensions()

//     const headerSize = 80;

//     let imageUsedWidth, imageUsedHeight;
//     if (e.invitation) {
//         const { width: imageOrigWidth, height: imageOrigHeight } = e.invitation;
//         ({
//             width: imageUsedWidth,
//             height: imageUsedHeight
//         } = getBoxFittingDimensions(Math.min(innerWidth, 768), innerHeight - headerSize, imageOrigWidth, imageOrigHeight));
//     }
//     if (false) {
//         return (
//             // container
//             // ref for scroll into view
//             <div ref={ref}
//                 className="flex flex-col justify-center items-center bg-green-200">

//                 {/* photos container*/}
//                 <div
//                     // p-4 removed
//                     className={
//                         "flex flex-col w-full justify-center items-center space-y-4"
//                         + (e.invitation ? " before:h-[calc(100vh-80px)] before:mt-20" : "")
//                     }
//                 >
//                     {/* toto sa neupdatne pri zmene velkosti okna? */}
//                     {e.opening_record.map(({ width, height, url }) => {
//                         // console.log("update")
//                         const availWidth = Math.min(innerWidth, 768);
//                         const availHeight = innerHeight - headerSize;
//                         const {
//                             width: imageUsedWidth,
//                             height: imageUsedHeight
//                         } = getBoxFittingDimensions(availWidth, availHeight, width, height);

//                         return (

//                             // photo frame -- margin -- 
//                             <div key={url} className="w-full z-20 p-4 md:p-8"
//                                 style={{
//                                     width: imageUsedWidth + "px",
//                                     height: imageUsedHeight + "px",
//                                 }}>

//                                 <div key={url} className="relative z-20 shadow-2xl p-2 bg-white"

//                                 >
//                                     <Image
//                                         src={process.env.NEXT_PUBLIC_CMS_BASE_URL + url}
//                                         width={parseInt(width)}
//                                         height={parseInt(height)}
//                                         layout="responsive"
//                                         sources={"100vw"}
//                                         lazyBoundary="900px"
//                                     // priority
//                                     />
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//                 {/* photos end */}

//                 {e.invitation && (
//                     <div className={`sticky w-full flex justify-center items-center`}
//                         style={{
//                             bottom: `calc(calc(100vh - 80px) / 2 - ${imageUsedHeight / 2}px)`,
//                             width: imageUsedWidth + "px",
//                             height: imageUsedHeight + "px"
//                         }}
//                     >
//                         <div
//                             className="sticky bottom-0 w-full h-full"
//                             style={{
//                                 // bottom: "0px"
//                             }}
//                         >
//                             <Image
//                                 src={process.env.NEXT_PUBLIC_CMS_BASE_URL + e.invitation.url}
//                                 width={parseInt(e.invitation.width)}
//                                 height={parseInt(e.invitation.height)}
//                                 layout="responsive"
//                                 sources={"60vw"}
//                                 lazyBoundary="900px"
//                             // priority
//                             />
//                         </div>
//                     </div>
//                 )}
//             </div>
//         )
//     }

//     // divide images


//     // invite only
//     // no invite
//     // if (description === "0037") {
//     //     console.log(e.invitation);
//     //     console.log(invitationId);
//     //     console.log(invitationUrl);
//     // }

//     // invitation, images -> layout 

//     const isInvitationLandscapeOrNone = !invitation || (invitation.height / invitation.width < 0.8);

//     const contentContainerClasses = "flex w-full " + (isInvitationLandscapeOrNone ? "flex-row space-x-4" : "flex-row space-x-4");

//     const invitationContainerClasses = "relative w-full sticky top-24"

//     const openingContainerClasses = "flex flex-row flex-wrap "; // + (isInvitationLandscapeOrNone ? "w-full" : "w-1/4");

//     // props -- description, invitation, opening/photos, date
//     return (
//         <div ref={ref} className="flex flex-col w-full space-y-4 border-b-4 border-dashed border-gray-50 last:border-none pb-8">

//             <div className={contentContainerClasses}>

//                 {invitation ? (
//                     <div className="relative w-1/2 flex-grow">
//                         <div className={invitationContainerClasses}
//                             onClick={() => openLightbox(invitation.id)}
//                         >
//                             <Image
//                                 src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${invitation.url}`}
//                                 layout="responsive"
//                                 width={invitation.width}
//                                 height={invitation.height}

//                             />
//                         </div>
//                     </div>
//                 ) : (
//                     null
//                 )}
//                 <div className={openingContainerClasses}>
//                     {/* TODO gallery component */}

//                     {/* {openingPhotos && <Stripes images={openingPhotos} openLightbox={openLightbox} />} */}

//                     {openingPhotos && (
//                         /*true ? (
//                             <Stripes images={openingPhotos} openLightbox={openLightbox} />
//                         ) : (
//                             <Groups images={openingPhotos} openLightbox={openLightbox} />
//                         )*/
//                         <Conservative images={openingPhotos} openLightbox={openLightbox} />
//                     )}


//                     {/* 
//                     {openingPhotos && openingPhotos.map(({ id, url, width, height }) => {

//                         return (
//                             // tmp w/h
//                             <div key={id} className="relative w-1/4 flex-grow"
//                                 onClick={() => openLightbox(id)}
//                             >
//                                 <Image
//                                     src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${url}`}
//                                     layout="responsive"
//                                     width={width}
//                                     height={height}
//                                     sources={"60vw"}
//                                     objectFit="cover"
//                                     quality={75}
//                                 />
//                             </div>
//                         );
//                     })} */}
//                 </div>
//             </div>
//             <h1 className="text-6xl">{description}</h1>
//         </div>
//     )

// })

const Exhibition = React.forwardRef( function Exhibition({
    openLightbox,
    e,
    description,
    invitation,
    opening,
    ...props }, ref) {

    // props -- description, invitation, opening/photos, date
    return (
        <StripesSticky
            rootRef={ref}
            invitation={invitation}
            images={opening.photos}
            description={description}
            openLightbox={openLightbox}
        />
    )

})
Exhibition.displayName = "Exhibition"

export default Exhibition

{/* <h1 className="text-6xl" style={{
                // fontFamily: "'Kosugi', sans-serif",
                // fontSize: "1rem",
                // letterSpacing: "2px",
                // fontWeight: "bold",
                // height: "32px",
                // verticalAlign: "baseline"
                // lineHeight: "32px"
            }}>Exhibitions</h1> */}