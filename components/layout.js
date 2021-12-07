import { Transition } from '@headlessui/react'

import React, { useEffect, useState } from "react";
// import Footer from './footer'
import Header from './header'

export default function Layout({ children }) {

    const [menuOpened, setMenuOpened] = useState(false);

    const [selectedItem, setSelectedItem] = useState("/");

    const headerBase = "w-full fixed h-60 transition-all duration-1000 "
    const closedClasses = "-top-40"
    const openedClasses = "top-0"

    const [gradientColor, setGradientColor] = useState(0);
    const changeGradientColor = () => setGradientColor((gradientColor + 1) % 2)

    const gradientClass = gradientColor === 0 ? "asdf" : "fdsa";

    const [rotate, setRotate] = useState(true);

    useEffect(() => {
        // console.log(menuOpened)
        console.log(gradientColor)
    })

    return (

        <div className="relative flex flex-col w-screen">

            <div className={"z-10 " + headerBase + " " + (menuOpened ? openedClasses : closedClasses)}
                onTransitionEnd={() => {console.log("transition end"); setRotate(!rotate)}}
            >

                <Header
                    setMenuOpened={() => setMenuOpened(!menuOpened)}
                    setSelectedItem={setSelectedItem}
                    selectedItem={selectedItem}
                    rotate={rotate}
                />

            </div>



            <div className="pt-20 h-screen overflow-visible" // "mt-20 flex-grow"
            // style={{ height: "5000px" }}
            >

                <button className="border-4 mt-10"
                    onClick={changeGradientColor}
                >change bg</button>

                {children}
            </div>



        </div>
    )
}

// export default function Layout({ children }) {

//     const [menuOpened, setMenuOpened] = useState(false);

//     // closed, closing, opened, opening
//     const [menuState, setMenuState] = useState("closed")

//     const horeClassesClosed = "fixed bg-red-100 h-40 -top-20 w-full"
//     const animateOpen = "fixed bg-red-100 h-40 -top-20 transform duration-500 translate-y-20  w-full"

//     const horeClassesOpen = "fixed bg-red-100 h-40 w-full"
//     const animateClose = "fixed bg-red-100 h-40 transform duration-500 -translate-y-20  w-full"

//     const headerBase = "fixed h-20 bg-red-100 transition-all duration-1000 transform"
//     const closedClasses = "-top-10"
//     const openedClasses = "top-0"

//     // console.log("redraw")

//     useEffect(() => {
//         console.log(menuOpened)
//     })

//     return (

//         // <div className="flex flex-col w-screen h-screen">

//         //     <div className="w-full h-80 sticky top-0 z-10 transform -translate-y-40 translate-y-0">
//         //         <Header setMenuOpened={setMenuOpened} menuOpened={menuOpened} />
//         //     </div>

//         //     <div className="w-full flex-grow">
//         //         {children}
//         //     </div>


//         // </div>

//         <div className="relative flex flex-col w-screen">

//             {/* sticky w-full h-20 -mt-10 -top-1/2 z-10 bg-red-100 */}
//             {/* <div
//                 className={
//                     menuState === "closed" ? (
//                         horeClassesClosed
//                     ) : (menuState === "closing" ? (
//                         animateClose
//                     ) : (menuState === "opened" ? (
//                         horeClassesOpen
//                     ) : animateOpen))}
//                 onAnimationEnd={() => {
//                     console.log("animation end")
//                     if (menuState === "opening") {
//                         setMenuState("opened")
//                     } else if (menuState === "closing") {
//                         setMenuState("closed")
//                     }
//                 }}
//             >
//                 hore
//             </div> */}


//             {/* element is removed from dom after transition */}
//             {/* <Transition
//                 show={menuOpened}
//                 enter="transform transition-all duration-1000"
//                 enterFrom="-translate-y-20"
//                 enterTo="translate-y-0"
//                 leave="transform transition-all duration-1000"
//                 leaveFrom="translate-y-20"
//                 leaveTo="-translate-y-20"
//             >
//                 <div
//                     className="fixed top-0 bg-red-100 h-40 w-full"
//                 >
//                     hore
//                 </div>
//             </Transition> */}
// {/* 
//             <div className="bg-yellow-100 mt-20">
//                 <div
//                     style={{
//                         marginTop: "300px",
//                         height: "5000px"
//                     }}
//                 >
//                     <p>dole</p>
//                     <button onClick={() => setMenuOpened(!menuOpened)}>x</button>
//                 </div>
//             </div> */}

//             <div className={headerBase + " " + (menuOpened ? openedClasses : closedClasses)}
//                 onTransitionEnd={() => console.log("transition end")}
//             >
//                 header
//             </div>
//             <div className="mt-20 bg-yellow-100"
//                 style={{height: "5000px"}}
//             >
//                 <p>content</p>
//                 <button className="mt-20 border-4 border-black" onClick={() => setMenuOpened(!menuOpened)}>toggle menu</button>
//             </div>


//         </div>
//     )
// }


{/* <main className="flex justify-center items-center flex-grow overflow-scroll h-full">
                <div className="container max-w-3xl h-full">
                {children}
                </div>
            </main> */}