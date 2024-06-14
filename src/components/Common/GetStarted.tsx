"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

const GetStartedButton = () => {
  const { data: session, status } = useSession();

  return (
    <div>
      {status === "authenticated" ? (
        <Link
          href="/audio-sentiment-analysis"
          className="inline-flex items-center justify-center rounded-md bg-white px-7 py-[14px] text-center text-base font-medium text-dark shadow-1 transition duration-300 ease-in-out hover:bg-gray-2"
        >
          Get Started Now
        </Link>
      ) : (
        <Link
          href="/signin"
          className="inline-flex items-center justify-center rounded-md bg-white px-7 py-[14px] text-center text-base font-medium text-dark shadow-1 transition duration-300 ease-in-out hover:bg-gray-2"
        >
          Sign In to Get Started
        </Link>
      )}
    </div>
  );
};

export default GetStartedButton;
