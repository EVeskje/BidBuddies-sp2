export async function fetcher(
 url,
 options = { method: "GET" },
 useToken = false
) {
 // Set default headers
 const defaultHeaders = {
  "Content-Type": "application/json",
 };

 // If useToken is true, add Authorization header with the token
 if (useToken) {
  const token = localStorage.getItem("accessToken");
  if (!token) {
   console.error("No access token found in local storage");
   throw new Error("No access token found");
  }
  defaultHeaders.Authorization = `Bearer ${token}`;
 }

 // Merge default headers with any provided headers
 const config = {
  ...options,
  headers: {
   ...defaultHeaders,
   ...options.headers,
  },
 };

 // Debugging logs
 console.log("Fetching URL:", url, "with options:", config);

 try {
  // Make the API call
  const response = await fetch(url, config);

  // Check if the response is not ok
  if (!response.ok) {
   const errorMessage = await response.text();
   console.error("Error response from API:", response.status, errorMessage);
   throw new Error(`Error ${response.status}: ${errorMessage}`);
  }

  // Parse and return the JSON response
  return await response.json();
 } catch (error) {
  console.error("Error with API call:", error);
  throw error;
 }
}
