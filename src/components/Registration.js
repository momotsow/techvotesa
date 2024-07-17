import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import eyeIcon from '../imgs/eye.png';
import eyeSlashIcon from '../imgs/hide.png';

function Registration() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    idNumber: '',
    address: '',
    city: '',
    postalCode: '',
    email: '',
    password: '',
    confirmPassword: '',
    idFile: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'idFile') {
      setFormData({
        ...formData,
        idFile: files[0] ? URL.createObjectURL(files[0]) : null,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validatePassword = (password) => {
    const errors = {};
    if (password.length < 8) {
      errors.length = 'Password must be at least 8 characters long.';
    }
    if (!/[A-Z]/.test(password)) {
      errors.uppercase = 'Password must contain at least one uppercase letter.';
    }
    if (!/[a-z]/.test(password)) {
      errors.lowercase = 'Password must contain at least one lowercase letter.';
    }
    if (!/[0-9]/.test(password)) {
      errors.number = 'Password must contain at least one number.';
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.specialChar = 'Password must contain at least one special character.';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validatePassword(formData.password);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match.' });
      return;
    }

    const hashedPassword = bcrypt.hashSync(formData.password, 10);
    const userData = { ...formData, password: hashedPassword };
    delete userData.confirmPassword;

    register(userData);
    navigate('/login');
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="surname">Surname:</label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            placeholder="Surname"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="idNumber">ID Number:</label>
          <input
            type="text"
            id="idNumber"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            placeholder="ID Number"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="postalCode">Postal Code:</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            placeholder="Postal Code"
            required
          />
        </div>
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
          {errors && <div className="errors">{Object.values(errors).map((error, index) => <p key={index}>{error}</p>)}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <div className="password-input">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
            />
            <span
              className="password-toggle-icon"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <img src={showConfirmPassword ? eyeSlashIcon : eyeIcon} alt="Toggle Confirm Password Visibility" />
            </span>
          </div>
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="idFile">Upload ID:</label>
          <input
            type="file"
            id="idFile"
            name="idFile"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
        <p>Already have an account? <Link to="/login">Login here</Link></p>

      </form>
    </div>
  );
}

export default Registration;
