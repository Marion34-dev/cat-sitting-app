import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import '../App.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    isPetSitter: false
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateInput = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //no whitespace, one dot & one @
    if (!formData.username) {
      newErrors.username = 'Username is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailPattern.test(formData.email)) { // test() from RegExp object
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    setErrors(newErrors); // update errors state with newErrors
    return Object.keys(newErrors).length === 0;
  };

  // updates the formData and clears any errors with new user input value
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value // Handle checkbox
    });
    setErrors({
      ...errors,
      [name]: ''
    });
  };

  // prevents default form submission, validate input, sends post request
  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateInput()) {
    toast.error('Please fix the errors before submitting.');
    return;
  }
  try {
    const response = await axios.post('http://localhost:3000/register', formData);
    console.log('API Response:', response);

    // Check if the response data has the expected structure
    if (response.status === 201 && response.data) {
      const successMessage = response.data.message || 'User created successfully.';
      console.log('Registration success:', successMessage);
      toast.success(successMessage, {
        onClose: () => {
          console.log('Navigating to login');
          navigate('/login');
        }
      });
    } else {
      console.log('Registration failed:', response.data.message);
      toast.error('Registration failed. Please try again.');
    }
  } catch (error) {
    toast.error('Registration failed. Please try again.');
    console.error('Registration error:', error);
  }
};


  const handleBackToHome = () => {
    navigate('/'); // Navigate back to home
  };

  return (
    <div className="register-page">
      <header className="header">
        <h1>Register for PurrfectSitter</h1>
        <form className="register-form" onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && <p className="error">{errors.username}</p>}
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </label>
           <label>
            Are you a Pet Sitter?
            <input
              type="checkbox"
              name="isPetSitter"
              checked={formData.isPetSitter}
              onChange={handleChange}
            />
          </label>
          <div className="buttons">
            <button type="submit" className="btn">Register</button>
            <button type="button" className="btn" onClick={handleBackToHome}>Back to Home</button>
          </div>
        </form>
      </header>
      <ToastContainer />
    </div>
  );
};

export default RegisterPage;
