import Head from 'next/head'
import Image from 'next/image'

import invitation from '../public_tmp/BEASTRO_pozvánka_2021_pizzitelli.jpg'

export default function Home() {
    // console.log(invitation);
    return (
        <div className="w-full h-full flex flex-col items-center">
            <div className="w-1/2 h-1/2 p-8">
                <div className="relative w-full h-full shadow-xl">
                    <Image
                        src={invitation} //width={512} height={279}
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
            </div>
        </div>
    )
}
