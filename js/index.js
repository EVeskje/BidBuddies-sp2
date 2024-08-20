import { displayListings } from "/js/api/listings/listings.js";
import { fetcher } from "/js/fetcher.js";
import { LISTINGS_API_URL } from "./api/api-endpoints.mjs";
import { setListings } from "/js/api/listings/storage.mjs";

async function main() {
 const isLoggedIn = Boolean(localStorage.getItem("accessToken"));
 const searchQuery = document.forms["search-form"]["search"].value
  .trim()
  .toLowerCase();

 try {
  const listings = await fetcher(
   `${LISTINGS_API_URL}?_seller=true&sort=created&_bids=true`,
   { method: "GET" }
  );

  setListings(listings);

  const filterListingsHandler = (listing) =>
   listing.title.toLowerCase().startsWith(searchQuery);

  displayListings(listings, filterListingsHandler, isLoggedIn);
 } catch (error) {
  console.error("Failed to fetch listings:", error);
 }
}

main();
