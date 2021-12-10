import { Transition } from '@headlessui/react'

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
// import Header from './header'

import beastroType from '../public_tmp/img/beastro_type.jpg';
import beastroSquare from '../public_tmp/img/beastro_square.jpg';

const menuItems = [
    {
        path: "/exhibitions",
        title: "Exhibitions"
    },
    {
        path: "/magic",
        title: "Magic"
    }
];

// export default function Test({ children }) {
//     return (
//         <div className="h-[1000px]">
//             <div>
//                 ahoj
//             </div>
//         </div>
//     )
// }

export default function Layout({ children }) {

    const menuRef = useRef(null);

    const [menuOpened, setMenuOpened] = useState(false);

    // const [selectedItem, setSelectedItem] = useState("/");

    const headerBase = "fixed z-40 w-full h-60 transition-all duration-700 "
    const closedClasses = "-top-40"
    const openedClasses = "top-0"

    const [activePath, setActivePath] = useState("/");

    // fix height for square
    const sqaureHeight = 64;
    const squareWidth = parseInt(sqaureHeight * beastroSquare.width / beastroSquare.height);

    // fix height for significant other
    const btHeight = 64;
    const btWidth = parseInt(btHeight * beastroType.width / beastroType.height);

    // useEffect(() => {
    //     console.log(menuRef)
    //     const handleOutMenuClick = (e) => {
    //         console.log(e)
    //         console.log(menuRef.current.contains(e.target))
    //     }

    //     if (document)
    //     document.addEventListener("click", handleOutMenuClick)

    //     return () => document.removeEventListener("click", handleOutMenuClick)
    // })

    useEffect(() => {
        const clickHandler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setMenuOpened(!menuOpened)
            }
        }
        if (menuOpened) {
            console.log("add")
            document.addEventListener("click", clickHandler);
            return () => { console.log("rem"); document.removeEventListener("click", clickHandler) };
        }
    }, [menuOpened])

    const menuClickHandler = (e) => {
        // console.log("in click")
        setMenuOpened(!menuOpened)
    }

    return (

        // body container
        <div className="relative flex flex-col justify-center w-screen">

            {/* header container */}
            <div
                ref={menuRef}
                className={
                    headerBase
                    + " "
                    + (menuOpened ? openedClasses : closedClasses)
                    + " "
                    + "shadow-lg"
                }
                style={{
                    backdropFilter: "blur(10px)",
                    backgroundColor: (menuOpened ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.3)"),
                }}
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
                            <div className="bg-red-200 shadow-lg m-1"
                                style={{
                                    width: parseInt(btWidth) + "px",
                                    height: parseInt(btHeight) + "px",
                                }}
                                onClick={() => {
                                    setActivePath("/");
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
                                                // path kvoli zvyraznovaniu v menu
                                                setActivePath(path);
                                                menuClickHandler()
                                            }}
                                            style={{
                                                fontFamily: "'Kosugi', sans-serif",
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
                    <div className="p-1 m-1 flex-grow flex justify-center items-stretch">
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
                        <div className="relative shadow-lg"
                            onClick={menuClickHandler}
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
            {/* header end */}

            {/* main container */}
            <div className="h-screen overflow-visible max-w-3xl"

            >
                {children}
            </div>
        </div>
    )
}
