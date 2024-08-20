import { PROFILE_API_URL } from "../api-endpoints.mjs";
import { fetcher } from "/js/fetcher.js";

document.addEventListener("DOMContentLoaded", async () => {
 if (!localStorage.getItem("accessToken")) {
  window.location.href = "/index.html";
  return;
 }

 await initializeProfile();
 setupUpdateAvatarListener();
});

/**
 * Initializes the profile section by fetching profile data and updating the DOM.
 */
async function initializeProfile() {
 const name = localStorage.getItem("name");
 if (!name) {
  console.error("No user name found in local storage.");
  return;
 }

 const usernameElement = document.getElementById("username");
 const creditsElement = document.getElementById("total-credits");
 const avatarElement = document.getElementById("avatar-image");

 usernameElement.textContent = name;

 try {
  const profile = await fetcher(
   `${PROFILE_API_URL}/${name}`,
   { method: "GET" },
   true
  );

  creditsElement.textContent = profile.credits || "0";
  avatarElement.src =
   profile.avatar ||
   "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png";
 } catch (error) {
  console.error("Failed to load profile:", error);
  alert("Failed to load profile. Please try again later.");
 }
}

/**
 * Sets up the event listener for the update avatar button.
 */
function setupUpdateAvatarListener() {
 const updateAvatarButton = document.getElementById("submit-update-avatar");
 if (!updateAvatarButton) {
  console.error("Submit update avatar button not found.");
  return;
 }

 updateAvatarButton.addEventListener("click", async (event) => {
  event.preventDefault();
  const newAvatar = document.getElementById("update-media").value;
  const name = localStorage.getItem("name");

  if (!newAvatar) {
   alert("Please provide a new avatar URL.");
   return;
  }

  try {
   const response = await fetcher(
    `${PROFILE_API_URL}/${name}/media`,
    {
     method: "PUT",
     body: JSON.stringify({ avatar: newAvatar }),
    },
    true
   );

   if (response.errors) {
    alert(response.errors[0].message);
    return;
   }

   window.location.href = "/pages/profile";
  } catch (error) {
   console.error("Failed to update avatar:", error);
   alert("Failed to update avatar. Please try again later.");
  }
 });
}
