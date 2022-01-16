import Image from "next/image";

const breakpoints = {
    md: 640,
    lg: 768,
    xl: 960,
    xxl: 1280
}

// images
import beastroTypoLogo from '../public/beastro_type.jpg';
import beastroSquareLogo from '../public/beastro_square.jpg';
const computeScaledDimension = (origDimensions, newDimensions) => {

    const { width: origWidth, height: origHeight } = origDimensions;
    const { width: newWidth = null, height: newHeight = null } = newDimensions;

    // computing newHeight
    if (newWidth) {
        return {
            width: newWidth,
            height: origHeight * (newWidth / origWidth)
        }
    }

    // or width
    return {
        width: origWidth * (newHeight / origHeight),
        height: newHeight
    }
}


// header
const headerHeight = 80;
const headerHeightPx = `${headerHeight}px`
const headerLogoHeight = 64;
const headerLogoHeightPx = `${headerLogoHeight}px`

const Img = ({ src, width, height, className, ...props }) => {
    return (
        // if there are classNames, append
        <div className={"relative" + (className ? (" " + className) : "")}
            style={
                height ? {
                    width: `${width}px`,
                    height: `${height}px`
                } : {
                    width: `${width}px`
                }
            }
        >
            <Image
                src={src}
                layout="fill"
                {...props}
            />
        </div>
    )
}

export default {
    breakpoints,
    headerHeight,
    headerHeightPx,
    headerLogoHeight,
    headerHeightPx,
    Img,
    computeScaledDimension
}