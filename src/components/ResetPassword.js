import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import eyeIcon from '../imgs/eye.png';
import eyeSlashIcon from '../imgs/hide.png'; 

function ResetPassword() {
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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

    const newErrors = validatePassword(formData.newPassword);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (formData.newPassword !== formData.confirmNewPassword) {
      setErrors({ confirmNewPassword: 'Passwords do not match.' });
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.email === formData.email) {
      const hashedPassword = bcrypt.hashSync(formData.newPassword, 10);
      const updatedUser = { ...storedUser, password: hashedPassword };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      navigate('/login');
    } else {
      setErrors({ email: 'No user found with this email address.' });
    }
  };

  return (
    <div className="container">
      <h2>Reset Password</h2>
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
          <label htmlFor="newPassword">New Password:</label>
          <div className="password-input">
            <input
              type={showNewPassword ? 'text' : 'password'}
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="New Password"
              required
            />
           

            <span
              className="password-toggle-icon"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              <img src={showNewPassword ? eyeSlashIcon : eyeIcon} alt="Toggle Password Visibility" />
            </span>
          </div>
          {errors && <div className="errors">{Object.values(errors).map((error, index) => <p key={index}>{error}</p>)}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="confirmNewPassword">Confirm New Password:</label>
          <div className="password-input">
            <input
              type={showConfirmNewPassword ? 'text' : 'password'}
              id="confirmNewPassword"
              name="confirmNewPassword"
              value={formData.confirmNewPassword}
              onChange={handleChange}
              placeholder="Confirm New Password"
              required
            />
            
            <span
              className="password-toggle-icon"
              onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
            >
              <img src={showConfirmNewPassword ? eyeSlashIcon : eyeIcon} alt="Toggle Confirm Password Visibility" />
            </span>
          </div>
          {errors.confirmNewPassword && <p className="error">{errors.confirmNewPassword}</p>}
        </div>
        <button type="submit">Send Reset Link</button>
        {errors.server && <p className="error">{errors.server}</p>}

        <p>Already have an account? <Link to="/login">Login here</Link></p>

      </form>
    </div>
  );
}

export default ResetPassword;
