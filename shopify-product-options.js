import { getFirstProductVariants } from "./utils/getFirstProductVariants.js"
import { getSecondProductVariants } from "./utils/getSecondProductVariants.js"
import { writeFile } from "fs/promises";


const SecondproductIds = {
    // "11b": "gid://shopify/Product/8695289413782",
    // "3b": "gid://shopify/Product/8695289479318",
    "5b-cooling": "gid://shopify/Product/8695289544854",
    "5b": "gid://shopify/Product/8695289610390",
    // "6b": "gid://shopify/Product/8695289675926",
    // "8b": "gid://shopify/Product/8695289741462",
    // "4b": "gid://shopify/Product/8695289774230",
}

const selectionOrder = {
    "11b": ['quantity', 'sizes'],
    "3b": ['fabric', 'sizes', 'colors'],
    "5b": ['sizes', 'colors'],
    "5b-cooling": ['sizes', 'colors'],
    "6b": ['sizes', 'colors'],
    "8b": ['sizes', 'colors'],
    "4b": ['sizes'],
}
const data = {};
for (const [code, id] of Object.entries(SecondproductIds)) {
    data[code] = await getSecondProductVariants(id, code, selectionOrder[code]);
}
// const data= await getFirstProductVariants("2c");
await writeFile("product-options.json", JSON.stringify(data, null, 2));
