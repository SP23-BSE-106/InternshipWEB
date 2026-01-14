# University Portal

A comprehensive web application built with Next.js for managing university operations, featuring role-based authentication and dashboards for students, teachers, and administrators.

## 🚀 Features

### User Roles & Authentication
- **Students**: Access personal dashboard, view grades, and manage academic information
- **Teachers**: Manage classes, assignments, and student performance tracking
- **Admins**: Full system administration with user management and system monitoring

### Core Functionality
- Secure JWT-based authentication system
- Role-based access control and navigation
- Responsive design with Tailwind CSS
- MongoDB integration for data persistence
- RESTful API architecture

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT), bcrypt for password hashing
- **Styling**: Tailwind CSS with custom CSS variables

## 📁 Project Structure

```
university-portal/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── admins/              # Admin CRUD operations
│   │   ├── auth/                # Authentication endpoints
│   │   ├── students/            # Student CRUD operations
│   │   └── teachers/            # Teacher CRUD operations
│   ├── admins/                  # Admin pages
│   │   ├── dashboard/           # Admin dashboard
│   │   └── management/          # User management interface
│   ├── students/                # Student pages
│   │   └── dashboard/           # Student dashboard
│   ├── teachers/                # Teacher pages
│   ├── globals.css              # Global styles with CSS variables
│   ├── layout.js                # Root layout with navigation
│   └── page.jsx                 # Landing page with auth forms
├── components/                  # Reusable React components
│   └── Navigation.jsx           # Main navigation component
├── lib/                         # Utility libraries
│   ├── auth.js                  # Authentication utilities
│   ├── mongodb.js               # Database connection
│   └── useAuth.js               # Authentication hook
├── models/                      # Mongoose schemas
│   ├── Admin.js                 # Admin user schema
│   ├── Student.js               # Student user schema
│   └── Teacher.js               # Teacher user schema
└── public/                      # Static assets
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm, yarn, or pnpm

### Environment Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd university-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/universityPortal
   JWT_SECRET=your-secret-key-change-in-production
   ```

4. **Start MongoDB**
   Ensure MongoDB is running on your system or update the connection string for a cloud instance.

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Database Models

### Admin
- `name`: String (required)
- `email`: String (required, unique)
- `password`: String (required, hashed)

### Student
- `name`: String (required)
- `rollNo`: String (required, unique)
- `email`: String (required)
- `password`: String (required, hashed)

### Teacher
- `name`: String (required)
- `teacherId`: String (required, unique)
- `email`: String (required)
- `password`: String (required, hashed)

## 🔐 Authentication Flow

1. **Registration**: Users can register with role-specific information
2. **Login**: JWT tokens are generated and stored in HttpOnly cookies
3. **Middleware**: API routes verify authentication using JWT tokens
4. **Role-based Access**: Different dashboards based on user roles

## 🎨 Styling & UI

- **Tailwind CSS**: Utility-first CSS framework
- **CSS Variables**: Consistent theming with custom properties
- **Responsive Design**: Mobile-first approach
- **Professional UI**: Clean, modern interface with animations

## 🚀 API Endpoints

### Authentication
- `POST /api/auth` - User registration
- `PUT /api/auth` - User login
- `DELETE /api/auth` - User logout

### Admin Management
- `GET /api/admins` - Get all admins
- `POST /api/admins` - Create new admin
- `GET /api/admins/[id]` - Get admin by ID
- `PUT /api/admins/[id]` - Update admin
- `DELETE /api/admins/[id]` - Delete admin

### Student Management
- `GET /api/students` - Get all students
- `POST /api/students` - Create new student
- `GET /api/students/[id]` - Get student by ID
- `PUT /api/students/[id]` - Update student
- `DELETE /api/students/[id]` - Delete student

### Teacher Management
- `GET /api/teachers` - Get all teachers
- `POST /api/teachers` - Create new teacher
- `GET /api/teachers/[id]` - Get teacher by ID
- `PUT /api/teachers/[id]` - Update teacher
- `DELETE /api/teachers/[id]` - Delete teacher

## 🧪 Testing

The project includes authentication flow tests:
- `test-auth.js` - Basic authentication testing
- `test-auth-flow.js` - Comprehensive auth flow testing

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- HttpOnly cookies for token storage
- Role-based access control
- Input validation and sanitization

## 🌟 Key Features Implemented

- ✅ Complete authentication system
- ✅ Role-based dashboards
- ✅ CRUD operations for all user types
- ✅ Responsive design
- ✅ Professional UI/UX
- ✅ MongoDB integration
- ✅ JWT security
- ✅ Email integration in dashboards
- ✅ System status monitoring (Admin)
- ✅ User management interface

## 🚧 Future Enhancements

Based on the TODO.md, potential future features include:
- Advanced user profile management
- Course and class management system
- Grade book functionality
- Assignment submission system
- Notification system
- Advanced analytics and reporting

## 📄 License

This project is private and intended for educational purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

Built with ❤️ using Next.js
