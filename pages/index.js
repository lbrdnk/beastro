import Head from 'next/head'
import Image from 'next/image'

import invitation from '../public_tmp/BEASTRO_pozvánka_2021_pizzitelli.jpg'

export async function getStaticProps(context) {

    const res = await fetch("http://localhost:1337/upload/files/49");
    const data = await res.json()

    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: { data },
    }
}

export default function Home({ data }) {

    const { width, height } = data;

    return (

        <div className="p-2">
            {/* using separate div to avoid box-shadow color inversion */}

            <div className="shadow-lg">
                {/* following div sets width and height for next/image that has layout=fill */}
                <div className="relative w-full filter invert"
                    style={{
                        height: height + "px"
                    }}
                >
                    <Image
                        src={"http://localhost:1337" + data.url}
                        // width={width}
                        // height={height}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="-530px 0%"
                    // className="block h-full w-full filter invert"
                    // style={{
                    //     objectPosition: "",
                    //     objectFit: "cover",
                    //     height: "100%"
                    // }}
                    />
                </div>
            </div>
        </div>
    )
}