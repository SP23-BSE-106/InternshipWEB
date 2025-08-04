import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function StudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => setStudent(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!student) return <p>Loading...</p>;

  return (
    <div style={{ padding: '30px' }}>
      <h1 style={{ color: 'green' }}>Student Profile</h1>
      <div style={{
        background: '#1e1e1e',
        color: 'white',
        padding: '20px',
        borderRadius: '10px',
        maxWidth: '600px'
      }}>
        <h2>Name: {student.name}</h2>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Username:</strong> {student.username}</p>
        <p><strong>Phone:</strong> {student.phone}</p>
        <p><strong>Address:</strong> {JSON.stringify(student.address)}</p>
      </div>
      <button
        style={{ marginTop: '20px', padding: '8px 20px', background: 'seagreen', color: 'white', border: 'none', borderRadius: '5px' }}
        onClick={() => navigate('/')}
      >
        Back
      </button>
    </div>
  );
}

export default StudentProfile;
