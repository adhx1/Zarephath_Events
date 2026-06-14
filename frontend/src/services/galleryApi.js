import api from "./axios";

export const getGallery = async () => {
  const response = await api.get("/gallery/");
  return response.data;
};

export const getGalleryByService = async (
  slug
) => {
  const response = await api.get(
    `/gallery/service/${slug}/`
  );

  return response.data;
};