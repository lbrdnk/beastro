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

const cache = { token: null };

async function getApiAccessToken() {




    // if (cache.token !== null) {
    //     console.log("token from cache")
    //     return cache.token
    // }

    console.log("token NOT from cache")

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

    if (!loginResponseJson.jwt) {
        throw (new Error(`jwt returned ${loginResponseJson.jwt}`))
    }

    // cache.token = loginResponseJson.jwt;



    return loginResponseJson.jwt;
}



// TODO: adjust to shrinkage 
const groupByHeight = (photoArr, colCount) => {

    const groups = photoArr.reduce((accHeights, currPhoto) => {

        const { minIdx } = accHeights.heights.reduce(({ curMin, minIdx }, curVal, curIdx) => (
            curVal < curMin ? { curMin: curVal, minIdx: curIdx } : { curMin, minIdx }
        ), {
            curMin: Number.MAX_VALUE,
            minIdx: -1
        })

        return {
            heights: [
                ...accHeights.heights.slice(0, minIdx),
                accHeights.heights[minIdx] + currPhoto.height,
                ...accHeights.heights.slice(minIdx + 1, accHeights.heights.length)
            ],
            groups: [
                ...accHeights.groups.slice(0, minIdx),
                [...accHeights.groups[minIdx], currPhoto],
                ...accHeights.groups.slice(minIdx + 1, accHeights.groups.length)
            ]
        }
    }, {
        heights: Array(colCount).fill(0),
        groups: Array(colCount).fill([])
    });

    return groups;
}

export {
    getApiAccessToken,
    getBoxFittingDimensions,
    groupByHeight,
    useWindowDimensions
}