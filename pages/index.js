import Head from 'next/head'
import Image from 'next/image'

// import invitation from '../public_tmp/BEASTRO_pozvánka_2021_pizzitelli.jpg'

import hero from "../public/index_hero.jpg";

// const baseUrl = process.env.CMS_BASE_URL;

// export async function getStaticProps(context) {

//     const res = await fetch(`${baseUrl}/upload/files/49`);
//     const data = await res.json()

//     if (!data) {
//         return {
//             notFound: true,
//         }
//     }

//     return {
//         props: { data },
//     }
// }

// TODO responsive mobile image
export default function Home({  }) {

    const { width, height } = hero;

    return (

        <div className="w-full mt-20 flex flex-col items-center">
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