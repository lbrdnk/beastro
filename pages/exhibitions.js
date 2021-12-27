import Image from "next/image";
import { createRef, useEffect, useState } from "react";

import Exhibition from "../components/exhibition"
import { getApiAccessToken } from "../lib/utils";

import { useSWR } from "swr";

export async function getStaticProps(context) {

    const token = await getApiAccessToken();

    const response = await fetch(
        process.env.NEXT_PUBLIC_CMS_BASE_URL
        + "/exhibitions?"
        + new URLSearchParams({ _limit: 10 }), {
        headers: new Headers({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        })
    });

    if (response.status !== 200) {
        throw (new Error(`Authentication returned ${response.status}`))
    }

    const data = await response.json()

    // TODO remove?
    data.reverse();

    return {
        props: { data },
    }
}

export default function Exhibitions(props) {

    // const fetcher = async (url) => await fetch(url).then((res) => res.data);

    // const { data, error } = useSWR(`/api/exhibitions&page=1`, fetcher)

    // if (error) return <div>error</div>
    // if (!data) return <div>loading</div>

    const [page, setPage] = useState(1);
    const [newPageData, setNewPageData] = useState([])

    const data = [...props.data]

    // when adding new exhibition, update refs array
    const [exRefs, setExRefs] = useState(Array(data.length).fill().map(() => createRef()))

    // useEffect(() => {
    //     setExRefs(Array(data.length).fill(createRef()))
    // }, [data.length])

    // when new page is generated, new handler is used
    useEffect(() => {
        const handler = async () => {

            if (window.scrollY + window.innerHeight === document.body.offsetHeight) {
                
                

                const data =  await fetch(`http://localhost:3000/api/exhibitions?page=${page+1}`)
                // console.log(data)
                const d2 = await data.json()
                // console.log(d2)


                setNewPageData([...newPageData, d2])
                setPage(page + 1);
                // console.log(d2)
            }
        }
        document.addEventListener("scroll", handler)
        return () => document.removeEventListener("scroll", handler)
    }, [])

    useEffect(() => {
        console.log(newPageData)
        console.log(page);
    })

    // useEffect(() => { console.log(exRefs.length) })

    return (
        <div className="space-y-[calc(100vh-80px)]">
            {/* {newPageData.length} */}
            <div className="sticky left-0 top-20 w-64 p-4 h-[calc(100vh-80px)]">
                <div className="bg-black shadow-inner w-full h-full overflow-scroll">
                    <ul className="">
                        {data.map((exhibition, index) => {
                            return (
                                <li
                                    key={exhibition.id}
                                    onClick={e => {
                                        // console.log(exRefs[index].current)
                                        console.log(exRefs)
                                        exRefs[index].current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
                                    }}
                                >
                                    <span className="text-white">{exhibition.description}</span>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            {data.map((e, i) => <Exhibition key={e.id} e={e} ref={exRefs[i]} />)}
            {/* {true ? newPageData.map((pageData, pageIndex) => {
                true ? pageData.map((exhibition, exhibitionIndex) => <Exhibition key={exhibition.id}
                    e={exhibition} ref={exRefs[data.length + (pageIndex - 1) * 10 + exhibitionIndex]} />) : null
            }) : null} */}
            {/* {newPageData.length} */}
            
        </div>
    );
}