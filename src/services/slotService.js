import apiClient from "../api/apiClient";
import endpoints from "../api/endpoints";

export async function getSlotsByDoctor(doctorId) {
  const { data } = await apiClient.get(endpoints.slotsByDoctor(doctorId));
  return data;
}

export async function addSlot({ doctorId, date, time }) {
  const { data } = await apiClient.post(endpoints.slotsByDoctor(doctorId), { date, time });
  return data;
}

export async function blockSlot(id) {
  const { data } = await apiClient.patch(endpoints.slotById(id), { status: "blocked" });
  return data;
}
