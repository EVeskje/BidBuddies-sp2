/**
 * Adds a key-value pair to localStorage.
 * @param {string} key - The key under which the value will be stored.
 * @param {string} value - The value to store.
 */
export function addToLocalStorage(key, value) {
 localStorage.setItem(key, value);
}

/**
 * Retrieves a value from localStorage by its key.
 * @param {string} key - The key of the value to retrieve.
 * @returns {string|null} The value associated with the key, or null if the key doesn't exist.
 */
export function getFromLocalStorage(key) {
 return localStorage.getItem(key);
}

/**
 * Logs out the user by removing the access token from localStorage
 * and redirecting to the homepage.
 */
export function logout() {
 localStorage.removeItem("accessToken");
 window.location.href = "/index.html";
}
