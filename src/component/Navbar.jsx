import React from 'react';

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'));

  const logout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  // Redirect to login page if user is not logged in
  if (!user) {
    window.location.href = '/login';
  }

  // Function to check if the user has a specific role
  const hasRole = (roleToCheck) => user && user.role === roleToCheck;

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light rounded">
        <a className="navbar-brand" href="/dashboard">
          POS System
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/dashboard">
                Home
              </a>
            </li>
            {hasRole('1005') && (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/manage-items">
                    Manage Items
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/manage-categories">
                    Manage Categories
                  </a>
                </li>
              </>
            )}
            {/*{hasRole('1001') && (
              <li className="nav-item">
                <a className="nav-link" href="/sales">
                  Sales
                </a>
              </li>
            )}*/}
          </ul>
        </div>

        {user && (
          <div className="ml-auto">
            <span className="navbar-text mr-3">
              Welcome, {user.username}
            </span>
            <button
              className="btn btn-link nav-item bg-dark p-2 nav-link"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    </div>
  );
}
