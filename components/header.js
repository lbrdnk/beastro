import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import beastroType from '../public_tmp/img/beastro_type.jpg';
import beastroSquare from '../public_tmp/img/beastro_square.jpg';

export default function Header({ menuOpened, setMenuOpened, rotate }) {

    // const inactiveShadow = "shadow-lg shadow-link-active hover:shadow-test";
    const inactiveShadow = "shadow-lg";
    const activeShadow = "shadow-lg";

    const [activePath, setActivePath] = useState("/");

    useEffect(() => {
        console.log(activePath);
    }, [activePath])

    // dopocitavanie dlzky k vyske
    const btHeight = 64;
    const btWidth = parseInt(btHeight * beastroType.width / beastroType.height);

    // fix height for square
    const sqaureHeight = 64;
    // const btWidth = parseInt(btHeight * beastroType.width / beastroType.height);
    const squareWidth = parseInt(sqaureHeight * beastroSquare.width / beastroSquare.height);


    const rotateClasses = ""

    return (

        <div className="flex justify-center items-stretch w-full h-full shadow-lg bg-white">
            <div className="container max-w-3xl flex flex-col  justify-end items-center">


                <div className="flex-grow flex flex-col justify-center">
                    {
                        [
                            {
                                path: "/exhibitions",
                                title: "Exhibitions"
                            },
                            {
                                path: "/moments",
                                title: "Moments"
                            },
                        ].map(({ path, title }) => {


                            return (

                                <Link key={title} href={path} onClick={() => {
                                    setActivePath(path)
                                }}>
                                    <a className={"bg-white m-2 mb-0 p-2 text-xl" + " " + (activePath == path ? activeShadow : inactiveShadow)}
                                        onClick={() => {
                                            setActivePath(path);
                                            setSelectedItem(path)
                                        }}
                                        style={{
                                            // fontFamily: "Times"
                                            fontFamily: "'Merriweather', serif",
                                            fontSize: "18px",
                                            // fontStyle: "italic",
                                            fontWeight: "300",
                                        }}
                                    >
                                        {title}
                                    </a>
                                </Link>
                            );
                        })
                    }
                    {/* <div>Moments</div>
                    <div>Exhibitions</div> */}
                </div>




                {/* LOGO initial screen rectangle */}
                <div className="hidden flex items-center h-20 p-1">


                    <div className="relative shadow-lg"
                        onClick={setMenuOpened}
                        style={{ width: btWidth, height: btHeight }}
                    >
                        <Image src={beastroType} width={beastroType.width} height={beastroType.height}
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                </div>

                {/* LOGO initialScreen SQUARE CIRCLE */}
                <div className="relative flex justify-center items-center h-20 p-1">
                    {/* ! COVER JGP AS CIRCLE 
                    221	220	239	
                    #E2D7EC
                    #EBE2F2
                    #A6ACDD
                    #F2EAF7
                    */}
                    {/* <div className={
                        ("absolute w-16 h-16 flex items-center justify-center border-b-4 inset-auto border-blue-400 border-dashed")
                    }></div> */}

                    <div className="relative w-8 h-8 mr-32">
                        <svg className="absolute w-16 inset-auto" width="64" height="64" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            {/* <line x1="0" x2="32" y1="42" y2="21" stroke="black" stroke-width="5" />
                            <line x1="32" x2="63" y1="21" y2="42" stroke="black" stroke-width="5" /> */}
                            <polygon points="26 26 37 26 31 37" />
                        </svg>
                    </div>

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
                            onClick={() => { setMenuOpened() }}
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


            </div>

        </div>
    )
}


{/* <header className="flex shadow-lg justify-center items-center h-20">

<div className="shadow-lg">
    <div className="relative"
        style={{
            width: parseInt(beastroType.width / 2) + "px",
            height: parseInt(beastroType.height / 2) + "px",
        }}
    >
        <Image 
            src={beastroType}
            width={parseInt(beastroType.width)}
            height={parseInt(beastroType.height)}
            layout="fill"
            objectFit="contain"
            sizes={parseInt(beastroType.width / 2) + "px"}
            priority
        />
    </div>
</div>

<div className="flex flex-col">
    {
        [
            {
                path: "/exhibitions",
                title: "Exhibitions"
            },
            {
                path: "/moments",
                title: "Moments"
            },
        ].map(({ path, title }) => {
            return (
                <Link key={title} href={path} onClick={() => {
                    setActivePath(path)
                }}>
                    <a className={"bg-white" + " " + (activePath == path ? activeShadow : inactiveShadow)}
                        onClick={() => { setActivePath(path) }}
                        style={{
                        }}
                    >
                        {title}
                    </a>
                </Link>
            );
        })
    }
</div>
</header> */}


{/* <header className="hidden sm:flex sticky top-0 z-10 flex justify-center bg-white shadow-xl">
<div className="flex justify-between container md:max-w-3xl p-2 m-2">
    <nav className="flex justify-between">



        <Link href="/">
            <a onClick={() => { setActivePath("/") }}>
                <div className={"transition-shadow relative" + " " + (activePath == "/" ? activeShadow : inactiveShadow)}
                    style={{
                        width: parseInt(beastroType.width / 2) + "px",
                        height: parseInt(beastroType.height / 2) + "px"
                    }}
                >
                    <Image
                        src={beastroType}
                        width={parseInt(beastroType.width)}
                        height={parseInt(beastroType.height)}
                        layout="responsive"
                        sizes={parseInt(beastroType.width / 2) + "px"}
                        priority
                    />
                </div>
            </a>
        </Link>



        <div className="flex items-end">
            {
                [
                    {
                        path: "/exhibitions",
                        title: "Exhibitions"
                    },
                    {
                        path: "/moments",
                        title: "Moments"
                    },
                ].map(({ path, title }) => {
                    return (
                        <Link key={title} href={path} onClick={() => {
                            setActivePath(path)
                        }}>
                            <a className={"bg-white m-2 mb-0 p-2 text-xl" + " " + (activePath == path ? activeShadow : inactiveShadow)}
                                onClick={() => { setActivePath(path) }}
                                style={{
                                    // fontFamily: "Times"
                                    fontFamily: "'Merriweather', serif",
                                    fontSize: "18px",
                                    // fontStyle: "italic",
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
    </nav>
</div>
</header> */}