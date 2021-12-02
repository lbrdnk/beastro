import Image from "next/image";
const baseUrl = "http://localhost:1337/moments"

export async function getStaticProps(context) {

    const res = await fetch(baseUrl + "?_limit=50");
    const data = await res.json()

    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: { moments: data }, // will be passed to the page component as props
    }
}

export default function Moments({ moments }) {

    // console.log(moments[0])
    // console.log(moments[0].photos[0])
    // console.log(parseInt(moments[0].photos[0].height) + "px")
    // console.log(parseInt(moments[0].photos[0].height / 3) + "px")
    // console.log(parseInt(moments[0].photos[0].width) + "px")
    // console.log(parseInt(moments[0].photos[0].width / 3) + "px")

    return (
        <div className="flex flex-wrap items-center justify-evenly md:justify-between p-2 md:max-w-3xl">

            {/* test all imgs with use of responsive */}
            {moments[0].photos.map((photo, index) => {
                return (
                    // <Image src={"http://localhost:1337" + moment.url} />
                    <div key={photo.id} className="relative shadow-2xl m-2 bg-white"
                        style={{ width: parseInt(photo.width / 6) + "px", height: parseInt(photo.height / 6) + "px" }}>
                        <Image
                            src={"http://localhost:1337" + photo.url}
                            width={parseInt(photo.width)}
                            height={parseInt(photo.height)}
                            layout="responsive"
                            sizes={parseInt(photo.width / 6) + "px"}
                        />
                    </div>
                )
            })}

        </div>
    );
}

// {moments[0].photos.map((moment, index) => {
//     return (
//         // <Image src={"http://localhost:1337" + moment.url} />
//         <div key={moment.id} className="relative shadow-2xl m-2"
//          style={{ width: parseInt(moment.width / 5) + "px", height: parseInt(moment.height / 5) + "px" }}>
//             <Image
//                 src={"http://localhost:1337" + moment.url}
//                 layout="responsive"
//                 width={parseInt(moment.width)}
//                 height={parseInt(moment.height)}
//                 sizes=
//             />
//         </div>
//     )
// })}

// {/* test on one image */}
// <div className="relative shadow-2xl flex justify-center items-center p-2"
//     style={{
//         width: parseInt(moments[0].photos[0].width / 5) + "px",
//         height: parseInt(moments[0].photos[0].height / 5) + "px"
//     }}
// >
//     <Image

//         src={"http://localhost:1337" + moments[0].photos[0].url}
//         // width={parseInt(moment.width / 5)}
//         // height={parseInt(moment.height / 5)}
//         layout="fill"
//     />
// </div>

// {/* test -- with use of sizes I'm able to set */}
// <div className="relative shadow-2xl m-2"
//     style={{
//         width: parseInt(moments[0].photos[0].width / 5) + "px",
//         height: parseInt(moments[0].photos[0].height / 5) + "px"
//     }}
// >
//     <Image
//         src={"http://localhost:1337" + moments[0].photos[0].url}
//         width={parseInt(moments[0].photos[0].width)}
//         height={parseInt(moments[0].photos[0].height)}
//         layout="responsive"
//         sizes={parseInt(moments[0].photos[0].width / 5) + "px"}
//     />
// </div>
