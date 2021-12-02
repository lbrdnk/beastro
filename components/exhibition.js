import Image from "next/image";

const baseUrl = "http://localhost:1337"

// 1. check proportions of invitation
export default function Exhibition({ e }) {

    return (
        <div className="flex justify-center items-center first:mt-4 mb-20 shadow-lg p-4">

            <div className="flex self-start ">

                {/* invitation */}
                <div className="m-2 w-full relative shadow-2xl m-2 bg-white"
                    style={{
                        width: parseInt(e.invitation.width / 6),
                        height: parseInt(e.invitation.height / 6)
                    }}    
                >
                    <Image
                        src={baseUrl + e.invitation.url}
                        width={parseInt(e.invitation.width)}
                        height={parseInt(e.invitation.height)}
                        fill="responsive"
                        sources={parseInt(e.invitation.width) + "px"}
                    />
                </div>

            </div>
            
            {/* photos */}
            <div className="flex flex-wrap bg-white">

                {e.photos.map(({ width, height, url }) => {
                    return (
                        <div className="flex justify-center items-center w-5/12 p-4  m-2  relative shadow-2xl bg-white">
                            <Image
                                src={baseUrl + url}
                                width={parseInt(width)}
                                height={parseInt(height)}
                                fill="responsive"
                                sources={parseInt(width / 6) + "px"}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    )
}


        //     {/* photos */}
        //     {/* <div>
        //     {e.photos.map(({ width, height, url }) => {
        //         return (
        //             <Image
        //                 src={baseUrl + url}
        //                 width={parseInt(width)}
        //                 height={parseInt(height)}
        //                 fill="responsive"
        //                 sources={parseInt(width / 6) + "px"}
        //             />
        //         );
        //     })}
        // </div> */}