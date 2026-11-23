import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/services/api/httpServices";

export interface CreateInquiryData {
  name: string;
  phone_number: string;
  email: string;
  message: string;
}

export function useCreateInquiry() {
  return useMutation({
    mutationFn: (data: CreateInquiryData) =>
      axiosInstance.post("/inquiry", {
        name: data.name.trim(),
        phone_number: data.phone_number.trim(),
        email: data.email.trim().toLowerCase(),
        message: data.message.trim(),
      }),
  });
}
