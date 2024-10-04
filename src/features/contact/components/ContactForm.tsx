"use client";

import React, { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setStatus("Message sent successfully");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("Faild to send message. Please try again.");
      }
    } catch (error) {
      setStatus("An error occurred. Please send again lator.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name">Name</label>
        <input
          className="border border-foreground raunded-md py-2 px-4"
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email">E-Mail</label>
        <input
          className="border border-foreground raunded-md py-2 px-4"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="message">Message</label>
        <textarea
          className="border border-foreground raunded-md py-2 px-4"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={4}
        ></textarea>
      </div>
      <button type="submit" className="bg-primary rounded-md text-white">
        Send Message
      </button>
    </form>
  );
}
