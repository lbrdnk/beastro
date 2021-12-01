import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import beastroType from '../public_tmp/img/beastro_type.jpg';

export default function Header({ }) {

    // const inactiveShadow = "shadow-lg shadow-link-active hover:shadow-test";
    const inactiveShadow = "shadow-lg";
    const activeShadow = "shadow-lg";

    const [activePath, setActivePath] = useState("/");

    useEffect(() => {
        console.log(activePath);
    }, [activePath])

    return (
        // following container makes divider between header and main,
        // overflow-hidden
        <header className="sticky top-0 z-10 flex justify-center bg-white shadow-2xl overflow-hidden">
            <div className="flex justify-between container md:max-w-3xl p-2">
                <nav className="container flex justify-between">
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
                                        <a className={"transition-shadow m-2 mb-0 p-2 text-xl" + " " + (activePath == path ? activeShadow : inactiveShadow)}
                                            onClick={() => { setActivePath(path) }}
                                            style={{
                                                fontFamily: "Times"
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
        </header>
    )
}