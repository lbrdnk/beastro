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
        props: { data }, // will be passed to the page component as props
    }
}

export default function Home({ data }) {
    // console.log(invitation);
    console.log(data)
    return (
        <div className="">
            <div className="filter invert relative max-w-3xl">
                <Image
                    src={"http://localhost:1337" + data.url}
                    width={data.width}
                    height={data.height}
                    fill="responsive"
                // sizes="500px"
                />
            </div>
        </div>
    )
}
