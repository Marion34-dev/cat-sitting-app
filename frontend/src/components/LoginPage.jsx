import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateInput = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //no whitespace, one dot & one @
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailPattern.test(formData.email)) {  // test() from RegExp object, returns boolean
      newErrors.email = 'Invalid email format';
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
      return;
    }
    try {
      const response = await axios.post('/api/login', formData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token); // if request successful, token is stored & user sent to dashboard jsx
        navigate('/dashboard');
      } else {
        alert('Login failed. Please try again.');
      }
    } catch (error) {
      alert('Login failed. Please try again.');
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
          <div className="buttons">
            <button type="submit" className="btn">Login</button>
            <button type="button" className="btn" onClick={handleBackToHome}>Back to Home</button>
          </div>
        </form>
      </header>
    </div>
  );
};

export default LoginPage;
