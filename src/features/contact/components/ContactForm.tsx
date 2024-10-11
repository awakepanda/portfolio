"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

type FormInputs = {
  name: string;
  email: string;
  message: string;
  topics: "FRONTEND" | "DESIGN" | "OTHER";
};

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    if (!isChecked) {
      setErrorMessage("利用規約に同意してください。");
      return;
    }
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const errorData = await response.json();
        setErrorMessage(
          errorData.error ||
            "メッセージの送信に失敗しました。もう一度お試しください。",
        );
      }
    } catch (error) {
      setErrorMessage("エラーが発生しました。後でもう一度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  if (isSubmitted) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-pc-[80] px-pc-[40] bg-accent rounded-pc-[24] text-white font-notosansjp"
        >
          <h2 className="text-pc-[24] mb-pc-[24]">
            お問い合わせありがとうございます
          </h2>
          <p className="text-pc-[18] mb-pc-[8]">
            内容を確認の上、後ほどご連絡させていただきます。
          </p>
          <p className="text-pc-[12]">
            別のお問い合わせをする場合は、ページを更新してください。
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-y-auto overflow-x-hidden hide-scrollbar">
      <form onSubmit={handleSubmit(onSubmit)} className="relative">
        {/* Topics selection */}
        <div className="mb-pc-[18]">
          <h2 className="flex flex-col mb-pc-[16] text-primary">
            <span className="font-notosansjp text-pc-[12] before:content-['01'] before:font-inter before:text-pc-[8] before:mr-pc-[4]">
              トピックを選択*
            </span>
            <em className="text-pc-[20]">SELECT TOPIC</em>
          </h2>
          <div className="flex gap-4">
            {["FRONTEND", "DESIGN", "OTHER"].map((topic) => (
              <div key={topic} className="relative">
                <label className="flex justify-center items-center cursor-pointer gap-pc-[8]">
                  <input
                    type="radio"
                    value={topic}
                    {...register("topics", {
                      required: "トピックを選択してください",
                    })}
                    className="peer w-pc-[28] h-pc-[28] appearance-none rounded-full bg-muted"
                  />
                  <span className="absolute top-1/2 l-pc-[12] -translate-y-1/2 bg-foreground w-pc-[4] h-pc-[4] rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200"></span>
                  <div className="flex flex-col text-primary">
                    <span className="font-notosansjp text-pc-[10]">
                      {topic === "FRONTEND"
                        ? "フロントエンド"
                        : topic === "DESIGN"
                          ? "デザイン"
                          : "その他"}
                    </span>
                    <em className="leading-none text-pc-[16]">{topic}</em>
                  </div>
                </label>
              </div>
            ))}
          </div>
          {errors.topics && (
            <p className="text-red-500 mt-1">{errors.topics.message}</p>
          )}
        </div>

        {/* Name input */}
        <div className="mb-pc-[18]">
          <h2 className="flex flex-col mb-pc-[16] text-primary">
            <span className="font-notosansjp text-pc-[12] before:content-['02'] before:font-inter before:text-pc-[8] before:mr-pc-[4]">
              お名前*
            </span>
            <em className="text-pc-[20]">NAME</em>
          </h2>
          <input
            id="name"
            autoComplete="name"
            className="appearance-none focus:outline-none bg-muted w-full text-foreground rounded-pc-[8] py-pc-[16] px-pc-[24] text-pc-[16]"
            {...register("name", { required: "お名前を入力してください" })}
          />
          {errors.name && (
            <p className="text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email input */}
        <div className="mb-pc-[18]">
          <h2 className="flex flex-col mb-pc-[16] text-primary">
            <span className="font-notosansjp text-pc-[12] before:content-['03'] before:font-inter before:text-pc-[8] before:mr-pc-[4]">
              メールアドレス*
            </span>
            <em className="text-pc-[20]">E-MAIL</em>
          </h2>
          <input
            id="email"
            autoComplete="email"
            className="appearance-none focus:outline-none bg-muted w-full text-foreground rounded-pc-[8] py-pc-[16] px-pc-[24] text-pc-[16]"
            {...register("email", {
              required: "メールアドレスを入力してください",
            })}
          />
          {errors.email && (
            <p className="text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Message textarea */}
        <div className="mb-pc-[18]">
          <h2 className="flex flex-col mb-pc-[16] text-primary">
            <span className="font-notosansjp text-pc-[12] before:content-['04'] before:font-inter before:text-pc-[8] before:mr-pc-[4]">
              メッセージ*
            </span>
            <em className="text-pc-[20]">LEAVE A MESSAGE</em>
          </h2>
          <textarea
            id="message"
            className="appearance-none focus:outline-none bg-muted w-full text-foreground rounded-pc-[8] py-pc-[16] px-pc-[24] text-pc-[16]"
            {...register("message", {
              required: "メッセージを入力してください",
            })}
          ></textarea>
          {errors.message && (
            <p className="text-red-500 mt-1">{errors.message.message}</p>
          )}
        </div>

        {/* Terms agreement checkbox */}
        <div className="mb-pc-[20] flex items-center justify-center gap-pc-[6]">
          <div className="relative w-pc-[18] h-pc-[18]">
            <input
              type="checkbox"
              id="agree"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              className="appearance-none peer bg-muted rounded-pc-[4] w-pc-[18] lg:h-pc-[18]"
            />
            <div className="peer-checked:before:content-[''] peer-checked:before:absolute peer-checked:before:border-foreground peer-checked:before:rounded-sm peer-checked:before:rotate-[40deg] peer-checked:before:t-pc-[2] peer-checked:before:l-pc-[5] peer-checked:before:w-pc-[7] peer-checked:before:h-pc-[12] peer-checked:before:border-b peer-checked:before:border-r peer-checked:before:border-b-[3px] peer-checked:before:border-r-[3px]"></div>
          </div>
          <label
            className="text-primary font-notosansjp text-sp-[14] md:text-tablet-[14] lg:text-pc-[14]"
            htmlFor="agree"
          >
            <button type="button" onClick={toggleModal} className="underline">
              利用規約に同意する
            </button>
          </label>
        </div>

        {/* Error message */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-pc-[20] text-red-600 bg-red-100 p-3 rounded text-center"
            >
              {errorMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-primary rounded-full text-white py-pc-[18] px-pc-[64] ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "送信中..." : "送信する"}
          </button>
        </div>

        {/* Terms of service modal */}
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
                  <h2 className="text-center mb-6 text-lg font-bold">
                    利用規約
                  </h2>
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
    </div>
  );
}
