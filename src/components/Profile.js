import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { user, logout, updateProfile } = useAuth();
  const [profileData, setProfileData] = useState({
    name: '',
    surname: '',
    email: '',
    idNumber: '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      setProfileData(user);
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    await updateProfile(profileData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="container">
      <h2>Profile</h2>
      {isEditing ? (
        <form>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              placeholder="Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="surname">Surname:</label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={profileData.surname}
              onChange={handleChange}
              placeholder="Surname"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="idNumber">ID Number:</label>
            <input
              type="text"
              id="idNumber"
              name="idNumber"
              value={profileData.idNumber}
              onChange={handleChange}
              placeholder="ID Number"
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={profileData.address}
              onChange={handleChange}
              placeholder="Address"
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={profileData.city}
              onChange={handleChange}
              placeholder="City"
            />
          </div>
          <div className="form-group">
            <label htmlFor="postalCode">Postal Code:</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={profileData.postalCode}
              onChange={handleChange}
              placeholder="Postal Code"
            />
          </div>
          <button type="button" onClick={handleSave}>Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div>
          <p>Name: {profileData.name}</p>
          <p>Surname: {profileData.surname}</p>
          <p>Email: {profileData.email}</p>
          <p>ID Number: {profileData.idNumber}</p>
          <p>Address: {profileData.address}</p>
          <p>City: {profileData.city}</p>
          <p>Postal Code: {profileData.postalCode}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;
