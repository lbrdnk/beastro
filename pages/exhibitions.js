import Image from "next/image";

import Exhibition from "../components/exhibition"
import { getApiAccessToken } from "../lib/utils";

const loginUrl = `${process.env.CMS_BASE_URL}/auth/local`

export async function getStaticProps(context) {

    const token = await getApiAccessToken();

    const response = await fetch(
        process.env.NEXT_PUBLIC_CMS_BASE_URL
        + "/exhibitions?"
        + new URLSearchParams({ _limit: 5 }), {
        headers: new Headers({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        })
    });

    if (response.status !== 200) {
        throw(new Error(`Authentication returned ${response.status}`))
    }

    const data = await response.json()

    // TODO remove?
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