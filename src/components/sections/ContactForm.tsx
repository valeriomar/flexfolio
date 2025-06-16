"use client";

import { useState } from "react";
import { sendContactEmail } from "@/actions/sendContactEmail";
import clsx from "clsx";
import { toast } from "sonner";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const result = await sendContactEmail(formData);

    if (result.ok) {
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } else {
      toast.error("❌ Something went wrong. Please try again.");
    }

    setStatus("idle");
  };

  return (
    <div style={{ paddingInline: 20 }} className="font-[Poppins] max-sm:w-screen">
      <h3
        className="section-titles"
        style={{
          
          marginTop: 100,
          fontFamily: "Poppins",
          fontWeight: 800,
        }}
      >
        Contact me
      </h3>
      <div
        className={clsx(
          "relative flex flex-col overflow-hidden border w-xl max-sm:w-full border-white/1 backdrop-blur-xl",
          "bg-white/35 ",
          "p-6 sm:p-10 min-h-[300px] justify-between",
          "shadow-sm hover:shadow-lg transition-shadow duration-800 rounded-3xl"
        )}
      >
        <form
          onSubmit={handleSubmit}
          className="max-sm:w-max max-w-2xl mx-auto px-6 py-10 flex flex-col gap-6"
          style={{
            background: "var(--body-background)",
            color: "var(--text)",
            padding: 20,
          }}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-base font-semibold">
              Name
            </label>
            <input
              name="name"
              type="text"
              required
              placeholder="Your name"
              className="px-5 py-3 rounded-xl border border-neutral-400 bg-transparent outline-none "
              onChange={handleChange}
              value={formData.name}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-base font-semibold">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="your@email.com"
              className="px-5 py-3 rounded-xl border border-neutral-400 bg-transparent outline-none "
              onChange={handleChange}
              value={formData.email}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-base font-semibold">
              Message
            </label>
            <textarea
              name="message"
              rows={6}
              required
              placeholder="Write your message..."
              className="px-5 py-3 rounded-xl border border-neutral-400 bg-transparent outline-none resize-none"
              onChange={handleChange}
              value={formData.message}
            />
          </div>

          <button
            type="submit"
            className="text-white font-semibold transition-all"
            style={{
              borderColor: "var(--text)",
              border: "1px solid",
              paddingInline: 10,
              paddingBlock: 4,
              width: 170,
              borderRadius: 20,
              opacity: status === "loading" ? 0.6 : 1,
            }}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
