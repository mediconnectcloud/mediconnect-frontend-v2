import axios from "axios";

// The ONE place that knows how to talk to the real backend.
// Nothing else in the app should import axios directly - services/ call
// this instead. When the real API Gateway URL exists, set VITE_API_URL in
// .env and this file needs no other changes.
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attaches the logged-in user's identity to every request. Right now the
// backend has no real Cognito yet, so it reads plain x-user-id/x-user-role
// headers instead of a verified JWT - see the backend's RolesGuard. Once
// Cognito exists, this becomes just the Authorization header below, and
// the two x-user-* lines get deleted - nothing else in the app changes.
apiClient.interceptors.request.use((config) => {
  const token = window.sessionStorage.getItem("mediconnect_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const rawUser = window.sessionStorage.getItem("mediconnect_user");
  if (rawUser) {
    const user = JSON.parse(rawUser);
    config.headers["x-user-id"] = user.username;
    config.headers["x-user-role"] = user.role;
  }

  return config;
});

// Normalises errors so every service/page can rely on `error.message`
// being something sensible to show the user, instead of digging through
// axios's response shape everywhere.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.statusText ||
      error.message ||
      "Something went wrong. Please try again.";
    return Promise.reject(new Error(message));
  }
);

export default apiClient;
