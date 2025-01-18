import { jwtDecode } from "jwt-decode"; // Use named import

export function isTokenExpired(token) {
  if (!token) return true;
  const decoded = jwtDecode(token); // Update function call
  const now = Date.now() / 1000; // Current time in seconds
  return decoded.exp < now; // Token is expired if expiration time is less than current time
}
