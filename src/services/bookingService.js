import apiClient from "../api/apiClient";
import endpoints from "../api/endpoints";

// The check-slot / mark-booked / create-booking transaction now happens
// entirely on the backend (see BookingsService.create there) - the
// frontend just sends the slotId and trusts the response.
export async function createBooking({ slotId }) {
  const { data } = await apiClient.post(endpoints.bookings, { slotId });
  return data;
}

export async function getMyBookings() {
  const { data } = await apiClient.get(endpoints.myBookings);
  return data;
}

export async function getBookingsForProvider(providerId) {
  const { data } = await apiClient.get(endpoints.bookingsForProvider(providerId));
  return data;
}

export async function updateBookingStatus(id, status) {
  const { data } = await apiClient.patch(endpoints.bookingById(id), { status });
  return data;
}
