import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddEditPerson = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    nationality: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch data for edit mode
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/people/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch person");
          return res.json();
        })
        .then((data) => {
          setFormData({
            name: data.name || "",
            age: data.age || "",
            nationality: data.nationality || "",
          });
        })
        .catch((err) => console.error("Error fetching person:", err));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = id ? "PUT" : "POST";
    const url = id
      ? `http://localhost:5000/api/people/${id}`
      : "http://localhost:5000/api/people";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save data");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error saving data!");
    }
  };

  return (
    <div className="form-container">
      <h2>{id ? "Edit Person" : "Add New Person"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Enter Age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nationality"
          placeholder="Enter Nationality"
          value={formData.nationality}
          onChange={handleChange}
          required
        />
        <button type="submit">{id ? "Update" : "Add"}</button>
        <button type="button" onClick={() => navigate("/")}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddEditPerson;
