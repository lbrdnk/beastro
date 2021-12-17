import { useState, useEffect } from "react";

function getBoxFittingDimensions(availWidth, availHeight, imageWidth, imageHeight) {

    const coef = Math.max(imageWidth / availWidth, imageHeight / availHeight);
    // sem clamp min
    const width = parseInt(Math.ceil(imageWidth / coef));
    const height = parseInt(Math.ceil(imageHeight / coef));

    return { width, height }
}

function useWindowDimensions() {

    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateWindowDimensions = () => {
            const { innerWidth: width, innerHeight: height } = window;
            setDimensions({ width, height })
        };
        updateWindowDimensions()
        window.addEventListener("resize", updateWindowDimensions)
        return () => window.addEventListener("resize", updateWindowDimensions)
    }, [])

    return dimensions;
}

async function getApiAccessToken() {
    const loginResponse = await fetch(process.env.CMS_LOGIN_URL, {
        method: "POST",
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            identifier: process.env.API_USER,
            password: process.env.API_PASSWORD
        })
    })
    const loginResponseJson = await loginResponse.json()
    return loginResponseJson.jwt;
}

export {
    getApiAccessToken,
    getBoxFittingDimensions,
    useWindowDimensions
}