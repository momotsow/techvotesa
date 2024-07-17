import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import bcrypt from 'bcryptjs';
import eyeIcon from '../imgs/eye.png';
import eyeSlashIcon from '../imgs/hide.png'; 

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.email === email) {
      if (bcrypt.compareSync(password, storedUser.password)) {
        login(email, password);
        navigate('/profile');
      } else {
        setErrors({ password: 'Incorrect password.' });
      }
    } else {
      setErrors({ email: 'No user found with this email address.' });
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <span
              className="password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              <img src={showPassword ? eyeSlashIcon : eyeIcon} alt="Toggle Password Visibility" />
            </span>
          </div>
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button type="submit">Login</button>
        <div className='ex'>
        <span className="login">Do not have an account? <Link to="/register">Register</Link></span>

        <span className="reset">Forgot your password? <Link to="/reset-password">Reset it here</Link></span>
        </div>
       

      </form>
    </div>
  );
}

export default Login;
