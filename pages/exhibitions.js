import Image from "next/image";

import Exhibition from "../components/exhibition"

const baseUrl = "http://localhost:1337"

export async function getStaticProps(context) {

    const res = await fetch(baseUrl + "/exhibitions");
    const data = await res.json()

    // console.log(data[0])

    if (!data) {
        return {
            notFound: true,
        }
    }

    data.reverse();

    return {
        props: { data }, // will be passed to the page component as props
    }
}

export default function Exhibitions(props) {

    const data = [...props.data]

    return (
        <div className="">
            {data.map(e => <Exhibition key={e.id} e={e} />)}  
        </div>
    );
}