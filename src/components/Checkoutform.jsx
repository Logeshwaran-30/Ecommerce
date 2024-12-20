import React, { useState } from 'react';

const Checkoutform = () => {
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
    shippingZip: ''
  });

  // Track which section is open
  const [openSection, setOpenSection] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted', formData);
  };

  const toggleSection = (section) => {
    if (openSection === section) {
      setOpenSection(null); // Close section if it's already open
    } else {
      setOpenSection(section); // Open the selected section
    }
  };

  return (
    <div className="max-w-4xl ml-5">
      <h2 className="text-3xl font-bold text-mt-8 mb-5">Checkout Form</h2>
      <form onSubmit={handleSubmit}>
        
        {/* Contact Information Section */}
        <div className="mb-6">
          <h3 className="text-3xl font-semibold mb-2">Contact Information</h3>
          <p className="text-sm text-black mb-4">
            Add your email and phone number to communicate with the store.
          </p>
          <button
            type="button"
            onClick={() => toggleSection('contactInfo')}
            className="w-50px text-center py-2 px-4 border rounded-md bg-green-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {openSection === 'contactInfo' ? 'Hide Contact Information' : 'Add Contact Information'}
          </button>
          {openSection === 'contactInfo' && (
            <div className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Billing Address Section */}
        <div className="mb-6">
          <h3 className="text-3xl font-semibold mb-2">Billing Address</h3>
          <p className="text-sm text-black mb-4">
            Add a billing address. You will receive the invoice to the email address provided above.
          </p>
          <button
            type="button"
            onClick={() => toggleSection('billingAddress')}
            className="w-50px text-center py-2 px-4 border rounded-md bg-green-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {openSection === 'billingAddress' ? 'Hide Billing Information' : 'Add Billing Information'}
          </button>
          {openSection === 'billingAddress' && (
            <div className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    id="billingAddress"
                    name="billingAddress"
                    value={formData.billingAddress}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="billingCity" className="block text-sm font-medium text-gray-700">City</label>
                  <input
                    type="text"
                    id="billingCity"
                    name="billingCity"
                    value={formData.billingCity}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="billingState" className="block text-sm font-medium text-gray-700">State</label>
                  <input
                    type="text"
                    id="billingState"
                    name="billingState"
                    value={formData.billingState}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="billingZip" className="block text-sm font-medium text-gray-700">ZIP Code</label>
                  <input
                    type="text"
                    id="billingZip"
                    name="billingZip"
                    value={formData.billingZip}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Shipping Address Section */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Shipping Address</h3>
          <p className="text-sm text-black mb-4">
            Add a shipping address to view shipping details.
          </p>
          <button
            type="button"
            onClick={() => toggleSection('shippingAddress')}
            className="w-50px text-center py-2 px-4 border rounded-md bg-green-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {openSection === 'shippingAddress' ? 'Hide Shipping Address' : 'Add Shipping Address'}
          </button>
          {openSection === 'shippingAddress' && (
            <div className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="shippingAddress" className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    id="shippingAddress"
                    name="shippingAddress"
                    value={formData.shippingAddress}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="shippingCity" className="block text-sm font-medium text-gray-700">City</label>
                  <input
                    type="text"
                    id="shippingCity"
                    name="shippingCity"
                    value={formData.shippingCity}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="shippingState" className="block text-sm font-medium text-gray-700">State</label>
                  <input
                    type="text"
                    id="shippingState"
                    name="shippingState"
                    value={formData.shippingState}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="shippingZip" className="block text-sm font-medium text-gray-700">ZIP Code</label>
                  <input
                    type="text"
                    id="shippingZip"
                    name="shippingZip"
                    value={formData.shippingZip}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-6 text-center">
          <button
            type="submit"
            className="px-3 py-2 text-white bg-green-700 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkoutform;


