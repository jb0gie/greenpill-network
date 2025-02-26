"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-[#001810] text-[#80ffa0] pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-[#00ff80] mb-6 text-center">
            Contact Us
          </h1>
          <p className="text-lg mb-8 text-center">
            Have questions or want to get involved? We'd love to hear from you.
            Reach out to us using the form below.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[#00ff80] mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-[#00ff80]/5 border border-[#00ff80]/10 
                         text-[#80ffa0] focus:outline-none focus:ring-2 focus:ring-[#00ff80]/50"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#00ff80] mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-[#00ff80]/5 border border-[#00ff80]/10 
                         text-[#80ffa0] focus:outline-none focus:ring-2 focus:ring-[#00ff80]/50"
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-[#00ff80] mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-2 rounded-lg bg-[#00ff80]/5 border border-[#00ff80]/10 
                         text-[#80ffa0] focus:outline-none focus:ring-2 focus:ring-[#00ff80]/50"
                required
              ></textarea>
            </div>

            <div className="text-center">
              <Button
                type="submit"
                className="bg-[#00ff80] hover:bg-[#00ff80]/90 text-[#001810] font-medium rounded-full px-8 py-2"
              >
                Send Message
              </Button>
            </div>
          </form>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="bg-[#00ff80]/5 p-6 rounded-xl border border-[#00ff80]/10">
              <h3 className="text-xl font-semibold text-[#00ff80] mb-4">
                Email Us
              </h3>
              <p>info@greenpill.network</p>
            </div>

            <div className="bg-[#00ff80]/5 p-6 rounded-xl border border-[#00ff80]/10">
              <h3 className="text-xl font-semibold text-[#00ff80] mb-4">
                Follow Us
              </h3>
              <p>Stay connected on our social media channels</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 