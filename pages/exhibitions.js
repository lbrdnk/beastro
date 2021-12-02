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

    return {
        props: { data }, // will be passed to the page component as props
    }
}

export default function Exhibitions(props) {

    const data = props.data
// console.log(data)
    // const exhibitions = Object.keys(data).map(key => data[key]);
    // const e = data[38];
    // console.log(e);



    // console.log(data);

    return (
        <div>
            {data.map(e => <Exhibition key={e.id} e={e} />)}
            
        </div>
    );
}