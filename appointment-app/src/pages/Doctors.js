import React, { useState } from 'react';
import './Doctors.css';

const doctorData = {
  "Pediatrician": {
    subtitle: "Specializes in diagnosing and treating children and infants.",
    doctors: [
      { name: "Dr. Meenakshi Singh", experience: 14, hospital: "Cloudnine", available: "10am - 1pm" },
      { name: "Dr. Sameer Khan", experience: 11, hospital: "Rainbow Children's Hospital", available: "2pm - 5pm" },
      { name: "Dr. Neha Mathur", experience: 8, hospital: "Motherhood", available: "9am - 12pm" },
      { name: "Dr. Vivek Anand", experience: 13, hospital: "Apollo Cradle", available: "3pm - 6pm" },
      { name: "Dr. Rina Thomas", experience: 10, hospital: "Little Stars Clinic", available: "11am - 2pm" },
      { name: "Dr. Sanjay Sinha", experience: 9, hospital: "KidsCare", available: "4pm - 7pm" },
      { name: "Dr. Ayesha Ali", experience: 6, hospital: "ChildFirst", available: "1pm - 4pm" }
    ]
  },
  "Orthopedic": {
    subtitle: "Specializes in diagnosing and treating musculoskeletal system issues.",
    doctors: [
      { name: "Dr. Rajiv Bansal", experience: 15, hospital: "Sparsh Hospital", available: "9am - 12pm" },
      { name: "Dr. Reena D'Souza", experience: 12, hospital: "Hosmat", available: "2pm - 5pm" },
      { name: "Dr. Gaurav Patil", experience: 10, hospital: "Manipal", available: "11am - 2pm" },
      { name: "Dr. Kamal Joshi", experience: 13, hospital: "Narayana", available: "4pm - 7pm" },
      { name: "Dr. Anita Kumar", experience: 9, hospital: "Aster", available: "1pm - 4pm" },
      { name: "Dr. Dinesh Rao", experience: 11, hospital: "Fortis", available: "3pm - 6pm" },
      { name: "Dr. Swathi Deshmukh", experience: 7, hospital: "Apollo", available: "5pm - 8pm" }
    ]
  },
  "ENT Specialist": {
    subtitle: "Specializes in treating ear, nose, and throat conditions.",
    doctors: [
      { name: "Dr. Manish Tiwari", experience: 10, hospital: "Apollo", available: "10am - 1pm" },
      { name: "Dr. Geetha Krishnan", experience: 8, hospital: "Fortis", available: "3pm - 6pm" },
      { name: "Dr. Ravi Kumar", experience: 12, hospital: "Manipal", available: "11am - 2pm" },
      { name: "Dr. Anu George", experience: 9, hospital: "Columbia Asia", available: "2pm - 5pm" },
      { name: "Dr. Hari Prasad", experience: 6, hospital: "Sakra", available: "1pm - 4pm" },
      { name: "Dr. Sushma Rao", experience: 11, hospital: "BGS", available: "9am - 12pm" },
      { name: "Dr. Mohit Reddy", experience: 7, hospital: "Aster", available: "4pm - 7pm" }
    ]

  },
  "Neurologist": {
    subtitle: "Specializes in diagnosing and treating nervous system disorders.",
    doctors: [
      { name: "Dr. Pradeep Reddy", experience: 20, hospital: "NIMHANS", available: "10am–1pm" },
      { name: "Dr. Swathi Agarwal", experience: 12, hospital: "Fortis", available: "2pm–5pm" },
      { name: "Dr. Sameer Yadav", experience: 8, hospital: "Apollo", available: "9am–12pm" },
      { name: "Dr. Anjali Desai", experience: 14, hospital: "Manipal Hospital", available: "11am–2pm" },
      { name: "Dr. Vikram Singh", experience: 15, hospital: "Max Healthcare", available: "1pm–4pm" },
      { name: "Dr. Neelam Gupta", experience: 10, hospital: "Sakra Premium Hospital", available: "3pm–6pm" },
      { name: "Dr. Pranav Sethi", experience: 9, hospital: "Kokilaben Dhirubhai Ambani Hospital", available: "2pm–5pm" }
    ]
  },
  "Cardiologist": {
    subtitle: "Specializes in diagnosing and treating heart-related conditions.",
    doctors: [
      { name: "Dr. Arjun Mehta", experience: 12, hospital: "Apollo Hospitals", available: "9am - 12pm" },
      { name: "Dr. Nisha Rao", experience: 8, hospital: "Fortis Healthcare", available: "2pm - 5pm" },
      { name: "Dr. Rakesh Jain", experience: 15, hospital: "Manipal Hospital", available: "10am - 1pm" },
      { name: "Dr. Meera Nair", experience: 10, hospital: "Columbia Asia", available: "4pm - 7pm" },
      { name: "Dr. Sunil Agarwal", experience: 9, hospital: "Narayana Health", available: "11am - 2pm" },
      { name: "Dr. Kavita Desai", experience: 11, hospital: "Aster CMI", available: "3pm - 6pm" },
      { name: "Dr. Rahul Menon", experience: 7, hospital: "BGS Gleneagles", available: "5pm - 8pm" }
    ]
  },
  "Dermatologist": {
    subtitle: "Specializes in diagnosing and treating skin conditions.",
    doctors: [
      { name: "Dr. Priya Kapoor", experience: 6, hospital: "Kaya Skin Clinic", available: "11am - 2pm" },
      { name: "Dr. Neeraj Shah", experience: 9, hospital: "DermaGlow", available: "3pm - 6pm" },
      { name: "Dr. Anjali Verma", experience: 7, hospital: "Oliva Skin", available: "10am - 1pm" },
      { name: "Dr. Vikram Yadav", experience: 10, hospital: "Cutis Skin Clinic", available: "12pm - 3pm" },
      { name: "Dr. Sneha Iyer", experience: 5, hospital: "Skinsense", available: "1pm - 4pm" },
      { name: "Dr. Rohit Khurana", experience: 8, hospital: "Dermalife", available: "9am - 12pm" },
      { name: "Dr. Ritu Sharma", experience: 6, hospital: "SkinCity", available: "4pm - 7pm" }
    ]
  },
  "Gynecologist": {
    subtitle: "Specializes in women's health, particularly in reproductive health.",
    doctors: [
      { name: "Dr. Shilpa Jain", experience: 13, hospital: "Cloudnine", available: "9am–1pm" },
      { name: "Dr. Rekha Menon", experience: 8, hospital: "Manipal Hospital", available: "11am–3pm" },
      { name: "Dr. Kiran Thakur", experience: 12, hospital: "Motherhood Hospital", available: "1pm–4pm" },
      { name: "Dr. Neha Agrawal", experience: 14, hospital: "Care Clinic", available: "10am–2pm" },
      { name: "Dr. Meenal Deshpande", experience: 16, hospital: "Kokilaben Hospital", available: "2pm–6pm" },
      { name: "Dr. Suman Gupta", experience: 9, hospital: "Max Healthcare", available: "9am–12pm" },
      { name: "Dr. Priya Mishra", experience: 10, hospital: "Rainbow Hospital", available: "12pm–4pm" }
    ]
  },
  "General Surgeon": {
    subtitle: "Specializes in performing surgeries for various health conditions.",
    doctors: [
      { name: "Dr. Vikram Arora", experience: 14, hospital: "Manipal Hospital", available: "10am–1pm" },
      { name: "Dr. Ramesh Kumar", experience: 12, hospital: "Fortis Healthcare", available: "2pm–5pm" },
      { name: "Dr. Nisha Agarwal", experience: 10, hospital: "Max Healthcare", available: "11am–3pm" },
      { name: "Dr. Mohan Gupta", experience: 15, hospital: "Apollo Hospital", available: "9am–12pm" },
      { name: "Dr. Sunita Sharma", experience: 8, hospital: "Columbia Asia", available: "1pm–4pm" },
      { name: "Dr. Ranjan Verma", experience: 11, hospital: "Sparsh Hospital", available: "3pm–6pm" },
      { name: "Dr. Rajesh Yadav", experience: 9, hospital: "Narayana Health", available: "12pm–3pm" }
    ]
  }
};

