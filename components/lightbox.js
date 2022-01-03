import Image from "next/image";

const Thumbnails = ({ images, closeFn, ...props }) => {
    return (
        <div className="bg-yellow-100 h-48 w-full flex overflow-x-scroll">

            {images.map((img, idx) => {
                // if (idx > 6) return null
                return (
                    <div className="relative h-full w-max max-w-max min-w-max">
                        {/* <Image 
                            width={img.width} 
                            height={img.height}
                            layout="fill"
                            objectFit="contain"
                            src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${img.url}`} /> */}
                            <img 
                            width={img.width} 
                            height={img.height}
                            className="block h-full w-max max-w-max min-w-max"
                            // layout="fill"
                            // objectFit="contain"
                            src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${img.url}`} />
                    </div>
                    
                )
            })}
        </div>
    )
}

export default ({ images, closeFn, ...props }) => {
    // console.log(images)
    return (
        <div className="flex flex-col fixed top-0 left-0 w-screen h-screen bg-red-200 z-40 p-8 space-y-8 flex-shrink-0">
            
            <button className="bg-blue-100" onClick={closeFn}>close me</button>
            
            <div className="flex flex-col justify-center bg-green-300 flex-grow">
                {/* <img className="block h-full" src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${images[0].url}`} /> */}
                <div className="relative w-full h-full">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_CMS_BASE_URL}${images[1].url}`}
                        // width={images[1].width}
                        // height={images[1].height}
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
            
            </div>
            <Thumbnails images={images} closeFn={closeFn} />
        </div>
    )
}