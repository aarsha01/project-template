with google vision api working code

import { google } from "googleapis";
import { ImageSearchResult } from "../types";
import crypto from "crypto";
import fetch from "node-fetch";
import vision from "@google-cloud/vision";

const GOOGLE_CUSTOM_SEARCH_API_KEY =
  process.env.GOOGLE_CUSTOM_SEARCH_API_KEY || "";
const GOOGLE_CUSTOM_SEARCH_ENGINE_ID =
  process.env.GOOGLE_CUSTOM_SEARCH_ENGINE_ID || "";

const customsearch = google.customsearch("v1");

// Initialize Google Vision client
const visionClient = new vision.ImageAnnotatorClient();

// const blacklistedDomains = ["m.media-amazon.com"]; // Add domains to be excluded

export async function findMatchingImageFromGoogleImages({
  searchQuery,
}: {
  searchQuery: string;
}): Promise<ImageSearchResult> {
  const searchResponse = await customsearch.cse.list({
    auth: GOOGLE_CUSTOM_SEARCH_API_KEY,
    cx: GOOGLE_CUSTOM_SEARCH_ENGINE_ID,
    q: searchQuery,
    searchType: "image",
    // num: 50,
  });

  if (!searchResponse.data.items) {
    throw new Error("No images found");
  }

  // Create id by creating a digest of the image link and byte size
  const image = await findFirstAvailableImage(searchResponse.data.items);
  if (!image) {
    throw new Error("No images available at their links");
  }
  if (!image.link) {
    throw new Error("Image link is missing");
  }
  if (!image.image) {
    throw new Error("Image data is missing");
  }
  if (!image.image.width || !image.image.height) {
    throw new Error("Image dimensions are missing");
  }

  const dataToHash = `${image.link}-${image.image?.byteSize || 0}`;
  const id = crypto.createHash("md5").update(dataToHash).digest("hex");
  return {
    sourceId: id,
    sourceType: "GOOGLE_IMAGES",
    url: image.link,
    width: image.image.width,
    height: image.image.height,
  };
}

async function findFirstAvailableImage<T extends { link?: string | null }>(
  images: T[]
): Promise<T | undefined> {
  for (const image of images) {
    if (!image.link) {
      continue;
    }
    try {
      const response = await fetch(image.link);
      if (
        response.ok &&
        response.headers.get("content-type")?.startsWith("image")
      ) {
        const imageBuffer = await response.buffer();
        const textInImage = await detectText(imageBuffer);
        if (textInImage.words.length <= 3) {
          return image;
        }
      }
    } catch (error) {
      console.error("Error fetching or analyzing image:", error);
    }
  }
  return undefined;
}

async function detectText(imageBuffer: Buffer): Promise<{ words: string[] }> {
  const [result] = await visionClient.textDetection(imageBuffer);
  const detections = result.textAnnotations || [];
  const words = detections.map((text) => text.description).filter((word): word is string => word != null);
  return { words };
}

// function isBlacklistedDomain(url: string): boolean {
//   const domain = new URL(url).hostname;
//   return blacklistedDomains.includes(domain);
// }