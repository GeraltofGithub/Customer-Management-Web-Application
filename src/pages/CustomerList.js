import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import CreateCustomer from "./CreateCustomer";
import { useNavigate } from "react-router-dom";

const CustomerList = () => {
  const [customerData, setCustomerData] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);

  useEffect(() => {
    const authKey = localStorage.getItem('token');
    //console.log("authkey mil gayi:", authKey);
    const fetchData = async () => {
      const response = await fetch('/sunbase/portal/api/assignment.jsp?cmd=get_customer_list', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authKey}`, 
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Customer Data:', data);
        setCustomerData(data);
      } else {
        console.error('Failed to fetch customer data. Response:', response.status, await response.text());
      }
    };

    fetchData();
  }, []); 
  const navigate = useNavigate();
  const handleCreateCustomer = () => {
    // Redirect to the CreateCustomer page
    
    navigate("/create");
  };

  const handleEditCustomer = (uuid) => {
    // Find the customer to edit
    const customerToEdit = customerData.find((customer) => customer.uuid === uuid);
    setEditingCustomer(customerToEdit);
  };

  const handleSaveEdit = async () => {
    const authKey = localStorage.getItem('token');

    try {
      const response = await fetch('/sunbase/portal/api/assignment.jsp?cmd=update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authKey}`, 
        },
        body: JSON.stringify(editingCustomer),
      });

      if (response.ok) {
        // Refresh customer data after successful edit
        const updatedData = await response.json();
        setCustomerData(updatedData);
        setEditingCustomer(null); // Reset editing state
      } else {
        console.error('Failed to edit customer. Response:', response.status, await response.text());
      }
    } catch (error) {
      console.error('Error during customer edit:', error.message);
    }
  };

  const handleDeleteCustomer = async (uuid) => {
    const authKey = localStorage.getItem('token');

    try {
      const response = await fetch('/sunbase/portal/api/assignment.jsp?cmd=delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authKey}`, 
        },
        body: JSON.stringify({
          uuid:'',
        }),
      });
      console.log(response)
      if (response.ok) {
        const updatedCustomerData = customerData.filter((customer) => customer.uuid !== uuid);
        setCustomerData(updatedCustomerData);
      } else {
        console.error('Failed to delete customer. Response:', response.status, await response.text());
      }
    } catch (error) {
      console.error('Error during customer deletion:', error.message);
    }
  };

  return (
    <>
      <Header
        heading="Your Customers - All in one place!"
        paragraph="Add, Update and Remove customer information on a single click."
      />
      <div className="max-w-7xl mx-auto py-1 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 bg-white border-b border-gray-200">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    First Name
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Last Name
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    City
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    State
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 bg-gray-50"></th>
                </tr>
              </thead>
              <tbody>
                {customerData.map((customer) => (
                  <tr key={customer.id}>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">{customer.first_name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">{customer.last_name}</div>
                    </td>
                    {/* ... (other table cells) ... */}
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">{customer.address}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">{customer.city}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">{customer.state}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">{customer.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">{customer.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        Edit
                      </button>
                      <button  onClick={() => handleDeleteCustomer(customer.UUID)}  className="ml-2 text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Create Customer Button */}
            <button onClick={handleCreateCustomer} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Create Customer
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerList;