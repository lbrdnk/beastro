// import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Header from './header'


const headerHeight = 80;

export default function Layout({ children }) {

    return (

        <>
            <Header />
            {children}
        </>
    )
}
