import { LISTINGS_API_URL } from "../api/api-endpoints.mjs";
import { fetcher } from "../fetcher.js";
import { validateBid } from "./form-validation.mjs";
import { addToLocalStorage, getFromLocalStorage } from "./local-storage.mjs";

/**
 * Generates the HTML structure for a single listing.
 * @param {Object} listing - The listing object containing title, body, media, etc.
 * @param {boolean} [isAuthorized=false] - Whether the current user is authorized.
 * @returns {HTMLElement} - The HTML element representing the listing.
 */
export function generateListingHtml(listing, isAuthorized = false) {
 const { title, body, media, owner } = listing;

 // Create the main wrapper for the listing
 const listingWrapper = document.createElement("div");
 listingWrapper.classList.add("col");

 const listingContainer = document.createElement("div");
 listingContainer.classList.add(
  "card",
  "h-100",
  "w-64",
  "sm:w-96",
  "md:w-72",
  "bg-white",
  "border",
  "border-gray-200",
  "rounded-lg",
  "shadow",
  "hover:shadow-lg"
 );

 // Create the image container and image element
 const imageContainer = document.createElement("div");
 const image = document.createElement("img");
 image.src =
  media.length > 0
   ? media[0]
   : "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg";
 image.alt = title;
 image.classList.add("card-img-top");

 // Create the card body and content elements
 const cardBody = document.createElement("div");
 cardBody.classList.add("card-body", "d-flex", "flex-column");

 const listingTitle = document.createElement("h5");
 listingTitle.textContent = title;
 listingTitle.classList.add("card-title");

 const bodyElement = document.createElement("p");
 bodyElement.textContent = body;
 bodyElement.classList.add("card-text");

 // Create the bid section
 const bidSection = document.createElement("div");
 bidSection.classList.add("bid-section", "mt-auto");

 const input = document.createElement("input");
 input.type = "number";
 input.placeholder = "Enter bid";
 input.classList.add("bid-input", "form-control", "mb-2");

 const bidButton = document.createElement("button");
 bidButton.textContent = "Bid";
 bidButton.classList.add("btn", "btn-primary");

 const bids = listing.bids;
 let highestBid =
  bids.length > 0 ? Math.max(...bids.map((bid) => bid.amount)) : 0;

 const highestBidElement = document.createElement("p");
 highestBidElement.textContent = `Current bid: ${highestBid}`;
 highestBidElement.classList.add("highest-bid", "text-muted", "small");

 const endOfBid = document.createElement("p");
 endOfBid.classList.add("countdown", "text-muted", "small");
 endOfBid.setAttribute("data-end-time", listing.endsAt);

 // Check if the current user is the owner of the listing
 const currentUser = getFromLocalStorage("name");
 if (owner !== currentUser) {
  bidSection.append(input, bidButton, highestBidElement, endOfBid);
 } else {
  const ownerNotice = document.createElement("p");
  ownerNotice.textContent = "You cannot bid on your own listing.";
  ownerNotice.classList.add("text-danger", "small");
  bidSection.appendChild(ownerNotice);
 }

 // Add event listener for placing a bid
 bidButton.addEventListener("click", async (event) => {
  event.preventDefault();
  const bid = parseInt(input.value);

  if (!validateBid(bid)) {
   alert("Invalid bid amount");
   return;
  }

  const availableCredits = parseInt(getFromLocalStorage("credits"));
  if (availableCredits < bid) {
   alert(`Insufficient credits, available credits: ${availableCredits}`);
   return;
  }

  if (owner === currentUser) {
   alert("You cannot bid on your own listing.");
   return;
  }

  const success = await placeBid(listing.id, bid);
  if (success) {
   highestBidElement.textContent = `Current bid: ${bid}`;
  }
 });

 // Append elements to their respective containers
 imageContainer.appendChild(image);
 cardBody.append(listingTitle, bodyElement, bidSection);
 listingContainer.append(imageContainer, cardBody);
 listingWrapper.appendChild(listingContainer);

 return listingWrapper;
}

/**
 * Places a bid on a listing.
 * @param {string} id - The ID of the listing.
 * @param {number} bid - The bid amount.
 * @returns {Promise<boolean>} - Returns true if the bid was placed successfully.
 */
async function placeBid(id, bid) {
 const body = { amount: bid };
 const response = await fetcher(
  `${LISTINGS_API_URL}/${id}/bids`,
  {
   method: "POST",
   body: JSON.stringify(body),
  },
  true
 );

 if (response.errors) {
  alert(response.errors[0].message);
  return false;
 }

 const credits = parseInt(getFromLocalStorage("credits"));
 const newCredits = credits - bid;
 addToLocalStorage("credits", newCredits);

 alert("Bid placed successfully");
 return true;
}
