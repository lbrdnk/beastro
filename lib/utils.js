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

function normalizeContentfulLink(linkStr) {
    return "https:" + linkStr;
}

async function loadExhibitions() {
    let url = new URL(process.env.CMS_CD_URL);
    let params = {
        access_token: process.env.CMS_ACCESS_TOKEN,
        content_type: "exhibition",
        // limit: 2
    };
    url.search = new URLSearchParams(params).toString();

    const response = await fetch(url);
    const body = await response.json();

    const items = body.items.slice();
    const assets = body.includes["Asset"].slice();

    const exhibitions = items.map((item) => {

        let flyer = {};
        // is following check strong enough?
        if (item.fields.flyer) {
            const flyerLinkId = item.fields.flyer.sys.id;
            const flyerAsset = assets.find((asset) => asset.sys.id === flyerLinkId);
            const url = normalizeContentfulLink(flyerAsset.fields.file.url);
            const { width, height } = flyerAsset.fields.file.details.image;
            const id = flyerAsset.sys.id;
            flyer = { id, url, width, height };
        }

        let photos = [];
        // is following check strong enough?
        if (item.fields.photos) {
            const photosLinkIds = item.fields.photos.map((photo) => photo.sys.id);
            const photosAssets = assets.filter(asset => photosLinkIds.includes(asset.sys.id));
            photos = photosAssets.map(asset => ({
                id: asset.sys.id,
                url: normalizeContentfulLink(asset.fields.file.url),
                width: asset.fields.file.details.image.width,
                height: asset.fields.file.details.image.height
            }))
        }

        // start with biiig index for sorting, temporary
        let description = "1000000000";
        if (item.fields.description) {
            description = item.fields.description;
        }

        return { description, flyer, photos };
    });

    // sort should happen on contentful backend
    exhibitions.sort((a, b) => {
        const aIdx = a.description || 1000000000;
        const bIdx = b.description || 1000000000;
        parseInt(aIdx) < parseInt(bIdx)
    })

    return exhibitions;
}

async function loadMoments() {
    let url = new URL(process.env.CMS_CD_URL);
    let params = {
        access_token: process.env.CMS_ACCESS_TOKEN,
        content_type: "moment",
        limit: 600
    };
    url.search = new URLSearchParams(params).toString();

    const response = await fetch(url);
    const body = await response.json();

    const items = body.items.slice();
    const assets = body.includes["Asset"].slice();

    const moments = items.map(item => {

        // null in case there is no matching photo -- ie moment iwthout photo
        // ie. contentful administrators error
        let moment = null;
        const asset = assets.find(asset => asset.sys.id === item.fields.photo.sys.id);
        if (asset) {
            const id = asset.sys.id;
            const { width, height } = asset.fields.file.details.image;
            const url = normalizeContentfulLink(asset.fields.file.url);
            moment = { id, width, height, url };
        }
        return moment;
    });

    return moments;
}

async function loadIndexFlyer() {
    let url = new URL(process.env.CMS_CD_URL);
    let params = {
        access_token: process.env.CMS_ACCESS_TOKEN,
        content_type: "indexFlyer",
        limit: 600
    };
    url.search = new URLSearchParams(params).toString();

    const response = await fetch(url);
    const body = await response.json();

    const items = body.items.slice();
    const assets = body.includes["Asset"].slice();

    let indexFlyer = {};
    const asset = assets.find(asset => asset.sys.id === items[0].fields.indexFlyer.sys.id);
    if (asset) {
        const id = asset.sys.id;
        const { width, height } = asset.fields.file.details.image;
        const url = normalizeContentfulLink(asset.fields.file.url);
        indexFlyer = { id, width, height, url };
    }
    return indexFlyer;
}

export {
    groupByHeight,
    loadExhibitions,
    loadIndexFlyer,
    loadMoments
}