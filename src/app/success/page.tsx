"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';

const SuccessPage = () => {
  const router = useRouter();

  const handleHomeRedirect = () => {
    router.push('/');
  };

  // Trigger confetti on page load
  useEffect(() => {
    const launchConfetti = () => {
      confetti({
        particleCount: 600,
        spread: 600,
        origin: { y: 0.1 },
      });
    };

    launchConfetti();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center gap-10 bg-white rounded-lg p-6 text-center">
        <h1 className="text-7xl font-semibold text-green-600 mb-4">SUCCESS!</h1>
        <p className="text-4xl text-gray-700 mb-6">
          Hey there! Crowdshaki team has been notified of your signup request. 
          You'll receive an email if your registration gets Approved or Rejected. 
          Stay tuned!
        </p>
        <button
          onClick={handleHomeRedirect}
          className="w-[200px] px-10 py-5 text-white bg-[#0D9488] rounded-md hover:bg-white hover:border-2 hover:border-[#0D9488] hover:text-[#0D9488]"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
