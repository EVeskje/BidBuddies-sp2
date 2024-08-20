import { generateListingHtml } from "../../utils/generateListingHtml.js";

const listingsContainer = document.getElementById("display-listings");

// Sort listings by creation date, newest first
function compareNewest(a, b) {
 return new Date(b.created) - new Date(a.created);
}

// Filter out listings that are expired
function isNotExpired(listing) {
 return new Date(listing.endsAt) > new Date();
}

// Format countdown time
function formatCountdown(ms) {
 const days = Math.floor(ms / (1000 * 60 * 60 * 24));
 const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
 const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
 const seconds = Math.floor((ms % (1000 * 60)) / 1000);
 return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Update countdown timers for listings
function updateCountdowns() {
 const countdownElements = document.querySelectorAll(".countdown");
 countdownElements.forEach((element) => {
  const endTime = new Date(element.getAttribute("data-end-time")).getTime();
  const now = new Date().getTime();
  const timeRemaining = endTime - now;
  element.textContent =
   timeRemaining < 0 ? "Expired" : formatCountdown(timeRemaining);
 });
}

// Display listings in the container
export async function displayListings(
 listings,
 filterCallback,
 isAuthorized = false
) {
 listingsContainer.innerHTML = "";

 const filteredListings = listings
  .filter(filterCallback)
  .filter(isNotExpired)
  .sort(compareNewest);

 filteredListings.forEach((listing) => {
  const listingHtml = generateListingHtml(listing, isAuthorized);
  listingsContainer.appendChild(listingHtml);
 });

 // Update countdown timers after listings are rendered
 updateCountdowns();
}

// Update countdown timers every second
setInterval(updateCountdowns, 1000);
