import Head from 'next/head'
import Image from 'next/image'

import hero from "../public/index_hero.jpg";

export default function Home({  }) {

    const { width, height } = hero;

    return (

        <div className="w-full flex flex-col items-center">
            <div className="w-full max-w-2xl p-2">
                <div className="w-full shadow-2xl p-2">
                    <div className="w-full relative filter invert"
                        style={{
                            height: height + "px",
                            // width: width + "px"
                        }}
                    >
                        <Image
                            src={hero}
                            layout="fill"
                            objectFit="cover"
                            // objectPosition="-530px 0%"
                            priority
                            quality={50}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}