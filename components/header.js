import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

import Styling from "./styling"

import beastroType from '../public/beastro/beastro_logo_land.jpg';

const menuItems = [
    {
        path: "/exhibitions",
        title: "Exhibitions"
    },
    {
        path: "/moments",
        title: "Moments"
    }
];

export default function Header({ isMenuOpened, setIsMenuOpened, ...props }) {

    // DONE add ref for menu
    // DONE only collapse menu when clicked 1. either on menu link 2. or outside of menu, but avoid opening lightbox

    const headerBoxRef = useRef(null);
    const transparentOverlayRef = useRef(null);

    const clickHandler = useCallback(e => {
        // console.log("handler pressed")
        // console.log(e.target)
        // console.log(headerBoxRef.current)
        // console.log(e.target === headerBoxRef.current)
        if (e.target !== headerBoxRef.current
            || e.target === transparentOverlayRef.current) {
            setIsMenuOpened(!isMenuOpened)
        }
        // Following is just theory
        //
        // It is essential to stop propagation here. If it was not the case, the effect adding listener could
        // complete prior to event bubbling to window, hence clickHandler would be called again, resulting
        // in immediate toggle isMenuOpened back to previous value.
        e.stopPropagation()
        // e.stopImmediatePropagation()
    }, [isMenuOpened, setIsMenuOpened])

    useEffect(() => {
        // console.log("is menu" + isMenuOpened)
        // console.log("handler" + clickHandler)
        // console.log("isMenu changed")
        if (isMenuOpened) {
            // setTimeout(() => window.addEventListener("click", clickHandler), 200)
            window.addEventListener("click", clickHandler)
        }
        return () => {
            // setTimeout(() => window.removeEventListener("click", clickHandler), 200)
            window.removeEventListener("click", clickHandler)
        }
    }, [isMenuOpened, clickHandler])

    const [innerWidth, setInnerWidth] = useState(undefined)

    // TODO looks hairy, verify
    const getWidth = () => window.innerWidth;
    useEffect(() => {
        const updateWidth = () => setInnerWidth(getWidth())
        setInnerWidth(getWidth())
        window.addEventListener("resize", updateWidth)
        return () => window.removeEventListener("resize", updateWidth)
    }, [])

    const desktop = (

        // container -- has screen width, color etc.
        <div className="sticky top-0 z-20 w-full flex justify-center bg-gray-50 shadow-lg h-20">

            {/* content container -- space between logo with nav, max content width */}
            <div className="relative flex space-x-2 justify-between items-end max-w-3xl w-full pl-2 pr-2">

                {/* logo */}
                <Link href="/" className="">

                    <Styling.Img
                        src={beastroType}
                        width={
                            Styling.computeScaledDimension({
                                width: beastroType.width,
                                height: beastroType.height
                            }, {
                                height: 64
                            }).width
                        }
                        height={64}
                        className="shadow-lg mb-2"
                        priority
                    />

                </Link>

                {/* navigation container */}
                <div className="flex space-x-2 mb-2 h-8">
                    {menuItems.map(({ title, path }, index) => {
                        return (
                            (<Link
                                key={title}
                                href={path}
                                className="cursor-pointer text-nav bg-white shadow-lg pl-0.5 border-transparent h-8"
                            >
                                {title}
                            </Link>)
                        );
                    })}
                </div>

            </div>
        </div>
    )

    const mobile = (

        <>
            {/* placeholder in document flow for header, hence header is fixed position */}
            <div className="w-full h-20"></div>
            {/* Absolute transparent whole doc box to handle clicks when menu is opened.
                z-index must be <= 20 and > auto
              */}
            {isMenuOpened && <div className="fixed top-0 z-10 w-screen h-screen" ref={transparentOverlayRef} />}
            {/* actual content */}
            <div className={
                "transition-all z-20 w-full flex justify-center bg-gray-50 shadow-lg" +
                (isMenuOpened ? " fixed -top-16 h-60" : " fixed -top-40 h-60")
            }>

                {/* content container -- space between logo with nav, max content width */}
                <div
                    className="relative flex space-x-2 justify-between items-end max-w-3xl w-full pl-2 pr-2"
                    ref={headerBoxRef}
                >

                    <div className="flex flex-col justify-end items-start space-y-2">

                        {/* navigation container */}

                        {true && <div className="flex flex-col justify-end items-start flex-grow space-y-2">
                            {menuItems.map(({ title, path }, index) => {
                                return (
                                    (<Link
                                        key={title}
                                        href={path}
                                        className={"text-nav bg-white shadow-lg pl-0.5 border-transparent h-8"}>

                                        {title}

                                    </Link>)
                                );
                            })}
                        </div>}

                        {/* logo */}
                        <div className="h-20 flex items-end">
                            <Link href="/" legacyBehavior>
                                <Styling.Img
                                    src={beastroType}
                                    width={
                                        Styling.computeScaledDimension({
                                            width: beastroType.width,
                                            height: beastroType.height
                                        }, {
                                            height: 64
                                        }).width
                                    }
                                    height={64}
                                    className="shadow-lg mb-2"
                                    priority
                                />
                            </Link>
                        </div>
                    </div>

                    {/* hamburger */}
                    <div className="h-16 w-16 shadow-lg mb-2 bg-white"
                        onClick={clickHandler}
                    >
                        <span
                            className="w-full h-full align-middle flex items-center justify-center text-center text-3xl text-gray-500"
                        >
                            =
                        </span>
                    </div>

                </div>
            </div>
        </>
    )

    if (innerWidth === undefined)
        return <div className="w-full h-20"></div>

    return innerWidth < 480 ? mobile : desktop;
}
