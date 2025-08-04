import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StudentList() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => setStudents(prev => prev.filter(student => student.id !== id)));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Student List</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th><th>Username</th><th>Email</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.username}</td>
              <td>{student.email}</td>
              <td>
                <button onClick={() => navigate(`/student/${student.id}`)}>View</button>{' '}
                <button disabled>Edit</button>{' '}
                <button onClick={() => handleDelete(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
