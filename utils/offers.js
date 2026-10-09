import { config } from 'dotenv';
import { productOptionMapping, fetchShopifyProducts, productIds } from './getShopifyProducts.js';
config();
const HOST = process.env.HOST || 'http://localhost:3000';


const OFFERS_V2 = [
  {
    id: productIds[0],
    title: "One time offer",
    tag: "3-zone-comforter",
    productTitle: "3-Temperature-Zone Comforter",
    default: {
      option1: "full_queen",
      option2: "white"
    },
    productImageURL:
      "https://cdn.shopify.com/s/files/1/1647/4405/files/MIR_3-ZoneComforter-PDP-product_white1.webp?v=1737147697",
    productImageUrls: [`https://cdn.shopify.com/s/files/1/1647/4405/files/MIR_3-ZoneComforter-PDP-product_white1.webp?v=1737147697`,
      `${HOST}/1a/2.webp`,
      `${HOST}/1a/3.webp`,
      `${HOST}/1a/4.webp`,
      `${HOST}/1a/5.webp`
    ],
    productDescription: ["Warm where you want it. Breathable where you don't. Designed to prevent overheating without sacrificing that soft, cozy feel."],
    originalPrice: "949.95",
    discountedPrice: "949.95",
    features: [
      "Perfect temperature for your body all night long",
      "Ultra-luxurious, 300-thread count Miracle Clean & Cool™ fabric",
      "Infused with silver that prevents up to 99.7% of bacteria growth",
      "Hypoallergenic and 100% vegan"
    ],
  },
  {
    id: productIds[1],
    title: "One time offer",
    tag: "remycloud-pillow",
    productTitle: "RemyCloud Cooling Pillow",
    default: {
      option1: "standard",
      option2: "set_of_2"
    },
    productImageURL:
      "https://cdn.shopify.com/s/files/1/0628/4574/7315/files/Main_52f8e304-92d9-4a36-82af-50df8fe31c69.jpg?v=1733592307",
    productDescription: [`Cool-to-the-touch, adjustable support for that "just right" feel—whether you sleep on your back, side, or stomach.`],
    productImageUrls: [`${HOST}/v2/2.png`,
    `${HOST}/1b/2.webp`,
    `${HOST}/1b/3.webp`,
    `${HOST}/1b/4.webp`,
    `${HOST}/1b/5.webp`
    ],
    originalPrice: "629.95",
    discountedPrice: "629.95",
  },
  {
    id: productIds[2],
    title: "One time offer",
    productTitle: "Luxe Duvet Cover",
    default: {
      option1: "full_queen",
      option2: "sky_blue"
    },
    tag: "duvet-cover",
    productImageURL:
      "https://cdn.shopify.com/s/files/1/0628/4574/7315/files/Main_0a40b01b-5021-48c1-80d1-aa8ab4876d3d.jpg?v=1733592307",
    productImageUrls: [`${HOST}/v2/3.png`,
      "https://try.miraclebrand.co/up/comforter/images/sliders/5b/white/02.webp",
      "https://try.miraclebrand.co/up/comforter/images/sliders/5b/white/03.webp",
      "https://try.miraclebrand.co/up/comforter/images/sliders/5b/white/04.webp",
      "https://try.miraclebrand.co/up/comforter/images/sliders/5b/white/05.webp"
    ],
    productDescription: ["Finish the look with the same cool, stay-fresh fabric—so your whole bed works together."],
    originalPrice: "600.00",
    discountedPrice: "600.00",
    colors: [
      {
        name: "White",
        img: "https://cdn.shopify.com/s/files/1/0628/4574/7315/files/white.svg?v=1751651865",
      },
      {
        name: "Stone",
        img: "https://cdn.shopify.com/s/files/1/0628/4574/7315/files/stone.svg?v=1751651866"
      }
    ],
  },
  {
    id: productIds[3],
    title: "One time offer",
    productTitle: "Detergent Sheets",
    tag: "detergent",
    default: {
      option1: "b1g1"
    },
    productImageUrls: [`${HOST}/v2/4.png`,
    `${HOST}/2d/2.webp`,
    `${HOST}/2d/3.webp`,
    `${HOST}/2d/4.webp`,
    `${HOST}/2d/5.webp`
    ],
    productDescription: ["Pre-measured detergent sheets with cleaner ingredients and no bulky plastic—so caring for your sheets stays simple."],
    originalPrice: "885.95",
    discountedPrice: "885.95",
  },
]

export async function getOffersV2() {
  const products = OFFERS_V2.map(async (offer) => {
    const optionOrder = productOptionMapping[offer.id];
    const productData = await fetchShopifyProducts(offer.id, optionOrder);
    return {
      ...offer,
      optionOrder: optionOrder.map((option) => option.toLowerCase()),
      ...productData
    }

  });
  return Promise.all(products);

}
