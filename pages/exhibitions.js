import Image from "next/image";

import Exhibition from "../components/exhibition"

const baseUrl = process.env.CMS_BASE_URL;
const loginUrl = `${process.env.CMS_BASE_URL}/auth/local`

export async function getStaticProps(context) {

    const loginResponse = await fetch(loginUrl, {
        method: "POST",
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            identifier: process.env.API_USER,
            password: process.env.API_PASSWORD
        })
    })
    const loginResponseJson = await loginResponse.json()
    const token = loginResponseJson.jwt


    const res = await fetch(baseUrl + "/exhibitions", {
        headers: new Headers({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        })
    });
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