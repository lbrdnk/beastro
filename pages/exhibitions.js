import { createRef, useState } from "react";

import Exhibition from "../components/exhibition"
import { loadExhibitions } from "../lib/utils";

import Lightbox from "../components/lightbox";

export async function getStaticProps() {

    const exhibitions = await loadExhibitions();


    const d2 = exhibitions.map(({ description, flyer, photos }) => ({
        id: parseInt(description),
        description: description,
        invitation: flyer,
        opening: {
            photos: photos
        }
    }));

    return {
        props: { data: d2 },
    }
}

export default function Exhibitions({ data }) {

    // when adding new exhibition, update refs array
    const [exRefs, setExRefs] = useState(Array(data.length).fill().map(() => createRef()))

    // lightbox
    const [isLightBoxOpened, setIsLightBoxOpened] = useState(false);
    const closeLightbox = () => setIsLightBoxOpened(false);
    const [lightboxImages, setLightboxImages] = useState([]);
    const [selectedLightboxImageId, setSelectedLightboxImageId] = useState(null);

    return (
        <>
            {isLightBoxOpened && <Lightbox initialSelectedId={selectedLightboxImageId} images={lightboxImages} closeFn={closeLightbox} />}

            <div className="flex justify-center">

                <div className="flex-grow max-w-3xl space-y-8 m-2 mt-2 pl-2 pr-2">
                    {data.map((e, i) => (
                        <Exhibition key={e.id} e={e} ref={exRefs[i]}
                            description={e.description}
                            invitation={e.invitation}
                            opening={e.opening}
                            openLightbox={

                                    (selectedImgId) => {
                                    setLightboxImages(
                                        e.invitation ? (
                                            [e.invitation, ...e.opening.photos]
                                        ) : (
                                            [...e.opening.photos]
                                        ))
                                    setSelectedLightboxImageId(selectedImgId);
                                    setIsLightBoxOpened(true);
                                }
                            }
                        />)
                    )}
                </div>
            </div>
        </>
    );
}