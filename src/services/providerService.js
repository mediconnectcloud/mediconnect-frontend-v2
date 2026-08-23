import apiClient from "../api/apiClient";
import endpoints from "../api/endpoints";

export async function getProviders({ city = "", query = "" } = {}) {
  const { data } = await apiClient.get(endpoints.providers, {
    params: { city: city || undefined, query: query || undefined },
  });
  return data;
}

export async function getProviderById(id) {
  const { data } = await apiClient.get(endpoints.providerById(id));
  return data;
}

export async function getPendingProviders() {
  const { data } = await apiClient.get(endpoints.adminPendingProviders);
  return data;
}

export async function setProviderStatus(id, status) {
  const { data } = await apiClient.patch(endpoints.providerById(id), { status });
  return data;
}
