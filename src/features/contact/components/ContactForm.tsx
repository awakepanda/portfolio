"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import CheckMark from "../icons/CheckMark";

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
          className="text-center bg-accent text-white font-notosansjp py-sp-[30] px-sp-[20] rounded-sp-[16] :py-sp-[80] md:px-tablet-[40] md:rounded-tablet-[24] lg:py-pc-[80] lg:px-pc-[40] lg:rounded-pc-[24]"
        >
          <h2 className="text-sp-[18] mb-sp-[8] md:text-tablet-[24] md:mb-tablet-[24] lg:text-pc-[24] lg:mb-pc-[24]">
            お問い合わせ
            <br className="block md:hidden" />
            ありがとうございます
          </h2>
          <p className="text-sp-[14] mb-sp-[6] md:text-tablet-[18] md:mb-tablet-[8] lg:text-pc-[18] lg:mb-pc-[8]">
            内容を確認の上、
            <br className="block md:hidden" />
            後ほどご連絡させていただきます。
          </p>
          <p className="text-sp-[10] text-tablet-[12] lg:text-pc-[12]">
            別のお問い合わせをする場合は、
            <br className="block md:hidden" />
            ページを更新してください。
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-y-auto overflow-x-hidden hide-scrollbar">
      <form onSubmit={handleSubmit(onSubmit)} className="relative">
        <div className="mb-sp-[18] md:mb-tablet-[18] lg:mb-pc-[18]">
          <h2 className="flex flex-col text-primary mb-sp-[12] md:mb-tablet-[16] lg:mb-pc-[16]">
            <span className="font-notosansjp before:content-['01'] before:font-inter text-sp-[10] :before:text-sp-[6] before:mr-sp-[4] md:text-tablet-[12] md:before:text-tablet-[8] md:before:mr-tablet-[4] lg:text-pc-[12] lg:before:text-pc-[8] lg:before:mr-pc-[4]">
              トピックを選択*
            </span>
            <em className="text-sp-[16] md:text-tablet-[20] lg:text-pc-[20]">
              SELECT TOPIC
            </em>
          </h2>
          <div className="flex flex-col items-start gap-sp-[24] md:flex-row md:gap-tablet-[16] lg:gap-pc-[16]">
            {["FRONTEND", "DESIGN", "OTHER"].map((topic) => (
              <div key={topic} className="relative">
                <label className="flex justify-center items-center cursor-pointer gap-sp-[6] md:gap-tablet-[8] lg:gap-pc-[8]">
                  <input
                    type="radio"
                    value={topic}
                    {...register("topics", {
                      required: "トピックを選択してください",
                    })}
                    className="peer appearance-none rounded-full bg-muted w-sp-[28] h-sp-[28] md:w-tablet-[28] md:h-tablet-[28] lg:w-pc-[28] lg:h-pc-[28]"
                  />
                  <span className="absolute top-1/2 -translate-y-1/2 bg-foreground rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 l-sp-[12] w-sp-[4] h-sp-[4] md:l-tablet-[12] md:w-tablet-[4] md:h-tablet-[4] lg:l-pc-[12] lg:w-pc-[4] lg:h-pc-[4]"></span>
                  <div className="flex flex-col text-primary">
                    <span className="font-notosansjp text-sp-[8] md:text-tablet-[10] lg:text-pc-[10]">
                      {topic === "FRONTEND"
                        ? "フロントエンド"
                        : topic === "DESIGN"
                          ? "デザイン"
                          : "その他"}
                    </span>
                    <em className="leading-none text-sp-[14] md:text-tablet-[16] lg:text-pc-[16]">
                      {topic}
                    </em>
                  </div>
                </label>
              </div>
            ))}
          </div>
          {errors.topics && (
            <p className="text-red-500 text-sp-[10] mt-sp-[10] md:text-tablet-[12] md:mt-tablet-[10] lg:text-pc-[12] lg:mt-pc-[10]">
              {errors.topics.message}
            </p>
          )}
        </div>

        {/* Name input */}
        <div className="mb-sp-[16] md:mb-tablet-[18] lg:mb-pc-[18]">
          <h2 className="flex flex-col text-primary mb-sp-[10] md:mb-tablet-[16] lg:mb-pc-[16]">
            <span className="font-notosansjp before:content-['02'] before:font-inter text-sp-[10] :before:text-sp-[6] before:mr-sp-[4] md:text-tablet-[12] md:before:text-tablet-[8] md:before:mr-tablet-[4] lg:text-pc-[12] lg:before:text-pc-[8] lg:before:mr-pc-[4]">
              お名前*
            </span>
            <em className="text-sp-[16] md:text-tablet-[20] lg:text-pc-[20]">
              NAME
            </em>
          </h2>
          <input
            id="name"
            autoComplete="name"
            className="appearance-none focus:outline-none bg-muted w-full text-foreground rounded-sp-[6] py-sp-[12] px-sp-[16] text-sp-[14] md:rounded-tablet-[8] md:py-tablet-[16] md:px-tablet-[24] md:text-tablet-[16] lg:rounded-pc-[8] lg:py-pc-[16] lg:px-pc-[24] lg:text-pc-[16]"
            {...register("name", { required: "お名前を入力してください" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sp-[10] mt-sp-[10] md:text-tablet-[12] md:mt-tablet-[10] lg:text-pc-[12] lg:mt-pc-[10]">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email input */}
        <div className="mb-sp-[16] md:mb-tablet-[18] lg:mb-pc-[18]">
          <h2 className="flex flex-col text-primary mb-sp-[10] md:mb-tablet-[16] lg:mb-pc-[16]">
            <span className="font-notosansjp before:content-['03'] before:font-inter text-sp-[10] :before:text-sp-[6] before:mr-sp-[4] md:text-tablet-[12] md:before:text-tablet-[8] md:before:mr-tablet-[4] lg:text-pc-[12] lg:before:text-pc-[8] lg:before:mr-pc-[4]">
              メールアドレス*
            </span>
            <em className="text-sp-[16] md:text-tablet-[20] lg:text-pc-[20]">
              E-MAIL
            </em>
          </h2>
          <input
            id="email"
            autoComplete="email"
            className="appearance-none focus:outline-none bg-muted w-full text-foreground rounded-sp-[6] py-sp-[12] px-sp-[16] text-sp-[14] md:rounded-tablet-[8] md:py-tablet-[16] md:px-tablet-[24] md:text-tablet-[16] lg:rounded-pc-[8] lg:py-pc-[16] lg:px-pc-[24] lg:text-pc-[16]"
            {...register("email", {
              required: "メールアドレスを入力してください",
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sp-[10] mt-sp-[10] md:text-tablet-[12] md:mt-tablet-[10] lg:text-pc-[12] lg:mt-pc-[10]">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Message textarea */}
        <div className="mb-sp-[16] md:mb-tablet-[18] lg:mb-pc-[18]">
          <h2 className="flex flex-col text-primary mb-sp-[10] md:mb-tablet-[16] lg:mb-pc-[16]">
            <span className="font-notosansjp before:content-['04'] before:font-inter text-sp-[10] :before:text-sp-[6] before:mr-sp-[4] md:text-tablet-[12] md:before:text-tablet-[8] md:before:mr-tablet-[4] lg:text-pc-[12] lg:before:text-pc-[8] lg:before:mr-pc-[4]">
              メッセージ*
            </span>
            <em className="text-sp-[16] md:text-tablet-[20] lg:text-pc-[20]">
              LEAVE A MESSAGE
            </em>
          </h2>
          <textarea
            id="message"
            className="appearance-none focus:outline-none bg-muted w-full text-foreground rounded-sp-[6] py-sp-[12] px-sp-[16] text-sp-[14] md:rounded-tablet-[8] md:py-tablet-[16] md:px-tablet-[24] md:text-tablet-[16] lg:rounded-pc-[8] lg:py-pc-[16] lg:px-pc-[24] lg:text-pc-[16]"
            rows={5}
            {...register("message", {
              required: "メッセージを入力してください",
            })}
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-sp-[10] mt-sp-[10] md:text-tablet-[12] md:mt-tablet-[10] lg:text-pc-[12] lg:mt-pc-[10]">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Terms agreement checkbox */}
        <div className="flex items-center justify-center mb-sp-[24] gap-sp-[10] md:mb-tablet-[20] md:gap-tablet-[10] lg:mb-pc-[20] lg:gap-pc-[10]">
          <div>
            <label
              className="flex justify-center items-center gap-sp-[8] md:gap-tablet-[12] lg:gap-pc-[12]"
              htmlFor="agree"
            >
              <div className="relative flex justify-center items-center flex-shiring-0 w-sp-[20] h-sp-[20] md:w-tablet-[20] md:h-tablet-[20] lg:w-pc-[20] lg:h-pc-[20]">
                <input
                  type="checkbox"
                  id="agree"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                  className="sr-only peer z-50"
                />
                <div className="absolute top-0 left-0 bg-muted w-full h-full rounded-sp-[4]  md:rounded-tablet-[4] lg:rounded-pc-[4]"></div>
                <div className="relative opacity-0 peer-checked:opacity-100 cursor-pointer w-sp-[9] md:w-tablet-[9] lg:w-pc-[9]">
                  <CheckMark />
                </div>
              </div>
              <button
                type="button"
                onClick={toggleModal}
                className="underline text-primary text-sp-[14] md:text-tablet-[18] lg:text-pc-[18]"
              >
                利用規約に同意する
              </button>
            </label>
          </div>
        </div>

        {/* Error message */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-red-600 bg-red-100 rounded text-center p-sp-[6] mb-sp-[16] text-sp-[14] md:p-tablet-[6] md:mb-tablet-[20] md:text-tablet-[16] lg:p-pc-[6] lg:mb-pc-[20] lg:text-pc-[16]"
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
            className={`bg-primary rounded-full text-white text-sp-[14] py-sp-[8] px-sp-[64] md:text-tablet-[18] md:py-tablet-[18] md:px-tablet-[64] lg:text-pc-[18] lg:py-pc-[18] lg:px-pc-[64] ${
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
                className="bg-white  shadow-2xl text-primary font-notosansjp overflow-y-auto w-4/5 max-h-[80vh] rounded-sp-[24] md:w-3/4 md:rounded-tablet-[32] lg:w-3/3 lg:rounded-pc-[32]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative px-sp-[20] py-sp-[40] md:px-tablet-[60] md:py-tablet-[100] lg:px-pc-[92] lg:py-pc-[116]">
                  <button
                    className="absolute top-[3.6%] right-[1.8%] leading-none text-sp-[18] md:text-tablet-[24] lg:text-pc-[24]"
                    onClick={toggleModal}
                  >
                    ×
                  </button>
                  <h2 className="text-center text-sp-[18] mb-sp-[8] md:text-tablet-[24] md:mb-tablet-[32] lg:text-pc-[24] lg:mb-pc-[32]">
                    利用規約
                  </h2>
                  <ol className="flex flex-col list-decimal pl-sp-[12] gap-sp-[14] text-sp-[12] md:pl-tablet-[16] md:gap-tablet-[24] md:text-tablet-[16] lg:pl-pc-[16] lg:gap-pc-[24] lg:text-pc-[16]">
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
