import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/router";

import React from "react";

import Exhibition from "../../components/exhibition"
import { getApiAccessToken } from "../../lib/utils";

const pageSize = 3;

export async function getStaticPaths(contenxt) {

    // console.log("getStaticPaths")

    // token caching
    const fs = require('fs');
    let token = null;
    if (fs.existsSync("./token.json")) {
        token =  JSON.parse(fs.readFileSync("./token.json")).token
    } else {
        token = await getApiAccessToken();
        fs.writeFileSync('./token.json', JSON.stringify({ token }))
    }

    const response = await fetch(process.env.NEXT_PUBLIC_CMS_BASE_URL + "/exhibitions/count",
        {
            // headers: new Headers({
            //     "Authorization": `Bearer ${token}`,
            //     "Content-Type": "application/json"
            // })
        }
    )

    if (response.status !== 200) {
        throw (new Error(`Authentication returned ${response.status}`))
    }

    const exhibitionsCount = parseInt(await response.text());
    const numberOfPages = parseInt(exhibitionsCount / pageSize) + parseInt(Math.min(exhibitionsCount % pageSize, 1))
    const paths = Array.from(new Array(numberOfPages), (x, i) => ({ params: { page: `${i + 1}` } }));

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {

    // console.log("getStaticProps for ")
    // console.log(params)

    // const token = await getApiAccessToken();
    
    const fs = require('fs');
    const token = JSON.parse(fs.readFileSync("./token.json")).token
    

    // console.log(params)

    // params.page is 1..n
    const response = await fetch(
        process.env.NEXT_PUBLIC_CMS_BASE_URL
        + "/exhibitions?"
        + new URLSearchParams({ _limit: pageSize, _start: (parseInt(params.page - 1)) * pageSize }), {
        headers: new Headers({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        })
    });

    if (response.status !== 200) {
        console.log(response)
        throw (new Error(`Authentication returned ${response.status}`))
    }

    const data = await response.json()

    // TODO remove?
    data.reverse();

    return {
        props: { data },
    }
}

function ExhibitionList(props) {

    return (
        <div>

        </div>
    )
}

export default function Exhibitions(props) {

    const data = [...props.data]

    const router = useRouter()
    const currentPage = parseInt(router.query.page);
    const pushed = React.useRef(false)

    // const exhibitionNames = props.data.map(exhibition => {
    //     return exhibition.description;
    // })

    useEffect(() => {
        console.log(`page ${router.asPath} mount`)
        return () => console.log(`page ${router.asPath} unmount`)
    })

    useEffect(() => {
        const handleScroll = (e) => {
            if (window.scrollY === document.body.offsetHeight - window.innerHeight) {
                router.push({
                    pathname: "/exhibitions/[page]",
                    query: { page: `${parseInt(router.query.page) + 1}` }
                })
            }
        }
        console.log(`addListener`); console.log(router.query);
        document.addEventListener("scroll", handleScroll)
        return () => { console.log(`removeListener`); console.log(router.query); document.removeEventListener("scroll", handleScroll) }
    }, [router.query])

    return (
        <div className="space-y-[calc(100vh-80px)]">
            {data.map(e => <Exhibition key={e.id} e={e} />)}
        </div>
    );
}