// Import necessary modules and utilities
import { LOGIN_API_URL } from "/js/api/api-endpoints.mjs";
import { addToLocalStorage } from "/js/utils/local-storage.mjs";
import { fetcher } from "../../fetcher.js";
import { validateEmail, validatePassword } from "/js/utils/form-validation.mjs";

// Get references to the form and its input fields
const form = document.querySelector("#login-form");
const emailInput = document.querySelector("#form-email");
const passwordInput = document.querySelector("#form-password");

// Function to handle user login
async function loginUser(user) {
 try {
  const postBody = JSON.stringify(user);
  const userLoginData = await fetcher(LOGIN_API_URL, {
   method: "POST",
   body: postBody,
  });

  if (userLoginData.errors) {
   alert(userLoginData.errors[0].message);
   return;
  }

  const { accessToken, name, credits } = userLoginData;
  addToLocalStorage("accessToken", accessToken);
  addToLocalStorage("name", name);
  addToLocalStorage("credits", credits);

  console.log("Login successful, token saved:", accessToken); // Debugging log
  window.location.href = "/pages/listings/index.html";
 } catch (error) {
  console.error("Login request failed:", error); // Debugging log
  alert("Login request failed, please try again.");
 }
}

// Event listener for form submission
form.addEventListener("submit", async (event) => {
 event.preventDefault();

 const userLoginDetails = {
  email: emailInput.value,
  password: passwordInput.value,
 };

 if (!validateLoginForm(userLoginDetails)) {
  return;
 }

 await loginUser(userLoginDetails);
});

// Function to validate the login form inputs
function validateLoginForm(user) {
 if (!validateEmail(user.email)) {
  alert("Email must be of type @stud.noroff.no or @noroff.no");
  return false;
 }

 if (!validatePassword(user.password)) {
  alert("Password must be at least 8 characters");
  return false;
 }

 return true;
}
