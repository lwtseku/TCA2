"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DescriptionPanel() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const description = searchParams.get("description");
  const [isOpen, setIsOpen] = useState(!!description || description === "");

  useEffect(() => {
    if (description !== null) {
      document.body.style.overflow = "hidden";
      setIsOpen(true);
    } else {
      document.body.style.overflow = "";
      setIsOpen(false);
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [description]);

  const closeModal = () => {
    router.back();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4"
      onClick={closeModal}
      aria-label="Close Description Modal"
    >
      <div
        className="bg-gray-50 text-white rounded-2xl shadow-xl p-8 max-w-2xl w-full relative border border-[#24ffa520]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="description-title"
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-5 text-3xl text-gray-400 hover:text-red-500 transition"
          aria-label="Close Description"
        >
          ×
        </button>
        <h2
          id="description-title"
          className="text-2xl font-bold mb-6 text-[#538bc0] text-center"
        >
          Хичээлийн агуулга
        </h2>

        {description?.trim() ? (
          <p className="whitespace-pre-line p-6 text-black leading-relaxed text-lg md:text-xl lg:text-2xl font-normal space-y-4">
            {description}
          </p>
        ) : (
          <p className="text-red-400 text-xl font-light text-center">
            Агуулга олдсонгүй
          </p>
        )}
      </div>
    </div>
  );
}
