"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateInquiry } from "@/hooks/useInquiry";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone_number: z
    .string()
    .trim()
    .regex(/^[0-9]{10}$/, "Enter a valid 10-digit phone number"),
  email: z.string().trim().email("Enter a valid email").max(100),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm({
  defaultMessage = "",
}: {
  defaultMessage?: string;
}) {
  const [success, setSuccess] = useState(false);
  const createInquiry = useCreateInquiry();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone_number: "",
      email: "",
      message: defaultMessage,
    },
  });

  async function onSubmit(values: FormValues) {
    setSuccess(false);
    try {
      await createInquiry.mutateAsync(values);
      setSuccess(true);
      form.reset({ name: "", phone_number: "", email: "", message: "" });
      setTimeout(() => setSuccess(false), 4000);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Couldn’t send your message";
      form.setError("root", { message });
    }
  }

  const busy = form.formState.isSubmitting || createInquiry.isPending;

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4 rounded-xl border bg-white p-5 shadow-sm sm:p-6"
    >
      <div>
        <h3 className="text-lg font-semibold">Send a message</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          We’ll get back to you as soon as we can.
        </p>
      </div>

      {success && (
        <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          Message sent. Thank you!
        </p>
      )}
      {form.formState.errors.root && (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {form.formState.errors.root.message}
        </p>
      )}

      <div className="space-y-1.5">
        <label className="text-sm font-medium" htmlFor="name">
          Full name
        </label>
        <Input id="name" {...form.register("name")} placeholder="Your name" />
        {form.formState.errors.name && (
          <p className="text-xs text-destructive">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="phone">
            Phone
          </label>
          <Input
            id="phone"
            {...form.register("phone_number")}
            placeholder="10-digit number"
          />
          {form.formState.errors.phone_number && (
            <p className="text-xs text-destructive">
              {form.formState.errors.phone_number.message}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="email">
            Email
          </label>
          <Input
            id="email"
            type="email"
            {...form.register("email")}
            placeholder="you@example.com"
          />
          {form.formState.errors.email && (
            <p className="text-xs text-destructive">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium" htmlFor="message">
          Message
        </label>
        <Textarea
          id="message"
          rows={5}
          {...form.register("message")}
          placeholder="How can we help?"
        />
        {form.formState.errors.message && (
          <p className="text-xs text-destructive">
            {form.formState.errors.message.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={busy}>
        {busy ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send message"
        )}
      </Button>
    </form>
  );
}
