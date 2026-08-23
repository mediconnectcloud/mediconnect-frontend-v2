import apiClient from "../api/apiClient";
import endpoints from "../api/endpoints";

export async function getStats() {
  const { data } = await apiClient.get(endpoints.adminStats);
  return data;
}
