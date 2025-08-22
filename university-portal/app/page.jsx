export default function HomePage() {
  return (
    <div className="page-container">
      <h1 className="page-title">Welcome to University Portal</h1>
      <p className="home-subtitle">
        Manage students, teachers, and administrators in one place
      </p>
      
      <div className="features-grid">
        <div className="feature-card">
          <h3>Students</h3>
          <p>Manage student records, enrollments, and academic progress</p>
        </div>
        
        <div className="feature-card">
          <h3>Teachers</h3>
          <p>Manage teacher profiles, courses, and assignments</p>
        </div>
        
        <div className="feature-card">
          <h3>Admins</h3>
          <p>Administrative functions and system management</p>
        </div>
      </div>
      
      <div className="getting-started">
        <h3>Getting Started</h3>
        <p>Use the navigation menu above to access different management sections</p>
      </div>
    </div>
  );
}
