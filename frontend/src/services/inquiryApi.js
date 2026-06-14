import api from "./axios";

export const submitInquiry =
  async (formData) => {
    const response =
      await api.post(
        "/inquiries/",
        formData
      );

    return response.data;
  };