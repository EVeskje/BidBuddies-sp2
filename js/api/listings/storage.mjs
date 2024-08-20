// Private variable to store listings
let listings = [];

/**
 * Retrieves the current listings.
 * @returns {Array} The current array of listings.
 */
export function getListings() {
    return [...listings]; // Return a copy to avoid direct modification
}

/**
 * Sets new listings, replacing the existing ones.
 * @param {Array} newListings - The new array of listings to set.
 * @throws {TypeError} Throws an error if `newListings` is not an array.
 */
export function setListings(newListings) {
    if (!Array.isArray(newListings)) {
        throw new TypeError("The argument must be an array.");
    }
    listings = [...newListings]; // Store a copy to prevent external modifications
}