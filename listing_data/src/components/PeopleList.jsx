import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PeopleList = () => {
  const [people, setPeople] = useState([]);

  const fetchPeople = async () => {
    const res = await fetch("http://localhost:5000/api/people");
    const data = await res.json();
    setPeople(data);
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this person?")) {
      await fetch(`http://localhost:5000/api/people/${id}`, {
        method: "DELETE",
      });
      fetchPeople(); //refresh list
    }
  };

  return (
    <div class="center-div">
      <Link to="/add" className="btn">➕ Add Person</Link>
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Age</th><th>Nationality</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {people.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.age}</td>
              <td>{p.nationality}</td>
              <td>
                <Link to={`/edit/${p._id}`} className="btn">✏️ Edit</Link>
                <button onClick={() => handleDelete(p._id)} className="btn delete">🗑️ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PeopleList;
