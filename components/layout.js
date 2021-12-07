import { Transition } from '@headlessui/react'

import React, { useEffect, useState } from "react";
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
        path: "/moments",
        title: "Moments"
    }
];

export default function Layout({ children }) {

    const [menuOpened, setMenuOpened] = useState(true);

    // const [selectedItem, setSelectedItem] = useState("/");

    const headerBase = "fixed z-10 w-full h-60 transition-all duration-1000 "
    const closedClasses = "-top-40"
    const openedClasses = "top-0"

    const [activePath, setActivePath] = useState("/");

    // fix height for square
    const sqaureHeight = 64;
    const squareWidth = parseInt(sqaureHeight * beastroSquare.width / beastroSquare.height);


    return (

        // body container
        <div className="relative flex flex-col w-screen">

            {/* header container */}
            <div
                className={
                    headerBase
                    + " "
                    + (menuOpened ? openedClasses : closedClasses)
                    + " "
                    + "shadow-lg "
                }
                style={{
                    // backgroundColor: "rgba(255,255,255,0.5)",
                    backdropFilter: "blur(10px)"
                }}
            >
                {/* header start */}

                {/* header upper start */}
                <div className="flex h-40">
                    {
                        menuItems.map(({ path, title }) => {
                            return (

                                <Link key={title} href={path} onClick={() => {
                                    setActivePath(path)
                                }}>
                                    <a className={"bg-white m-2 mb-0 p-2 text-xl"}
                                        onClick={() => {
                                            setActivePath(path);
                                            setSelectedItem(path)
                                        }}
                                        style={{
                                            fontFamily: "'Merriweather', serif",
                                            fontSize: "18px",
                                            fontWeight: "300",
                                        }}
                                    >
                                        {title}
                                    </a>
                                </Link>
                            );
                        })
                    }
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
                            onClick={() => { setMenuOpened(!menuOpened) }}
                            style={{ width: squareWidth, height: sqaureHeight }}
                        >
                            <Image
                                src={beastroSquare} width={beastroSquare.width} height={beastroSquare.height}
                                layout="fill"
                                objectFit="contain"
                            />
                        </div>
                    </div>
                </div>
                {/* header visible end */}

                {/* header end */}
            </div>

            {/* main container */}
            <div className="pt-20 h-screen overflow-visible">
                {children}
            </div >
        </div >
    )
}
