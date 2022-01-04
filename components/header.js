import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Styling from "./styling"

import beastroType from '../public/beastro_type.jpg';
import beastroSquare from '../public/beastro_square.jpg';

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

// args should be height, upper height
export default function Header(props) {

    // const mode = props.layoutMode
    // console.log(mode)
    const layout = props.layout
    console.log(layout)


    // MOBILE DATA START
    const menuRef = useRef(null);
    const [menuOpened, setMenuOpened] = useState(false);

    // fix height for square logo
    const sqaureHeight = 64;
    const squareWidth = parseInt(sqaureHeight * beastroSquare.width / beastroSquare.height);

    // fix height for rect logo
    const btHeight = 64;
    const btWidth = parseInt(btHeight * beastroType.width / beastroType.height);

    // out click when menu opened handling
    useEffect(() => {
        const clickHandler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setMenuOpened(!menuOpened)
            }
        }
        if (menuOpened) {
            document.addEventListener("click", clickHandler);
            return () => { document.removeEventListener("click", clickHandler) };
        }
    }, [menuOpened])
    // MOBILE DATA END

    if (layout === "mobile") {

        return (
            <div
                ref={menuRef}
                className={
                    "fixed z-20 w-full h-60 transition-all duration-700 shadow-lg backdrop-blur-md"
                    + " "
                    + (menuOpened ? "top-0 bg-black/10" : "-top-40 bg-white/30")
                }
            >
                {/* header start */}

                {/* header upper start */}
                <div className="flex flex-row justify-start h-40">

                    {/* NAV div */}
                    <div className=" flex flex-col justify-between p-1 items-end h-full"
                        style={{
                            minWidth: "calc(50% - 40px)"
                        }}
                    >

                        <Link href="/">
                            {/* beastroType img link */}
                            <div className="shadow-lg m-1 cursor-pointer"
                                style={{
                                    width: parseInt(btWidth) + "px",
                                    height: parseInt(btHeight) + "px",
                                }}
                                onClick={() => {
                                    setMenuOpened(!menuOpened);
                                }}
                            >
                                <div className="relative w-full h-full"

                                >
                                    <Image
                                        src={beastroType}
                                        layout="fill"
                                        objectFit="cover"
                                        priority
                                    />
                                </div>
                            </div>
                        </Link>
                        {/* beastroType img link end */}
                        {/* other nav links */}
                        {
                            menuItems.map(({ path, title }) => {
                                return (
                                    // link functions created with 
                                    <Link key={title} href={path}>
                                        <a className={"bg-white m-1 shadow-lg pl-0.5"}
                                            onClick={() => {
                                                setMenuOpened(!menuOpened)
                                            }}
                                            style={{
                                                // fontFamily: "'Kosugi', sans-serif",
                                                fontSize: "1rem",
                                                letterSpacing: "2px",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {title}
                                        </a>
                                    </Link>
                                );
                            })
                        }
                        {/* other nav links end */}
                    </div>
                    {/* ABOUT div */}
                    <div className="p-1 m-1 flex-grow flex justify-center items-stretch max-w-xs">
                        <div
                            className="w-full flex flex-col justify-center items-center bg-white shadow-lg"
                        >
                            {
                                ["Gallery.", "Mikulášska 27,", "Bratislava."].map((line) => {
                                    return (
                                        <p key={line}
                                            className="pl-2 text-center"
                                            style={{
                                                fontFamily: "'Kosugi', sans-serif",
                                                fontSize: "1rem",
                                                letterSpacing: "2px",
                                            }}
                                        >
                                            {line}
                                        </p>

                                    );
                                })
                            }

                        </div>
                    </div>
                    {/* ABOUT div end */}
                </div>
                {/* header upper end */}

                {/* header visible start */}
                <div className="relative flex justify-center items-center h-20">
                    <div className="rounded-full shadow-lg"
                        style={{
                            width: "64px",
                            height: "64px",
                            overflow: "hidden",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <div className="cursor-pointer relative shadow-lg"
                            onClick={() => setMenuOpened(!menuOpened)}
                            style={{ width: squareWidth, height: sqaureHeight }}
                        >
                            <Image
                                src={beastroSquare}
                                layout="fill"
                                objectFit="contain"
                                quality={100}
                            />
                        </div>
                    </div>
                </div>
                {/* header visible end */}

            </div>
        )

    }

    // hcont, padding containers
    return (

        // <div className="sticky top-0 z-40 w-full flex justify-center bg-transparent fitler backdrop-blur-lg shadow-lg">
        <div className="sticky top-0 z-20 w-full flex justify-center bg-gray-50 shadow-lg h-20">
            <div className="relative flex justify-start items-end max-w-3xl w-full"
                // style={{
                //     height: Styling.headerHeightPx,
                //     width: "768px"
                // }}
            >

                <div className="flex w-1/2 justify-between ">
                    <Link href="/">
                        <a className="">
                            <Styling.Img
                                src={beastroType}
                                width={Styling.computeScaledDimension({
                                    width: beastroType.width,
                                    height: beastroType.height
                                }, {
                                    height: 64
                                }).width}
                                height={64}
                                className="shadow-lg mb-2 border-b-4 border-purple-400"
                            />
                        </a>
                    </Link>
                    <div className="relative hidden">
                        <div className="relative left-1/2">
                            <Link href="/">
                                <a>
                                    <Styling.Img
                                        src={beastroSquare}
                                        width={Styling.computeScaledDimension({
                                            width: beastroSquare.width,
                                            height: beastroSquare.height
                                        }, {
                                            height: 64
                                        }).width}
                                        height={64}
                                        className="shadow-lg mb-2"
                                    />
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="w-1/2 flex justify-end space-x-2 ">
                    {menuItems.map(({ title, path }, index) => {
                        return (
                            <Link key={title} href={path}>
                                <a className={"bg-white shadow-lg pl-0.5 mb-2 border-b-4 border-transparent hover:border-purple-400"}
                                    style={{
                                        // fontFamily: "'Kosugi', sans-serif",
                                        fontSize: "1rem",
                                        letterSpacing: "2px",
                                        fontWeight: "bold",
                                        height: "32px",
                                        // verticalAlign: "baseline"
                                        lineHeight: "32px"
                                    }}
                                >
                                    {title}
                                </a>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}