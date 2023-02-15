import lzString from "lz-string";

/**
 * Compress data
 * @param {object} data - Data to compress
 * @returns {string} compressed data as a string
 */
export const compressLZW = (data: any) => {
  if (typeof data === "object") {
    return lzString.compressToEncodedURIComponent(JSON.stringify(data));
  }

  return lzString.compressToEncodedURIComponent(data);
};

/**
 * Decompress strin
 * @param {string} compressed - Compressed string to decompress
 * @returns {string} decompressed string
 */
export const decompressLZW = (compressed: string) =>
  lzString.decompressFromEncodedURIComponent(compressed);

/**
 * Decompress data
 * @param {string} compressed - Compressed data to decompress
 * @returns {object} decompressed data as an object
 */
export const parseDecompressLZW = (compressed: string) =>
  JSON.parse(decompressLZW(compressed) ?? "");
