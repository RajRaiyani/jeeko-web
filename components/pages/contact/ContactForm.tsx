"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FiLoader, FiAlertCircle, FiCheckCircle, FiSend } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateInquiry, type CreateInquiryData } from "@/hooks/useInquiry";

const inquiryFormSchema = z.object({
  fullname: z
    .string()
    .min(1, "Full name is required")
    .max(100, "Full name cannot exceed 100 characters"),
  phonenumber: z
    .string()
    .min(1, "Phone number is required")
    .max(20, "Phone number cannot exceed 20 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(100, "Email cannot exceed 100 characters"),
  description: z
    .string()
    .min(1, "Message is required")
    .max(1000, "Message cannot exceed 1000 characters"),
});

type InquiryFormValues = z.infer<typeof inquiryFormSchema>;

interface ApiError {
  response?: {
    data?: {
      error?: string;
      details?: string | string[];
    };
    status?: number;
  };
  message?: string;
}

export function ContactForm() {
  const [formSuccess, setFormSuccess] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");

  const createInquiryMutation = useCreateInquiry();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquiryFormSchema),
    mode: "onChange",
    defaultValues: {
      fullname: "",
      phonenumber: "",
      email: "",
      description: "",
    },
  });

  const watchedDescription = watch("description");

  const handleInquirySubmit = async (data: InquiryFormValues) => {
    try {
      setFormError("");
      setFormSuccess(false);
      const submissionData: CreateInquiryData = {
        fullname: data.fullname.trim(),
        phonenumber: data.phonenumber.trim(),
        email: data.email.trim().toLowerCase(),
        description: data.description.trim(),
      };
      await createInquiryMutation.mutateAsync(submissionData);
      setFormSuccess(true);
      reset();
      setTimeout(() => setFormSuccess(false), 5000);
    } catch (error) {
      let errorMessage = "Unknown error occurred";
      const apiError = error as ApiError;
      if (apiError.response?.data?.error) {
        errorMessage = apiError.response.data.error;
      } else if (apiError.response?.data?.details) {
        errorMessage = Array.isArray(apiError.response.data.details)
          ? apiError.response.data.details.join(", ")
          : apiError.response.data.details;
      } else if (apiError.message) {
        errorMessage = apiError.message;
      }
      setFormError(errorMessage);
    }
  };

  const isSubmittingForm = isSubmitting || createInquiryMutation.isPending;

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg">
      <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 sm:mb-6">
        Send us a message
      </h2>

      {formSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-start">
          <FiCheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 shrink-0" />
          <div>
            <p className="text-green-800 font-medium">
              Message Sent Successfully!
            </p>
            <p className="text-green-700 text-sm mt-1">
              Thank you for contacting us. We&apos;ll get back to you soon!
            </p>
          </div>
        </div>
      )}

      {formError && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start">
          <FiAlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3 shrink-0" />
          <div>
            <p className="text-red-800 font-medium">Submission Failed</p>
            <p className="text-red-700 text-sm mt-1">{formError}</p>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit(handleInquirySubmit)}
        className="space-y-4 sm:space-y-6"
      >
        <div className="space-y-2">
          <label
            htmlFor="fullname"
            className="text-sm font-medium text-gray-700"
          >
            Full Name *
          </label>
          <Input
            {...register("fullname")}
            type="text"
            id="fullname"
            placeholder="Enter your full name"
            className={`w-full transition-all duration-200 ${
              errors.fullname
                ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500"
                : "focus:border-primary focus:ring-primary"
            }`}
            maxLength={100}
            disabled={isSubmittingForm}
          />
          {errors.fullname && (
            <p className="text-sm text-red-600 flex items-center mt-1">
              <FiAlertCircle className="w-4 h-4 mr-1" />
              {errors.fullname.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="phonenumber"
            className="text-sm font-medium text-gray-700"
          >
            Phone Number *
          </label>
          <Input
            {...register("phonenumber")}
            type="tel"
            id="phonenumber"
            placeholder="Enter your phone number"
            className={`w-full transition-all duration-200 ${
              errors.phonenumber
                ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500"
                : "focus:border-primary focus:ring-primary"
            }`}
            maxLength={20}
            disabled={isSubmittingForm}
          />
          {errors.phonenumber && (
            <p className="text-sm text-red-600 flex items-center mt-1">
              <FiAlertCircle className="w-4 h-4 mr-1" />
              {errors.phonenumber.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address *
          </label>
          <Input
            {...register("email")}
            type="email"
            id="email"
            placeholder="Enter your email address"
            className={`w-full transition-all duration-200 ${
              errors.email
                ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500"
                : "focus:border-primary focus:ring-primary"
            }`}
            maxLength={100}
            disabled={isSubmittingForm}
          />
          {errors.email && (
            <p className="text-sm text-red-600 flex items-center mt-1">
              <FiAlertCircle className="w-4 h-4 mr-1" />
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="description"
            className="text-sm font-medium text-gray-700"
          >
            Message *
          </label>
          <Textarea
            {...register("description")}
            id="description"
            placeholder="Tell us more about your inquiry. Please provide as much detail as possible so we can assist you better."
            className={`w-full min-h-[120px] transition-all duration-200 resize-none ${
              errors.description
                ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500"
                : "focus:border-primary focus:ring-primary"
            }`}
            rows={5}
            maxLength={1000}
            disabled={isSubmittingForm}
          />
          <div className="flex justify-between items-center">
            {errors.description ? (
              <p className="text-sm text-red-600 flex items-center">
                <FiAlertCircle className="w-4 h-4 mr-1" />
                {errors.description.message}
              </p>
            ) : (
              <p className="text-xs text-gray-500">
                Please provide detailed information to help us assist you better
              </p>
            )}
            <p className="text-xs text-gray-500">
              {watchedDescription?.length || 0}/1000
            </p>
          </div>
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            disabled={isSubmittingForm || !isValid || !isDirty}
            className={`w-full flex items-center justify-center py-3 px-6 text-base font-medium bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:opacity-75 text-white rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
              !isSubmittingForm && isValid && isDirty ? "hover:scale-[1.02]" : ""
            }`}
          >
            {isSubmittingForm ? (
              <>
                <FiLoader className="animate-spin -ml-1 mr-3 h-5 w-5" />
                Sending Message...
              </>
            ) : (
              <>
                <FiSend className="mr-3 h-5 w-5" />
                Send Message
              </>
            )}
          </Button>
        </div>

        <p className="text-xs text-gray-500 text-center pt-2">
          By submitting this form, you agree to our terms of service and privacy
          policy. We&apos;ll only use your information to respond to your
          inquiry.
        </p>
      </form>
    </div>
  );
}
