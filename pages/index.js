import Head from 'next/head'
import Image from 'next/image'

import { loadIndexFlyer } from "../lib/utils";

export async function getStaticProps(context) {

    const indexFlyer = await loadIndexFlyer();

    return {
        props: { indexFlyer }
    }
}

export default function Home(props) {

    const { width, height, url } = props.indexFlyer;
    
    return (
        <div className="m-auto pt-2 pb-2 flex justify-center items-center max-w-3xl min-h-[calc(100vh-80px)]">
            <div className="relative mr-2 ml-2 flex-grow shadow-lg bg-gray-50">
                <Image
                    src={url}
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