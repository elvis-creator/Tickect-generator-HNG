import React, { useState, useEffect } from "react";

const Ticket = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    avatar: "",
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

  // State to store generated ticket
  const [ticketData, setTicketData] = useState(null);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Save data to localStorage on form change
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Validate form fields
  const validate = () => {
    let tempErrors = {};
    if (!formData.fullName.trim()) tempErrors.fullName = "Full Name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) tempErrors.email = "Invalid email format";
    if (!formData.avatar.match(/^https?:\/\//)) tempErrors.avatar = "Invalid image URL";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setTicketData(formData); 
    }
  };

  return (
    <div className="ticket-container">
      <div className="ticket-form">
        <h2>Conference Ticket Generator</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name:</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
            {errors.fullName && <p className="error">{errors.fullName}</p>}
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label>Avatar URL:</label>
            <input type="text" name="avatar" value={formData.avatar} onChange={handleChange} />
            {errors.avatar && <p className="error">{errors.avatar}</p>}
          </div>

          <button type="submit" className="submit-btn">Generate Ticket</button>
        </form>
      </div>

      {/* Display Ticket if Generated */}
      {ticketData && (
        <div className="generated-ticket">
          <h3>🎟 Your Ticket</h3>
          <img src={ticketData.avatar} alt="Avatar" className="avatar-img" />
          <p><strong>Name:</strong> {ticketData.fullName}</p>
          <p><strong>Email:</strong> {ticketData.email}</p>
        </div>
      )}
    </div>
  );
};

export default Ticket;
