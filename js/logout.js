import { logout } from "/js/utils/local-storage.mjs";

const logoutButton = document.querySelector("#logout-button");

logoutButton.addEventListener("click", (e) => {
 e.preventDefault();
 logout();
});
