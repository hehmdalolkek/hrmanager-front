import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

export default function Home() {

  const [departments, setDepartments] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    const result = await axios.get("http://localhost:8080/api/departments");
    setDepartments(result.data);
  };

  const deleteDepartment = async (id) => {
    await axios.delete(`http://localhost:8080/api/departments/${id}`);
    loadDepartments();
  };

  return (
    <div className='container'>
      <div className='py-5 col-7 mx-auto'>
          
          {
            departments.map((department, index) => (
              <div key={index} className="border shadow d-flex mb-3 align-items-center">
                <Link className='btn flex-fill py-4 fs-4' to={`/viewdepartment/${department.id}`}>{department.title}</Link>
                <div className='me-4'>
                  <Link className='btn btn-outline-primary me-3' to={`/editdepartment/${department.id}`}>Edit</Link>
                  <button className='btn btn-outline-danger' onClick={() => deleteDepartment(department.id)}>Delete</button>
                </div>
              </div>
            ))
          }

      </div>
    </div>
  )
}
