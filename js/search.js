// Importing modules for listing storage and display
import { getListings } from "/js/api/listings/storage.mjs";
import { displayListings } from "/js/api/listings/listings.js";

// Get DOM elements
const viewListings = document.getElementById("display-listings");
const searchFormSubmit = document.getElementById("search-submit");

// Event listener for the search form submission
searchFormSubmit.addEventListener("click", async (event) => {
 event.preventDefault();

 // Retrieve the search keyword from the form
 const { search } = document.forms["search-form"].elements;
 const searchValue = search.value.trim().toLowerCase();

 // Clear previous listings display
 viewListings.innerHTML = "";

 // Fetch listings and determine login status
 const listings = await getListings();
 const isLoggedIn = localStorage.getItem("accessToken") !== null;

 // Filter listings based on search criteria
 const filterListingsHandler = (listing) =>
  listing.title.toLowerCase().startsWith(searchValue);

 // Display filtered listings
 displayListings(listings, filterListingsHandler, isLoggedIn);
});
