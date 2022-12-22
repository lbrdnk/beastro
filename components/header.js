import React, { useEffect, useState } from "react";
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
            {/* actual content */}
            <div className={
                "transition-all z-20 w-full flex justify-center bg-gray-50 shadow-lg" +
                (isMenuOpened ? " fixed -top-16 h-60" : " fixed -top-40 h-60")
            }>

                {/* content container -- space between logo with nav, max content width */}
                <div className="relative flex space-x-2 justify-between items-end max-w-3xl w-full pl-2 pr-2">

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
                    <div className="h-16 w-16 shadow-lg mb-2 bg-white" onClick={() => setIsMenuOpened(!isMenuOpened)}>
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
