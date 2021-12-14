import Image from "next/image";

import Exhibition from "../components/exhibition"

const baseUrl = process.env.CMS_BASE_URL;

export async function getStaticProps(context) {

    const res = await fetch(baseUrl + "/exhibitions");
    const data = await res.json()

    if (!data) {
        return {
            notFound: true,
        }
    }

    data.reverse();

    return {
        props: { data },
    }
}

export default function Exhibitions(props) {

    const data = [...props.data]

    return (
        <div className="space-y-[calc(100vh-80px)]">
            {data.map(e => <Exhibition key={e.id} e={e} />)}
        </div>
    );
}