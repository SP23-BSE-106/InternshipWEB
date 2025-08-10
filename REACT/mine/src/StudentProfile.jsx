import React from 'react';

function StudentProfile({ student, onBack }) {
  if (!student) return <p>Student not found...</p>;

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
        <p><strong>Phone:</strong> {student.phone || 'N/A'}</p>
        <p><strong>Website:</strong> {student.website || 'N/A'}</p>
        {student.address && (
          <p>
            <strong>Address:</strong> {student.address.street}, {student.address.suite}, {student.address.city}, {student.address.zipcode}
          </p>
        )}
      </div>
      <button
        style={{
          marginTop: '20px',
          padding: '8px 20px',
          background: 'seagreen',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
        onClick={onBack}
      >
        Back to List
      </button>
    </div>
  );
}

export default StudentProfile;
