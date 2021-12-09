import Image from "next/image";

const baseUrl = "http://localhost:1337"

// 1. check proportions of invitation
export default function Exhibition({ e }) {

    return (
        <div className="flex flex-col justify-center items-center">

            {/* invitation */}
            <div className="w-full flex justify-center items-center"
                style={{
                    height: "calc(100vh - 88px)",
                    position: "sticky",
                    top: "80px",
                }}
            >


                <div className="w-full"
                    style={{
                        // position: "sticky",
                        // top: "0%",
                        // marginTop: "0px",
                        // bottom: "0px"
                    }}
                >

                    {/* invitation image */}
                    <div className=" relative shadow-inset"
                    // style={{
                    //     width: parseInt(e.invitation.width / 6),
                    //     height: "100%"
                    // }}    
                    >
                        <Image
                            src={baseUrl + e.invitation.url}
                            width={parseInt(e.invitation.width)}
                            height={parseInt(e.invitation.height)}
                            layout="responsive"
                            sources={"60vw"}
                        />
                    </div>

                </div>
                
            </div>
            {/* invitation end */}

            {/* photos */}
            <div className="flex flex-col w-full justify-center space-y-4 p-4">

                {e.photos.map(({ width, height, url }) => {
                    return (

                        // photo frame
                        <div className="z-20 bg-white flex justify-center items-center w-full p-4 shadow-lg">

                            {/* photo */}
                            <div key={url} className="w-full relative bg-white">
                                <Image
                                    src={baseUrl + url}
                                    width={parseInt(width)}
                                    height={parseInt(height)}
                                    layout="responsive"
                                    sources={"60vw"}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* photos end */}

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