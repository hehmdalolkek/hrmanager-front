import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'


const baseUrl = "http://localhost:8080/api";

export default function ViewEmployee() {

  const [employee, setEmployee] = useState({
    name: "",
    surname: "",
    age: "",
    phone: "",
    experience: "",
    department: {
      id: "",
      title: "",
      description: ""
    },
    salary: ""
  });

  const { id } = useParams();

  const loadEmployee = async () => {
    const result = await axios.get(`${baseUrl}/employees/${id}`);
    setEmployee(result.data);
  };

  useEffect(() => {
    loadEmployee();
  }, []);

  return (
    <div className='container'>
      <div className='row'>

        <div className='col-md-6 mx-auto border shadow p-4 mt-4'>
          <h2 className='text-center m-4'>Employee ID: {employee.id}</h2>

          <div className='col-md-8 mx-auto'>
            <ul className="list-group list-group-flush fs-5">
              <li className="list-group-item">Name: {employee.name}</li>
              <li className="list-group-item">Surname: {employee.surname}</li>
              <li className="list-group-item">Age: {employee.age}</li>
              <li className="list-group-item">Phone: {employee.phone}</li>
              <li className="list-group-item">Experience: {employee.experience}</li>
              <li className="list-group-item">Department: {employee.department.title}</li>
              <li className="list-group-item">Salary: {employee.salary}</li>
            </ul>
          </div>

        </div>

      </div>

      <Link className='btn btn-outline-danger my-4 px-5' to={`/viewdepartment/${employee.department.id}`}>Back</Link>
    </div>
  )
}
