import React, { useEffect, useState } from "react";
import Header from './header'
import Styling from "./styling";

const layoutMode = {
    na: "na",
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
    xxl: "xxl",
}

const layouts = { mobile: "mobile", desktop: "desktop" }

const isMobile = mode => [layoutMode.sm, layoutMode.md].findIndex(mobileMode => mode === mobileMode) !== -1

const reportLayoutMode = ({ width, height }) => {

    if (arguments.legth === 0) {
        throw (new Error("Argument mismatch"))
    }
    // explicit missing
    if (arguments[0] === null) {
        return layoutMode.na;
    }
    // imlpicit missing, eg. undefined
    if (!arguments[0]) {
        throw (new Error("Argument mismatch"));
    }
    if ((typeof width) !== "number" || (typeof height) !== "number") {
        throw (new Error("Argument mismatch"));
    }

    if (width < Styling.breakpoints.md) {
        return layoutMode.sm;
    } else if (width < Styling.breakpoints.lg) {
        return layoutMode.md;
    } else if (width < Styling.breakpoints.xl) {
        return layoutMode.lg;
    } else if (width < Styling.breakpoints.xxl) {
        return layoutMode.xl;
    } else {
        return layoutMode.xxl;
    }
}

// TODO compute only on first render, ie. listener only in development
const useLayoutMode = () => {

    const [mode, setMode] = useState(layoutMode.na)
    useEffect(() => {
        setMode(reportLayoutMode({ width: window.innerWidth, height: window.innerHeight }));
        const updateLayoutMode = () => setMode(reportLayoutMode({ width: window.innerWidth, height: window.innerHeight }));
        window.addEventListener("resize", updateLayoutMode);
        return () => window.removeEventListener("resize", updateLayoutMode);
    }, [])

    return mode;
}

export default function Layout({ children }) {

    const mode = useLayoutMode();
    const layout = isMobile(mode) ? layouts.mobile : layouts.desktop;

    const [isMenuOpened, setIsMenuOpened] = useState(false)

    return (

        <>
            {/* desktop or mobile */}
            <Header layout={layout} isMenuOpened={isMenuOpened} setIsMenuOpened={setIsMenuOpened} />
                {children}
        </>
    )
}
