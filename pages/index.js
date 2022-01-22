import Head from 'next/head'
import Image from 'next/image'

// import hero from "../public/index_hero.jpg";
import hero from "../public/index_hero_kaminsky_xp_2.jpg";

export default function Home({  }) {

    const { width, height } = hero;

    return (

        <div className="w-full flex flex-col items-center">
            <div className="w-full max-w-3xl">
                <div className="w-full shadow-2xl p-2">
                    {/* <div className="w-full relative filter invert" */}
                    <div className="w-full relative"
                        style={{
                            height: height + "px",
                            // width: width + "px"
                        }}
                    >
                        <Image
                            src={hero}
                            layout="fill"
                            objectFit="cover"
                            // objectPosition="20% 0%"
                            priority
                            quality={100}
                            // className='filter blur-md'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}