import { useState, useEffect, useRef } from "react";
import React from "react";
import Image from "next/image";


const StripesSticky = ({ rootRef, invitation, images, description, openLightbox }) => {

    const invitationRef = useRef(null);
    const [invitationBoundingRect, setInvitationBoundingRect] = useState(null);

    let invitationHeight = 0;
    let invitationWidth = 0;
    if (invitationBoundingRect) {
        invitationHeight = invitationBoundingRect.getBoundingClientRect().height;
        invitationWidth = invitationBoundingRect.getBoundingClientRect().width;
    }

    // desktop vs mobile -- DOES IT MAKE SENSE TO USE LISTENER
    const [imgColWidth, setImgColWidth] = useState(72);

    const getWidth = () => window.innerWidth;
    useEffect(() => {
        const updateColWidth = () => {
            if (getWidth() > 480) { // desktop
                setImgColWidth(72)
            } else if (getWidth() > 370) { // iphone678?
                setImgColWidth(48)
            } else {
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

    // makes sense to render only after window dimensions are available because of dynamic images
    if (windowWidth === 0 || windowHeight === 0) {
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
                            src={invitation.url}
                            width={invitation.width}
                            height={invitation.height}
                            layout="responsive"
                            sizes={invitationImgSizes}
                            onClick={() => openLightbox(invitation.id)}
                            onLoadingComplete={
                                () => setInvitationBoundingRect(invitationRef.current)
                            }
                            quality={50}
                            lazyBoundary={lazyBound}
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
                                        height: `${invitationHeight > 256 ? invitationHeight : 384}px`,
                                        width: `${imgColWidth}px`,
                                    }}
                                >
                                    <Image
                                        src={img.url}
                                        layout="fill"
                                        objectFit="cover"
                                        quality={50}
                                        lazyBoundary={lazyBound}
                                    />
                                </div>
                            )
                        })}
                    </div>
                ) : null}
            </div>
        </div>
    )
}

const Exhibition = React.forwardRef(function Exhibition({
    openLightbox,
    e,
    description,
    invitation,
    opening,
    ...props }, ref) {

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
