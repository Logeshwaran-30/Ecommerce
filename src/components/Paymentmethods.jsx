import React, { useState } from 'react';

// List of payment methods
const paymentMethods = [
  {
    label: 'Credit card',
    value: 'credit-card',
    logo: 'https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/visa-logo.svg',
    active: true,
  },
  {
    label: 'PayPal',
    value: 'paypal',
    logo: 'https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/paypal-logo.svg',
    active: true,
  },
  {
    label: 'ApplePay',
    value: 'applepay',
    logo: 'https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/apple-pay-logo.svg',
    active: true,
  },
  {
    label: 'GooglePay',
    value: 'googlepay',
    logo: 'https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/google-pay-logo.svg',
    active: false,
  },
];

export default function Paymentmethods() {
  const [showDetails, setShowDetails] = useState(false);

  const handleButtonClick = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div>
      <h2 className="typography-headline-5 font-bold text-neutral-900 mb-4">Payment Methods</h2>
      <p className="text-neutral-600 mb-5">Select a payment method to complete your purchase. You can choose from various methods such as credit card, PayPal, Apple Pay, and Google Pay.</p>

      <button
        onClick={handleButtonClick}
        className="px-4 py-2 bg-primary-700 text-white rounded-md mb-4 hover:bg-primary-800"
      >
        {showDetails ? 'Hide Payment Method' : 'Show Payment Method'}
      </button>

      {showDetails && (
        <fieldset>
          <legend className="mb-4 typography-headline-5 font-bold text-neutral-900">Payment Method</legend>
          <div className="grid grid-cols-2 gap-4 items-stretch">
            {paymentMethods.map(({ label, value, logo, active }) => (
              <label key={value} className="relative">
                <input disabled={!active} type="radio" name="payment_method" value={value} className="peer sr-only" />
                <div className="h-full flex flex-col items-center justify-center py-7 px-4 cursor-pointer rounded-md border border-neutral-200 -outline-offset-2 hover:border-primary-200 hover:bg-primary-100 peer-focus:border-primary-200 peer-focus:bg-primary-100 active:border-primary-300 active:bg-primary-200 peer-checked:outline peer-checked:outline-2 peer-checked:outline-primary-700 peer-disabled:opacity-50 peer-disabled:bg-neutral-100 peer-disabled:border-neutral-200 peer-disabled:cursor-not-allowed peer-disabled:[&_img]:grayscale">
                  <img src={logo} alt={label} className="h-6 select-none" />
                  {!active && (
                    <p className="absolute bottom-2 select-none text-disabled-900 typography-text-xs">Coming soon</p>
                  )}
                </div>
              </label>
            ))}
          </div>
        </fieldset>
      )}
    </div>
  );
}
