import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">

          <Link className="navbar-brand" to="/">HRManager</Link>

          <div className="d-flex">
            <Link className="btn btn-outline-light me-2" to='/adddepartment'>Add Department</Link>
            <Link className="btn btn-outline-light" to='/addemployee'>Add Employee</Link>
          </div>
          
        </div>
      </nav>
    </div>
  )
}
