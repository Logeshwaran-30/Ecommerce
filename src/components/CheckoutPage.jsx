import React, { useState } from 'react';
import { SfRadio, SfListItem } from '@storefront-ui/react';

// ✅ Delivery Options
const deliveryOptions = [
  { name: 'Standard', cost: 'Free', date: 'Thursday, September 15' },
  { name: 'Express', cost: '$5.00', date: 'Tomorrow, September 12' },
];

// ✅ Payment Methods
const paymentMethods = [
  {
    label: 'Credit Card',
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

const CheckoutPage = () => {
  const [openSection, setOpenSection] = useState('contact');
  const [checkedDelivery, setCheckedDelivery] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingZip: '',
    shippingAddress: '',
    shippingCity: '',
    shippingState: '',
    shippingZip: '',
  });

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    console.log('Order Confirmed ✅', {
      formData,
      delivery: checkedDelivery,
      payment: selectedPayment,
    });
    alert('Order Placed Successfully!');
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 rounded-xl shadow-md mt-10 mb-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">🛒 Checkout</h1>

      {/* ================= CONTACT INFO ================= */}
      <section className="mb-8 border-b pb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-semibold">Contact Information</h2>
          <button
            type="button"
            className="text-blue-600 hover:underline"
            onClick={() => toggleSection('contact')}
          >
            {openSection === 'contact' ? 'Hide' : 'Edit'}
          </button>
        </div>

        {openSection === 'contact' && (
          <div className="grid md:grid-cols-2 gap-4">
            {['name', 'email', 'phone'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {field}
                </label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================= BILLING INFO ================= */}
      <section className="mb-8 border-b pb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-semibold">Billing Address</h2>
          <button
            type="button"
            className="text-blue-600 hover:underline"
            onClick={() => toggleSection('billing')}
          >
            {openSection === 'billing' ? 'Hide' : 'Edit'}
          </button>
        </div>

        {openSection === 'billing' && (
          <div className="grid md:grid-cols-2 gap-4">
            {['billingAddress', 'billingCity', 'billingState', 'billingZip'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {field.replace('billing', '')}
                </label>
                <input
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================= SHIPPING INFO ================= */}
      <section className="mb-8 border-b pb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-semibold">Shipping Address</h2>
          <button
            type="button"
            className="text-blue-600 hover:underline"
            onClick={() => toggleSection('shipping')}
          >
            {openSection === 'shipping' ? 'Hide' : 'Edit'}
          </button>
        </div>

        {openSection === 'shipping' && (
          <div className="grid md:grid-cols-2 gap-4">
            {['shippingAddress', 'shippingCity', 'shippingState', 'shippingZip'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {field.replace('shipping', '')}
                </label>
                <input
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================= DELIVERY OPTIONS ================= */}
      <section className="mb-8 border-b pb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-semibold">Delivery Options</h2>
          <button
            type="button"
            className="text-blue-600 hover:underline"
            onClick={() => toggleSection('delivery')}
          >
            {openSection === 'delivery' ? 'Hide' : 'Select'}
          </button>
        </div>

        {openSection === 'delivery' && (
          <div className="grid gap-3">
            {deliveryOptions.map(({ name, cost, date }) => (
              <SfListItem
                as="label"
                key={name}
                slotPrefix={
                  <SfRadio
                    name="delivery"
                    value={name}
                    checked={checkedDelivery === name}
                    onChange={(e) => setCheckedDelivery(e.target.value)}
                  />
                }
                slotSuffix={<span className="text-gray-800">{cost}</span>}
                className="!items-start border rounded-md p-3"
              >
                {name}
                <span className="text-xs text-gray-500">{date}</span>
              </SfListItem>
            ))}
          </div>
        )}
      </section>

      {/* ================= PAYMENT METHODS ================= */}
      <section className="mb-8 border-b pb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-semibold">Payment Methods</h2>
          <button
            type="button"
            className="text-blue-600 hover:underline"
            onClick={() => toggleSection('payment')}
          >
            {openSection === 'payment' ? 'Hide' : 'Select'}
          </button>
        </div>

        {openSection === 'payment' && (
          <div className="grid grid-cols-2 gap-4">
            {paymentMethods.map(({ label, value, logo, active }) => (
              <label key={value} className="relative">
                <input
                  disabled={!active}
                  type="radio"
                  name="payment_method"
                  value={value}
                  checked={selectedPayment === value}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  className="peer sr-only"
                />
                <div className="flex flex-col items-center justify-center border rounded-md p-5 hover:bg-blue-50 cursor-pointer peer-checked:outline peer-checked:outline-2 peer-checked:outline-blue-500">
                  <img src={logo} alt={label} className="h-6 mb-2" />
                  <span className="text-sm font-medium">{label}</span>
                  {!active && (
                    <p className="absolute bottom-1 text-xs text-gray-400">Coming soon</p>
                  )}
                </div>
              </label>
            ))}
          </div>
        )}
      </section>

      {/* ================= SUBMIT BUTTON ================= */}
      <div className="text-center mt-10">
        <button
          onClick={handlePlaceOrder}
          className="px-8 py-3 bg-green-700 text-white font-semibold rounded-md hover:bg-green-800 transition"
        >
          Place Order & Pay
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
