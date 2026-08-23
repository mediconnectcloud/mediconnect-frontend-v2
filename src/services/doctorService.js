import apiClient from "../api/apiClient";
import endpoints from "../api/endpoints";

export async function getDoctorsByProvider(providerId) {
  const { data } = await apiClient.get(endpoints.doctorsByProvider(providerId));
  return data;
}

export async function getDoctorById(id) {
  const { data } = await apiClient.get(endpoints.doctorById(id));
  return data;
}

export async function addDoctor({ providerId, name, specialization, fee }) {
  const { data } = await apiClient.post(endpoints.doctorsByProvider(providerId), {
    name,
    specialization,
    fee: Number(fee) || 0,
  });
  return data;
}

export async function removeDoctor(id) {
  await apiClient.delete(endpoints.doctorById(id));
  return { success: true };
}
