
import { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [selectedRole, setSelectedRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [signupNotice, setSignupNotice] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const [students, setStudents] = useState([
    { id: 1, name: "raman", rollNumber: "2220", course: "Python", dateOfBirth: "2004-12-26", mark: 85, attendance: 90 },
    { id: 2, name: "ravi", rollNumber: "122", course: "Java", dateOfBirth: "2003-12-08", mark: 92, attendance: 95 },
    { id: 3, name: "sachine", rollNumber: "111", course: "C", dateOfBirth: "2004-06-18", mark: 78, attendance: 88 },
    { id: 4, name: "ravi", rollNumber: "1911", course: "Python", dateOfBirth: "2003-09-11", mark: 81, attendance: 92 },
    { id: 5, name: "Aarav Sharma", rollNumber: "STU-104", course: "Computer Science", dateOfBirth: "2005-03-14", mark: 89, attendance: 94 },
    { id: 6, name: "Priya Patel", rollNumber: "STU-102", course: "BCA", dateOfBirth: "2004-10-22", mark: 94, attendance: 97 },
    { id: 7, name: "Anu", rollNumber: "STU-107", course: "BSc", dateOfBirth: "2005-01-05", mark: 85, attendance: 90 }
  ]);

  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [course, setCourse] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // LOGIN
  function handleLogin(e) {
    e.preventDefault();

    if (selectedRole === "admin" && email === "admin@gmail.com" && password === "Admin@12345") {
      setRole(selectedRole);
      setLoggedIn(true);
    }
    else if (selectedRole === "student" && email === "student@gmail.com" && password === "Stud12345") {
      setRole(selectedRole);
      setLoggedIn(true);
    }
    else {
      alert("Invalid email, password, or role selected");
    }
  }

  // LOGOUT
  function logout() {
    setLoggedIn(false);
    setRole("");
    setEmail("");
    setPassword("");
    setEditId(null);
    setName("");
    setRollNumber("");
    setCourse("");
    setDateOfBirth("");
    setSearchTerm("");
  }

  // ADD OR UPDATE STUDENT
  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim() || !rollNumber.trim() || !course.trim() || !dateOfBirth) {
      alert("Please fill all fields");
      return;
    }

    const existingStudent = students.find(student => student.id === editId);
    const studentData = {
      id: editId || Date.now(),
      name: name.trim(),
      rollNumber: rollNumber.trim(),
      course: course.trim(),
      dateOfBirth,
      mark: existingStudent ? existingStudent.mark : 0,
      attendance: existingStudent ? existingStudent.attendance : 0
    };

    if (editId) {
      setStudents(students.map(student =>
        student.id === editId ? studentData : student
      ));
      setEditId(null);
    } else {
      setStudents([...students, studentData]);
    }

    setName("");
    setRollNumber("");
    setCourse("");
    setDateOfBirth("");
  }

  // EDIT STUDENT
  function editStudent(student) {
    setName(student.name);
    setRollNumber(student.rollNumber);
    setCourse(student.course);
    setDateOfBirth(student.dateOfBirth);
    setEditId(student.id);
  }

  // DELETE STUDENT
  function deleteStudent(id) {
    setStudents(students.filter(student => student.id !== id));
  }

  const searchQuery = searchTerm.trim().toLowerCase();
  const filteredStudents = students.filter(student =>
    [student.name, student.rollNumber, student.course]
      .some(value => value.toLowerCase().includes(searchQuery))
  );

  // LOGIN PAGE
  if (!loggedIn) {
    return (
      <div className="login-page">
        <form className="login-box" onSubmit={handleLogin}>
          <h1>Student Management Login</h1>
          <p className="login-description">Sign in to access your dashboard</p>

          <label className="login-field">
            Email Address
            <input
              type="email"
              placeholder="name@example.com"
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="login-field">
            Password
            <span className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="show-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <span aria-hidden="true">◉</span> {showPassword ? "Hide" : "Show"}
              </button>
            </span>
          </label>

          <label className="login-field">
            Select Role
            <select
              value={selectedRole}
              onChange={e => setSelectedRole(e.target.value)}
            >
              <option value="student">User / Student (View Only)</option>
              <option value="admin">Administrator</option>
            </select>
          </label>

          <button type="submit" className="login-submit">Sign in</button>
          <p className="signup-prompt">
            Don’t have an account?{" "}
            <button type="button" className="signup-link" onClick={() => setSignupNotice(true)}>
              Sign Up
            </button>
          </p>
          {signupNotice && (
            <p className="signup-notice" role="status">
              Please contact your administrator to create an account.
            </p>
          )}
        </form>
      </div>
    );
  }

  // ADMIN PORTAL
  if (role === "admin") {
    return (
      <div className="dashboard">
        <header className="admin-topbar">
          <div className="admin-topbar-inner">
            <div className="dashboard-brand">
              <span className="brand-mark brand-mark-small" aria-hidden="true">S</span>
              <span>Student Management</span>
            </div>
            <nav className="admin-nav" aria-label="Admin navigation">
              <span className="admin-role-label">Admin Panel</span>
              <button className="logout-button" onClick={logout}>Log out</button>
            </nav>
          </div>
        </header>

        <main className="dashboard-content admin-content">
          <section className="admin-page-heading">
            <div>
              <p className="eyebrow">STUDENT MANAGEMENT SYSTEM</p>
              <h1>Admin Dashboard</h1>
              <p>Manage student records and academic information.</p>
            </div>
            <div className="admin-overview-stats">
              <div><span>Total Students</span><strong>{students.length}</strong></div>
              <div><span>Active Courses</span><strong>8</strong></div>
            </div>
          </section>

          <form id="add-student" className="student-form admin-student-form" onSubmit={handleSubmit}>
            <div className="admin-form-heading">
              <h2>{editId ? "Edit Student" : "Add New Student"}</h2>
              {editId && (
                <button className="cancel-edit" type="button" onClick={() => {
                  setEditId(null);
                  setName("");
                  setRollNumber("");
                  setCourse("");
                  setDateOfBirth("");
                }}>
                  Cancel edit
                </button>
              )}
            </div>

            <div className="admin-form-fields">
              <label>
                Student Name
                <input
                  placeholder="Enter student name"
                  aria-label="Student name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </label>

              <label>
                Roll Number
                <input
                  placeholder="e.g. STU-104"
                  aria-label="Roll number"
                  value={rollNumber}
                  onChange={e => setRollNumber(e.target.value)}
                  required
                />
              </label>

              <label>
                Course
                <input
                  placeholder="e.g. Computer Science"
                  aria-label="Course"
                  value={course}
                  onChange={e => setCourse(e.target.value)}
                  required
                />
              </label>

              <label>
                Date of Birth
                <input
                  type="date"
                  aria-label="Date of birth"
                  value={dateOfBirth}
                  onChange={e => setDateOfBirth(e.target.value)}
                  required
                />
              </label>

              <button type="submit" className="primary-button">
                {editId ? "Save Changes" : "Add Student"}
              </button>
            </div>
          </form>

          <section id="students" className="admin-student-section">
            <div className="admin-student-heading">
              <div>
                <h2>Manage Students</h2>
                <p>{students.length} student{students.length === 1 ? "" : "s"} in your records</p>
              </div>
              <label className="student-search">
                <span className="visually-hidden">Search students</span>
                <input
                  type="search"
                  placeholder="Search student..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </label>
            </div>

            {filteredStudents.length > 0 ? (
              <div className="admin-student-grid">
                {filteredStudents.map((student, index) => (
                  <article className="admin-student-card" key={student.id}>
                    <div className={`admin-card-avatar avatar-tone-${index % 4}`} aria-hidden="true">
                      🎓
                    </div>
                    <h3>{student.name}</h3>
                    <p className="admin-card-id">Roll No: <span>{student.rollNumber}</span></p>
                    <p className="admin-card-id">DOB: <span>{student.dateOfBirth}</span></p>
                    <span className="admin-card-course">{student.course}</span>
                    <div className="admin-card-actions">
                      <button type="button" className="edit" onClick={() => editStudent(student)}>Edit</button>
                      <button type="button" className="delete" onClick={() => deleteStudent(student.id)}>Delete</button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="empty-message">
                {students.length === 0
                  ? "No students yet. Use the form above to add your first student."
                  : "No students match your search."}
              </p>
            )}
          </section>
        </main>
      </div>
    );
  }

  // STUDENT PORTAL
  const myStudent = students.find(student => student.id === 1);

  return (
    <div className="dashboard">
      <header>
        <div className="dashboard-brand">
          <span className="brand-mark brand-mark-small" aria-hidden="true">S</span>
          <span>Student Portal</span>
        </div>
        <button className="logout-button" onClick={logout}>Log out <span aria-hidden="true">↗</span></button>
      </header>

      <main className="dashboard-content student-dashboard">
        <section className="page-intro">
          <p className="eyebrow">YOUR OVERVIEW</p>
          <h1>Welcome back, {myStudent ? myStudent.name : "Student"}.</h1>
          <p>Your academic progress, all in one place.</p>
        </section>

        {myStudent ? (
          <section className="profile-card">
            <div className="profile-heading">
              <span className="student-avatar profile-avatar" aria-hidden="true">{myStudent.name.charAt(0).toUpperCase()}</span>
              <div>
                <p className="eyebrow">STUDENT PROFILE</p>
                <h2>{myStudent.name}</h2>
                <p className="profile-course">{myStudent.course} student <span>·</span> ID #{myStudent.id}</p>
              </div>
            </div>

            <div className="profile-stats">
              <div className="profile-stat">
                <span>Overall mark</span>
                <strong>{myStudent.mark}<small> / 100</small></strong>
                <div className="progress-track"><span style={{ width: `${myStudent.mark}%` }} /></div>
              </div>
              <div className="profile-stat">
                <span>Attendance</span>
                <strong>{myStudent.attendance}<small>%</small></strong>
                <div className="progress-track attendance-progress"><span style={{ width: `${myStudent.attendance}%` }} /></div>
              </div>
            </div>
          </section>
        ) : (
          <p className="empty-message">Your student record is not available.</p>
        )}
      </main>
    </div>
  );
}

export default App;