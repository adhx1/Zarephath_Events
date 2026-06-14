import api from "./axios";

export const getTestimonials = async () => {
  const response = await api.get(
    "/testimonials/"
  );

  return response.data;
};