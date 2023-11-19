import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const CreateCustomer = () => {
  const navigate = useNavigate();

  const [customerData, setCustomerData] = useState({
    first_name: "",
    last_name: "",
    street: "",
    address: "",
    city: "",
    state: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({ ...prevData, [name]: value }));
  };

  const createCustomer = async () => {
    console.log("authkey aa rahi hai?:", localStorage.getItem('token'));
    try {
      const response = await fetch('/sunbase/portal/api/assignment.jsp?cmd=create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          first_name: "Jane",
          last_name: "Doe",
          street: "Elvnu Street",
          address: "H no 2",
          city: "Delhi",
          state: "Delhi",
          email: "sam@gmail.com",
          phone: "12345678",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Customer created successfully:', data);

        // Redirect to the customer list page after successful creation
        navigate("/customer-list");
      } else {
        console.error('Failed to create customer. Response:', response);
      }
    } catch (error) {
      console.error('Error during customer creation:', error);
    }
  };
  
  const handleCreateCustomer = () => {
    // Redirect to the CreateCustomer page
    navigate("/customer");
  };

  return (
    <>
      <Header
        heading="Add more to your business"
        paragraph="Enter your information for clients!"
      />

      <div className="max-w-md mx-auto mt-5 p-5 border rounded shadow">
        <form onSubmit={(e) => { e.preventDefault(); createCustomer(); }}>
          <div className="mb-4">
            <label htmlFor="first_name" className="block text-gray-700 text-sm font-bold mb-2">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={customerData.first_name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="last_name" className="block text-gray-700 text-sm font-bold mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={customerData.last_name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="street" className="block text-gray-700 text-sm font-bold mb-2">
              Street
            </label>
            <input
              type="text"
              id="street"
              name="street"
              value={customerData.street}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={customerData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={customerData.city}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="state" className="block text-gray-700 text-sm font-bold mb-2">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={customerData.state}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={customerData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={customerData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="mt-6">
            <button
              onClick={handleCreateCustomer}
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create Customer
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateCustomer;