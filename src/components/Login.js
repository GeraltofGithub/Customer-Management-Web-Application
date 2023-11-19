import React, { useState } from 'react';
import { loginFields } from "../constants/formFields";
import Input from "./Input";
import FormExtra from './FormExtra';
import FormAction from './FormAction';
import { useNavigate } from 'react-router-dom';

const fields = loginFields;
let fieldsState = {};
fields.forEach(field => (fieldsState[field.id] = ''));

const LoginPage = () => {
  const [loginState, setLoginState] = useState(fieldsState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.persist();
    setLoginState(prevState => ({ ...prevState, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login button clicked');
    await generateToken();
  };

  const generateToken = async () => {
    try {
      const response = await fetch('/sunbase/portal/api/assignment_auth.jsp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login_id: 'test@sunbasedata.com',
          password: 'Test@123',
          //cmd:'create'
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const accessToken = data.access_token;

        localStorage.setItem('token', accessToken);
        console.log('Token generated:', accessToken);

        
        navigate('/customer');
      } else {
        console.error('Token generation failed.');
      }
    } catch (error) {
      console.error('Error during token generation:', error);
    }
  };

  console.log('Login page rendered');

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>

      <FormExtra />
      <FormAction handleSubmit={handleSubmit} text="Login" />
    </form>
  );
}

export default LoginPage;
