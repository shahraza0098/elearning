

"use client";
import React from "react";

export default function ClerkLayout({ children }) {
  return (
    <div className="min-h-screen w-full relative overflow-hidden flex flex-col items-center justify-center font-sans text-white bg-[#3545cc]">
      {/* Diagonal Background Split */}
      {/* Creates the sharp angled division between the lighter and darker blue */}
      <div
        className="absolute bottom-0 right-0 w-[150vw] h-[100vh] bg-[#2a36a7] origin-bottom-right"
        style={{ transform: "rotate(-12deg) translateY(20%)" }}
      />

      {/* Main Content Wrapper */}
      <div className="relative z-10 w-full flex flex-col items-center px-4 sm:px-6">
        
        {/* Main White Card Wrapper */}
        <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-gray-800">
          
          {/* Brand/Logo Area */}
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-extrabold text-[#3545cc]">
              Gyan Master
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Sign in or create your account
            </p>
          </div>

          {/* Clerk Auth Component */}
          {/* Wrapper to handle sizing and overflow */}
          <div className="w-full flex justify-center">
            {children}
          </div>
        </div>

        {/* Ratings & Badges Placeholder */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-sm font-semibold">
          {/* Capterra */}
          <div className="flex items-center gap-1.5">
            <span className="text-[#ff5a36] font-bold italic tracking-tighter">Capterra</span>
            <span className="text-yellow-400 text-lg leading-none translate-y-[-1px]">★★★★★</span>
            <span>4.6/5</span>
          </div>
          {/* GetApp */}
          <div className="flex items-center gap-1.5">
            <span className="text-[#00b2e3] font-bold">GetApp</span>
            <span className="text-yellow-400 text-lg leading-none translate-y-[-1px]">★★★★★</span>
            <span>4.6/5</span>
          </div>
        </div>
      </div>

      {/* Footer Copyright */}
      <div className="absolute bottom-4 sm:bottom-6 text-xs text-white/80 text-center w-full px-4 z-10">
        © 2025-2026 Gyan Master, Inc. All Rights Reserved.{" "}
        <a href="#" className="underline hover:text-white transition-colors">
          Privacy Policy
        </a>
      </div>

      {/* Floating Chat Button */}
      <button className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 bg-white text-gray-800 px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 text-sm font-semibold hover:bg-gray-50 transition-colors">
        {/* Simple CSS representation of a chat icon */}
        <div className="w-4 h-4 rounded bg-[#00b2e3] relative flex items-center justify-center">
           <div className="w-2 h-[2px] bg-white rounded-full"></div>
        </div>
        Chat
      </button>
    </div>
  );
}
