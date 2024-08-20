import { getFromLocalStorage } from "./local-storage.mjs";

/**
 * Validates if an email belongs to the Noroff domain.
 * @param {string} email - The email to validate.
 * @returns {boolean} True if the email is valid, otherwise false.
 */
export function validateEmail(email) {
 const emailRegex = /^[\w\-.]+@(stud\.)?noroff.no$/;
 return emailRegex.test(email);
}

/**
 * Validates if a password meets the minimum length requirement.
 * @param {string} password - The password to validate.
 * @returns {boolean} True if the password is valid, otherwise false.
 */
export function validatePassword(password) {
 const MIN_PASSWORD_LENGTH = 8;
 return password.length >= MIN_PASSWORD_LENGTH;
}

/**
 * Validates if a bid is a non-negative integer.
 * @param {number} bid - The bid amount to validate.
 * @returns {boolean} True if the bid is valid, otherwise false.
 */
export function validateBid(bid) {
 if (bid < 0) {
  return false;
 }
 const numberRegex = /^\d+$/;
 return numberRegex.test(bid);
}
