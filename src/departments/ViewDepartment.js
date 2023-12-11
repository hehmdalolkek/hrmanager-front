import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
require('dotenv').config();

const baseUrl = process.env.BACKEND;

export default function ViewDepartment() {

  // Department

  const [department, setDepartment] = useState({
    title: "",
    description: ""
  });

  const loadDepartment = async () => {
    const result = await axios.get(`${baseUrl}/departments/${id}`);
    setDepartment(result.data);
  };

  // Employees

  const [employees, setEmployees] = useState([]);

  const loadEmployees = async () => {
    const result = await axios.get(`${baseUrl}/employees/department/${id}`);
    setEmployees(result.data);
  };

  const deleteEmployee = async (id) => {
    await axios.delete(`${baseUrl}/employees/${id}`);
    loadEmployees();
  };

  // All

  const { id } = useParams();

  useEffect(() => {
    loadDepartment();
    loadEmployees();
  }, []);


  return (
    <div className='container'>
      <div className='row'>

        <div className='col-md-9 mx-auto border shadow p-4 mt-4'>
          <h2 className='text-center m-4'>Department: {department.title}</h2>

          <div className='col-md-8 mx-auto'>
            <b>Description:</b>
            <p>{department.description}</p>
          </div>
        </div>

        <div className='py-4 col-md-7 mx-auto'>
          {
            employees.map((employee, index) => (
              <div key={index} className="border shadow d-flex mb-3 align-items-center">
                <Link className='btn flex-fill py-4 fs-4' to={`/viewemployee/${employee.id}`}>{employee.name} {employee.surname}</Link>
                <div className='me-4'>
                  <Link className='btn btn-outline-primary me-3' to={`/editemployee/${employee.id}`}>Edit</Link>
                  <button className='btn btn-outline-danger' onClick={() => deleteEmployee(employee.id)}>Delete</button>
                </div>
              </div>
            ))
          }

          <Link className='btn btn-outline-danger my-3 px-5' to={"/"}>Back</Link>
        </div>

      </div>
    </div>
  )
}
