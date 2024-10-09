"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

type FormInputs = {
  name: string;
  email: string;
  message: string;
  category: "FRONTEND" | "DESIGN" | "OTHER";
};

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();
  const [status, setStatus] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    if (!isChecked) {
      setStatus("Please agree to the terms of service.");
      return;
    }
    setStatus("Sending...");
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setStatus("Message sent successfully");
        reset();
        setIsChecked(false);
      } else {
        setStatus("Failed to send message. Please try again.");
      }
    } catch (error) {
      setStatus("An error occurred. Please send again later.");
    }
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative">
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2">
          Name
        </label>
        <input
          id="name"
          className="border border-foreground rounded-md py-2 px-4 w-full"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <p className="text-red-500 mt-1">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block mb-2">
          E-Mail
        </label>
        <input
          id="email"
          className="border border-foreground rounded-md py-2 px-4 w-full"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="message" className="block mb-2">
          Message
        </label>
        <textarea
          id="message"
          className="border border-foreground rounded-md py-2 px-4 w-full"
          {...register("message", { required: "Message is required" })}
          rows={4}
        ></textarea>
        {errors.message && (
          <p className="text-red-500 mt-1">{errors.message.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2">Category</label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="FRONTEND"
              {...register("category", {
                required: "Please select a category",
              })}
              className="mr-2"
            />
            FRONTEND
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="DESIGN"
              {...register("category", {
                required: "Please select a category",
              })}
              className="mr-2"
            />
            DESIGN
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="OTHER"
              {...register("category", {
                required: "Please select a category",
              })}
              className="mr-2"
            />
            OTHER
          </label>
        </div>
        {errors.category && (
          <p className="text-red-500 mt-1">{errors.category.message}</p>
        )}
      </div>

      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="agree"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          className="mr-2"
        />
        <label htmlFor="agree">
          <span className="mr-1">I agree to the</span>
          <button
            type="button"
            onClick={toggleModal}
            className="text-blue-500 underline"
          >
            terms of service
          </button>
        </label>
      </div>

      <button
        type="submit"
        className="bg-primary rounded-md text-white py-2 px-4"
      >
        Send Message
      </button>

      {status && <p className="mt-4">{status}</p>}

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={toggleModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-2/3 shadow-2xl text-primary font-notosansjp rounded-[32px] max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative px-10 py-16">
                <button
                  className="absolute top-4 right-4 text-2xl"
                  onClick={toggleModal}
                >
                  ×
                </button>
                <h2 className="text-center mb-6 text-lg font-bold">利用規約</h2>
                <ol className="flex flex-col gap-4 text-sm list-decimal pl-8">
                  <li>
                    個人情報の取り扱い：当社は、お客様から提供された個人情報を厳重に管理し、お問い合わせへの回答およびサービス改善の目的以外には使用いたしません。
                  </li>
                  <li>
                    情報の第三者提供：お客様の同意なしに、個人情報を第三者に提供することはありません。
                  </li>
                  <li>
                    セキュリティ：当社は、お客様の個人情報を保護するために適切なセキュリティ対策を講じています。
                  </li>
                  <li>
                    情報の訂正・削除：お客様は、提供した個人情報の訂正または削除を要求する権利を有します。
                  </li>
                  <li>
                    規約の変更：当社は、必要に応じて本規約を変更することがあります。変更後の規約は、ウェブサイト上に掲載した時点で効力を生じるものとします。
                  </li>
                </ol>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
