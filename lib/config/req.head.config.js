import Cookies from "js-cookie";

const token = Cookies.get("token");
console.log("Token from cookies:", token);

if (!token || typeof token !== "string") {
  console.log("No valid auth token found in cookies");
} else {
  console.log("Valid auth token found", token);
}

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export default config;
