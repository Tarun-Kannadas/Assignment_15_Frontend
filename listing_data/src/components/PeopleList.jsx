import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

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
    const confirm = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc3545",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Yes, delete it!"
    });

    if (confirm.isConfirmed) {
    const res = await fetch(`http://localhost:5000/api/people/${id}`, {
        method: "DELETE"
    });

    if (res.ok) {
        Swal.fire({
        title: "Deleted Successfully!",
        icon: "success",
        confirmButtonColor: "#28a745",
        timer: 2000
        });
        fetchPeople();
    } else {
        Swal.fire({
        title: "Error!",
        text: "Could not delete person.",
        icon: "error",
        confirmButtonColor: "#dc3545"
        });
    }
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
