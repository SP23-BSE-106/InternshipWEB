import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StudentList({ onViewProfile }) {
  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', username: '', email: '' });

  // Load students from API
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        setStudents(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  // Start editing
  const handleEdit = (student) => {
    setEditingId(student.id);
    setEditForm({
      name: student.name,
      username: student.username,
      email: student.email
    });
  };

  // Save edit
  const handleSave = (id) => {
    const updatedStudents = students.map(student => 
      student.id === id 
        ? { ...student, ...editForm }
        : student
    );
    setStudents(updatedStudents);
    setEditingId(null);
  };

  // Cancel edit
  const handleCancel = () => {
    setEditingId(null);
    setEditForm({ name: '', username: '', email: '' });
  };

  // Handle form change
  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // Delete student
  const handleDelete = (id) => {
    const updatedList = students.filter(student => student.id !== id);
    setStudents(updatedList);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Student List</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              {editingId === student.id ? (
                <>
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="username"
                      value={editForm.username}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <button onClick={() => handleSave(student.id)}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{student.name}</td>
                  <td>{student.username}</td>
                  <td>{student.email}</td>
                  <td>
                    <button onClick={() => onViewProfile(student)}>View</button>{' '}
                    <button onClick={() => handleEdit(student)}>Edit</button>{' '}
                    <button onClick={() => handleDelete(student.id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