const Doctors = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    slot: '',
    upiOption: '',
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleExperienceFilterChange = (e) => {
    setExperienceFilter(e.target.value);
  };

  const handleAvailabilityFilterChange = (e) => {
    setAvailabilityFilter(e.target.value);
  };

  const handleBookClick = (doctor) => {
    setSelectedDoctor(doctor);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedDoctor(null);
    setFormData({
      name: '',
      age: '',
      gender: '',
      phone: '',
      slot: '',
      upiOption: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.upiOption) {
      alert('Please select a UPI option to proceed.');
      return;
    }
    alert(`Appointment booked with ${selectedDoctor.name}!`);
    closeForm();
  };

  const timeSlots = [
    "9am - 12pm", "10am - 1pm", "11am - 2pm", "2pm - 5pm",
    "3pm - 6pm", "4pm - 7pm", "5pm - 8pm"
  ];

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search by doctor's name or category..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
      />

      <div className="filter-controls">
        <select onChange={handleExperienceFilterChange} value={experienceFilter}>
          <option value="">Filter by Experience</option>
          <option value="10">10+ Years</option>
          <option value="8">8+ Years</option>
          <option value="6">6+ Years</option>
        </select>

        <select onChange={handleAvailabilityFilterChange} value={availabilityFilter}>
          <option value="">Filter by Availability</option>
          {timeSlots.map((time, index) => (
            <option key={index} value={time}>{time}</option>
          ))}
        </select>
      </div>

      {Object.entries(doctorData)
        .filter(([category, { doctors }]) =>
          category.toLowerCase().includes(searchQuery) ||
          doctors.some((doc) => doc.name.toLowerCase().includes(searchQuery))
        )
        .map(([category, { subtitle, doctors }]) => {
          const filteredDoctors = doctors.filter((doc) => {
            return (
              (experienceFilter ? doc.experience >= experienceFilter : true) &&
              (availabilityFilter ? doc.available.includes(availabilityFilter) : true) &&
              (doc.name.toLowerCase().includes(searchQuery) || category.toLowerCase().includes(searchQuery))
            );
          });

          return (
            <div className="category-section" key={category}>
              <h2>{category}</h2>
              <p className="doctor-description">{subtitle}</p>
              <div className="doctor-grid">
                {filteredDoctors.map((doc, index) => (
                  <div className="doctor-card" key={index}>
                    <h3>{doc.name}</h3>
                    <p><strong>Experience:</strong> {doc.experience} years</p>
                    <p><strong>Hospital:</strong> {doc.hospital}</p>
                    <p><strong>Available:</strong> {doc.available}</p>
                    <button className="book-button" onClick={() => handleBookClick(doc)}>Book Appointment</button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

      {showForm && (
        <div className="popup-form-overlay">
          <div className="popup-form">
            <h2>Book Appointment with {selectedDoctor?.name}</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
              <input type="number" name="age" placeholder="Your Age" value={formData.age} onChange={handleChange} required />
              <select name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
              <select name="slot" value={formData.slot} onChange={handleChange} required>
                <option value="">Select Time Slot</option>
                {timeSlots.map((slot, idx) => (
                  <option key={idx}>{slot}</option>
                ))}
              </select>

              <div className="upi-options">
                <label>Select UPI Payment Method:</label>
                <div className="upi-list">
                  {['Google Pay', 'PhonePe', 'Paytm', 'BHIM UPI'].map((method, idx) => (
                    <label key={idx}>
                      <input
                        type="radio"
                        name="upiOption"
                        value={method}
                        checked={formData.upiOption === method}
                        onChange={handleChange}
                        required
                      />
                      {method}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-buttons">
                <button type="submit" className="submit-btn">Submit</button>
                <button type="button" className="cancel-btn" onClick={closeForm}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctors;