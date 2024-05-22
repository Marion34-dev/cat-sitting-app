import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import '../App.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateInput = () => {
    const newErrors = {};
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } 
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors); // update errors state with newErrors
    return Object.keys(newErrors).length === 0;
  };

  // updates the formData and clears any errors with new user input value
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
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
      const response = await axios.post('http://localhost:3000/login', formData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token); // if request successful, token is stored & user sent to dashboard jsx
        toast.success('Login successful');
        navigate('/dashboard');
      } else {
        toast.error('Login failed. Please try again.');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="login-page">
      <header className="header">
        <h1>Login to PurrfectSitter</h1>
        <form className="login-form" onSubmit={handleSubmit}>
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
          <div className="buttons">
            <button type="submit" className="btn">Login</button>
            <button type="button" className="btn" onClick={handleBackToHome}>Back to Home</button>
          </div>
        </form>
      </header>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
