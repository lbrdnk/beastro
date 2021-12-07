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

    return (

        <div className="w-full h-screen p-4 space-y-2 flex flex-col">
            {/* using separate div to avoid box-shadow color inversion */}
            <div className="w-full shadow-lg">
                
                <img
                    src={"http://localhost:1337" + data.url}
                    className="block h-full w-full filter invert"
                    style={{
                        objectFit: "cover",
                        height: "3000px"
                    }}
                />

                <div className="w-full h-20 asdf shadow-lg"></div>

                <p> Cras ac iaculis mauris, in blandit nulla. In hac habitasse platea dictumst. Nunc rutrum orci vel risus mollis, ac gravida augue dapibus. Pellentesque lacinia felis quis felis facilisis, non sagittis nibh aliquet. Etiam sed luctus purus, eu pharetra massa. Aenean sed egestas lacus, mollis dignissim ipsum. Praesent vel nisi nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; </p>
            </div>



        </div>
    )
}

{/* <div className="filter invert relative max-w-3xl">
                <Image
                    src={"http://localhost:1337" + data.url}
                    width={data.width}
                    height={data.height}
                    fill="responsive"
                // sizes="500px"
                />
                
            </div> */}




{/* <div className="h-full w-full filter invert relative max-w-3xl">
                <Image
                    src={"http://localhost:1337" + data.url}
                    width={data.width}
                    height={data.height}
                    layout="fill"
                    objectFit="cover"
                // sizes="500px"
                />
            </div>

            <div>
                sem ide neco dalsie
            </div> */}