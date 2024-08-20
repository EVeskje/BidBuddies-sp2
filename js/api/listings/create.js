import { fetcher } from "../../fetcher.js";

// Constants
const BASE_API_URL = "https://api.noroff.dev/api/v1";
const LISTINGS_API_URL = `${BASE_API_URL}/auction/listings`;

// Utility Functions
function getFormValues() {
 const form = document.forms["new-listing-form"];
 return {
  title: form["inputTitle"].value,
  body: form["inputDescription"].value,
  media: form["inputMedia1"].value ? [form["inputMedia1"].value] : [],
  endsAt: form["inputEndsAt"].value,
 };
}

async function createListing(listing) {
 try {
  const response = await fetcher(
   LISTINGS_API_URL,
   { method: "POST", body: JSON.stringify(listing) },
   true
  );

  if (response.errors) {
   alert(response.errors[0].message);
   return null;
  }
  return response;
 } catch (error) {
  console.error("Failed to create listing:", error); // Debugging log
  alert("Failed to create listing: " + error.message);
  return null;
 }
}

function handleSubmitClick(event) {
 event.preventDefault();
 const listing = getFormValues();
 createListing(listing).then((response) => {
  if (response) {
   window.location.href = "/pages/listings";
  }
 });
}

function setupEventListeners() {
 const submitNewListing = document.querySelector("#submit-new-listing");
 const submitNewListingForm = document.getElementById("new-listing-form");

 if (!localStorage.getItem("accessToken")) {
  submitNewListingForm.innerHTML =
   "<p style='color: white; text-align: center;'> User must be logged in to create a listing. Please login.</p>";
  return;
 }

 if (submitNewListing) {
  submitNewListing.addEventListener("click", handleSubmitClick);
 } else {
  console.error("Submit New Listing button not found");
 }
}

// Main Function
document.addEventListener("DOMContentLoaded", setupEventListeners);
