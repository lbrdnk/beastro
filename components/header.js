import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Styling from "./styling"

import beastroType from '../public/beastro/beastro_logo_land.jpg';

const menuItems = [
    {
        path: "/exhibitions",
        title: "Exhibitions"
    },
    {
        path: "/moments",
        title: "Moments"
    }
];

const HeaderNav = ({ a }) => {

    return (
        null
    )
}

// args should be height, upper height
export default function Header({ isMenuOpened, setIsMenuOpened, ...props }) {

    const [innerWidth, setInnerWidth] = useState(undefined)

    // does following make sense?
    // const getWidth = React.useCallback(() => window.innerWidth, []);
    const getWidth = () => window.innerWidth;
    useEffect(() => {
        const updateWidth = () => setInnerWidth(getWidth())
        setInnerWidth(getWidth())
        window.addEventListener("resize", updateWidth)
        return () => window.removeEventListener("resize", updateWidth)
    }, [])

    const desktop = (

        // container -- has screen width, color etc.
        <div className="sticky top-0 z-20 w-full flex justify-center bg-gray-50 shadow-lg h-20">

            {/* content container -- space between logo with nav, max content width */}
            <div className="relative flex space-x-2 justify-between items-end max-w-3xl w-full pl-2 pr-2">

                {/* logo */}
                <Link href="/">
                    <a className="">
                        <Styling.Img
                            src={beastroType}
                            width={
                                Styling.computeScaledDimension({
                                    width: beastroType.width,
                                    height: beastroType.height
                                }, {
                                    height: 64
                                }).width
                            }
                            height={64}
                            className="shadow-lg mb-2"
                            priority
                        />
                    </a>
                </Link>

                {/* navigation container */}
                <div className="flex space-x-2 mb-2 h-8">
                    {menuItems.map(({ title, path }, index) => {
                        return (
                            <Link
                                key={title}
                                href={path}
                                className="cursor-pointer"
                            >
                                <a className={"text-nav bg-white shadow-lg pl-0.5 border-transparent h-8"}>
                                    {title}
                                </a>
                            </Link>
                        )
                    })}
                </div>

            </div>
        </div>
    )

    const mobile = (

        <>
            {/* placeholder in document flow for header, hence header is fixed position */}
            <div className="w-full h-20"></div>
            {/* actual content */}
            <div className={
                "transition-all z-20 w-full flex justify-center bg-gray-50 shadow-lg" +
                (isMenuOpened ? " fixed -top-16 h-60" : " fixed -top-40 h-60")
            }>

                {/* content container -- space between logo with nav, max content width */}
                <div className="relative flex space-x-2 justify-between items-end max-w-3xl w-full pl-2 pr-2">

                    <div className="flex flex-col justify-end items-start space-y-2">

                        {/* navigation container */}

                        {true && <div className="flex flex-col justify-end items-start flex-grow space-y-2">
                            {menuItems.map(({ title, path }, index) => {
                                return (
                                    <Link key={title} href={path}>
                                        <a className={"text-nav bg-white shadow-lg pl-0.5 border-transparent h-8"}>
                                            {title}
                                        </a>
                                    </Link>
                                )
                            })}
                        </div>}

                        {/* logo */}
                        <div className="h-20 flex items-end">
                            <Link href="/">
                                <Styling.Img
                                    src={beastroType}
                                    width={
                                        Styling.computeScaledDimension({
                                            width: beastroType.width,
                                            height: beastroType.height
                                        }, {
                                            height: 64
                                        }).width
                                    }
                                    height={64}
                                    className="shadow-lg mb-2"
                                    priority
                                />
                            </Link>
                        </div>
                    </div>



                    {/* hamburger */}
                    <div className="h-16 w-16 shadow-lg mb-2 bg-white" onClick={() => setIsMenuOpened(!isMenuOpened)}>
                        <span
                            className="w-full h-full align-middle flex items-center justify-center text-center text-3xl text-gray-500"
                        >
                            =
                        </span>
                    </div>

                </div>
            </div>
        </>
    )


    if (innerWidth === undefined)
        return <div className="w-full h-20"></div>

    // return isMobile ? mobile : desktop;
    return innerWidth < 480 ? mobile : desktop;
}


// ≡


// old header function -- mobile blur

// export default function Header2(props) {

//     // const mode = props.layoutMode
//     // console.log(mode)
//     const layout = props.layout
//     console.log(layout)


//     // MOBILE DATA START
//     const menuRef = useRef(null);
//     const [menuOpened, setMenuOpened] = useState(false);

//     // fix height for square logo
//     const sqaureHeight = 64;
//     const squareWidth = parseInt(sqaureHeight * beastroSquare.width / beastroSquare.height);

//     // fix height for rect logo
//     const btHeight = 64;
//     const btWidth = parseInt(btHeight * beastroType.width / beastroType.height);

//     // out click when menu opened handling
//     useEffect(() => {
//         const clickHandler = (e) => {
//             if (!menuRef.current.contains(e.target)) {
//                 setMenuOpened(!menuOpened)
//             }
//         }
//         if (menuOpened) {
//             document.addEventListener("click", clickHandler);
//             return () => { document.removeEventListener("click", clickHandler) };
//         }
//     }, [menuOpened])
//     // MOBILE DATA END

//     // TODO remove: old mobile header
//     // if (false) {
//     //     if (layout === "mobile") {

//             return (
//                 <div
//                     ref={menuRef}
//                     className={
//                         "fixed z-20 w-full h-60 transition-all duration-700 shadow-lg backdrop-blur-md"
//                         + " "
//                         + (menuOpened ? "top-0 bg-black/10" : "-top-40 bg-white/30")
//                     }
//                 >
//                     {/* header start */}

