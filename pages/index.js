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
}