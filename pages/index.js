import Head from 'next/head'
import Image from 'next/image'

// import hero from "../public/index_hero.jpg";
// import hero from "../public/index_hero_kaminsky_xp_3.jpg";
import hero from "../public/BEASTRO_pozvanka_fb_uzovic.jpg";

export default function Home({ }) {

    const { width, height } = hero;
    
    return (
        <div className="m-auto pt-2 pb-2 flex justify-center items-center max-w-3xl min-h-[calc(100vh-80px)]">
            <div className="relative mr-2 ml-2 flex-grow shadow-lg bg-gray-50">
                <Image
                    src={hero}
                    width={width}
                    height={height}
                    layout="responsive"
                />
            </div>
        </div>
    )

    // return (

    //     <div className="w-full flex flex-col items-center">
    //         <div className="w-full max-w-3xl">
    //             <div className="w-full shadow-2xl p-2">
    //                 {/* <div className="w-full relative filter invert" */}
    //                 <div className="w-full relative"
    //                     style={{
    //                         height: height + "px",
    //                         // width: width + "px"
    //                     }}
    //                 >
    //                     <Image
    //                         src={hero}
    //                         layout="fill"
    //                         objectFit="contain"
    //                         // objectPosition="20% 0%"
    //                         priority
    //                         quality={100}
    //                         // className='filter blur-md'
    //                     />
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // )
}