//                     {/* header upper start */}
//                     <div className="flex flex-row justify-start h-40">

//                         {/* NAV div */}
//                         <div className=" flex flex-col justify-between p-1 items-end h-full"
//                             style={{
//                                 minWidth: "calc(50% - 40px)"
//                             }}
//                         >

//                             <Link href="/">
//                                 {/* beastroType img link */}
//                                 <div className="shadow-lg m-1 cursor-pointer"
//                                     style={{
//                                         width: parseInt(btWidth) + "px",
//                                         height: parseInt(btHeight) + "px",
//                                     }}
//                                     onClick={() => {
//                                         setMenuOpened(!menuOpened);
//                                     }}
//                                 >
//                                     <div className="relative w-full h-full"

//                                     >
//                                         <Image
//                                             src={beastroType}
//                                             layout="fill"
//                                             objectFit="cover"
//                                             priority
//                                         />
//                                     </div>
//                                 </div>
//                             </Link>
//                             {/* beastroType img link end */}
//                             {/* other nav links */}
//                             {
//                                 menuItems.map(({ path, title }) => {
//                                     return (
//                                         // link functions created with 
//                                         <Link key={title} href={path}>
//                                             <a className={"bg-white m-1 shadow-lg pl-0.5"}
//                                                 onClick={() => {
//                                                     setMenuOpened(!menuOpened)
//                                                 }}
//                                                 style={{
//                                                     // fontFamily: "'Kosugi', sans-serif",
//                                                     fontSize: "1rem",
//                                                     letterSpacing: "2px",
//                                                     fontWeight: "bold",
//                                                 }}
//                                             >
//                                                 {title}
//                                             </a>
//                                         </Link>
//                                     );
//                                 })
//                             }
//                             {/* other nav links end */}
//                         </div>
//                         {/* ABOUT div */}
//                         <div className="p-1 m-1 flex-grow flex justify-center items-stretch max-w-xs">
//                             <div
//                                 className="w-full flex flex-col justify-center items-center bg-white shadow-lg"
//                             >
//                                 {
//                                     ["Gallery.", "Mikulášska 27,", "Bratislava."].map((line) => {
//                                         return (
//                                             <p key={line}
//                                                 className="pl-2 text-center"
//                                                 style={{
//                                                     fontFamily: "'Kosugi', sans-serif",
//                                                     fontSize: "1rem",
//                                                     letterSpacing: "2px",
//                                                 }}
//                                             >
//                                                 {line}
//                                             </p>

//                                         );
//                                     })
//                                 }

//                             </div>
//                         </div>
//                         {/* ABOUT div end */}
//                     </div>
//                     {/* header upper end */}

//                     {/* header visible start */}
//                     <div className="relative flex justify-center items-center h-20">
//                         <div className="rounded-full shadow-lg"
//                             style={{
//                                 width: "64px",
//                                 height: "64px",
//                                 overflow: "hidden",
//                                 display: "flex",
//                                 justifyContent: "center",
//                                 alignItems: "center",
//                             }}
//                         >
//                             <div className="cursor-pointer relative shadow-lg"
//                                 onClick={() => setMenuOpened(!menuOpened)}
//                                 style={{ width: squareWidth, height: sqaureHeight }}
//                             >
//                                 <Image
//                                     src={beastroSquare}
//                                     layout="fill"
//                                     objectFit="contain"
//                                     quality={100}
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                     {/* header visible end */}

//                 </div>
//             )

//     //     }
//     // }

//     return (

//         // <div className="sticky top-0 z-40 w-full flex justify-center bg-transparent fitler backdrop-blur-lg shadow-lg">
//         <div className="sticky top-0 z-20 w-full flex justify-center bg-gray-50 shadow-lg h-20">
//             <div className="relative flex justify-start items-end max-w-3xl w-full"

//             >

//                 <div className="flex w-1/2 justify-between ">
//                     <Link href="/">
//                         <a className="">
//                             <Styling.Img
//                                 src={beastroType}
//                                 width={Styling.computeScaledDimension({
//                                     width: beastroType.width,
//                                     height: beastroType.height
//                                 }, {
//                                     height: 64
//                                 }).width}
//                                 height={64}
//                                 className="shadow-lg mb-2 border-b-4 border-purple-400"
//                             />
//                         </a>
//                     </Link>
//                     <div className="relative hidden">
//                         <div className="relative left-1/2">
//                             <Link href="/">
//                                 <a>
//                                     <Styling.Img
//                                         src={beastroSquare}
//                                         width={Styling.computeScaledDimension({
//                                             width: beastroSquare.width,
//                                             height: beastroSquare.height
//                                         }, {
//                                             height: 64
//                                         }).width}
//                                         height={64}
//                                         className="shadow-lg mb-2"
//                                     />
//                                 </a>
//                             </Link>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="w-1/2 flex justify-end space-x-2 ">
//                     {menuItems.map(({ title, path }, index) => {
//                         return (
//                             <Link key={title} href={path}>
//                                 <a className={"bg-white shadow-lg pl-0.5 mb-2 border-b-4 border-transparent hover:border-purple-400"}
//                                     style={{
//                                         // fontFamily: "'Kosugi', sans-serif",
//                                         fontSize: "1rem",
//                                         letterSpacing: "2px",
//                                         fontWeight: "bold",
//                                         height: "32px",
//                                         // verticalAlign: "baseline"
//                                         lineHeight: "32px"
//                                     }}
//                                 >
//                                     {title}
//                                 </a>
//                             </Link>
//                         )
//                     })}
//                 </div>
//             </div>
//         </div>
//     )
// }