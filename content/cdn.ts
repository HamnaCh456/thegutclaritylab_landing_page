// Assets are hotlinked from Fruitful's CDN for now; swap for /public files when the content changes.
export const CDN = "https://cdn.prod.website-files.com";
export const cdn = (path: string) => `${CDN}/${path}`;
