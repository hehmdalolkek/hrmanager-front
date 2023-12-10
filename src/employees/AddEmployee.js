import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";


const baseUrl = "http://localhost:8080/api"

export default function AddEmployee() {

  const [departments, setDepartments] = useState([]);

  const { register, handleSubmit, formState: { errors } } = useForm();

  let navigate = useNavigate();

  const loadDepartments = async () => {
    const result = await axios.get(`${baseUrl}/departments`);
    setDepartments(result.data);
  };

  const onSubmit = async (data) => {
    await axios.post(`${baseUrl}/employees`, data);
    navigate("/");
  };

  useEffect(() => {
    loadDepartments();
  }, []);



  return (

    <div className='container mb-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border shadow p-4 mt-4'>
          <h2 className='text-center m-4 mb-5'>Add employee</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-floating mb-3">
              <input
                type={"text"}
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                id="name"
                placeholder="Enter name of employee"
                name='name'
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 2, message: "Name must be at least 2 characters" },
                  maxLength: { value: 32, message: "The name must be no more than 32 characters" }
                })}
              />
              <label htmlFor="name">Name</label>
              {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
            </div>

            <div className="form-floating mb-3">
              <input
                type={"text"}
                className={`form-control ${errors.surname ? "is-invalid" : ""}`}
                id="surname"
                placeholder="Enter surname of employee"
                name='surname'
                {...register("surname", {
                  required: "Surname is required",
                  minLength: { value: 2, message: "Surname must be at least 2 characters" },
                  maxLength: { value: 32, message: "The surname must be no more than 32 characters" }
                })}
              />
              <label htmlFor="surname">Surname</label>
              {errors.surname && <div className="invalid-feedback">{errors.surname.message}</div>}
            </div>

            <div className="form-floating mb-3">
              <input
                type={"number"}
                className={`form-control ${errors.age ? "is-invalid" : ""}`}
                id="age"
                placeholder="Enter age of employee"
                name='age'
                {...register("age", {
                  required: "Age is required",
                  min: { value: 18, message: "Age must not be under 18" },
                  max: { value: 100, message: "Age must not be more than 100" }
                })}
              />
              <label htmlFor="age">Age</label>
              {errors.age && <div className="invalid-feedback">{errors.age.message}</div>}
            </div>

            <div className="form-floating mb-3">
              <input
                type={"text"}
                className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                id="phone"
                placeholder="Enter phone number of employee"
                name='phone'
                {...register("phone", {
                  required: "Phone is required",
                  pattern: { value: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10}$/, message: "The phone number must be in the format +7(927)999-99-99" }
                })}
              />
              <label htmlFor="phone">Phone number</label>
              {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
            </div>

            <div className="form-floating mb-3">
              <input
                type={"number"}
                className={`form-control ${errors.experience ? "is-invalid" : ""}`}
                id="experience"
                placeholder="Enter experience of employee"
                name='experience'
                {...register("experience", {
                  required: "Experience is required",
                  min: { value: 0, message: "Experience cannot be less than 0" },
                  max: { value: 100, message: "Experience cannot be more than 100" }
                })}
              />
              <label htmlFor="experience">Experience</label>
              {errors.experience && <div className="invalid-feedback">{errors.experience.message}</div>}
            </div>

            <div className="form-floating mb-3">
              <select
                className={`form-select ${errors.department ? "is-invalid" : ""}`}
                aria-label="Department"
                name="department"
                id="department"
                {...register("department.id", {
                  required: true 
                })}
              >
                <option value="">Select department</option>
                {
                  departments.map((department, index) => (
                    <option key={index} value={department.id}>{department.title}</option>
                  ))
                }
              </select>
              <label for="department">Department</label>
              {errors.department && <span className="text-danger">Department is required</span>}
            </div>

            <div className="form-floating mb-3">
              <input
                type={"text"}
                className={`form-control ${errors.salary ? "is-invalid" : ""}`}
                id="salary"
                placeholder="Enter salary of employee"
                name='salary'
                {...register("salary", {
                  required: "salary is required",
                  min: { value: 0, message: "Salary cannot be less than 0" }
                })}
              />
              <label htmlFor="salary">Salary</label>
              {errors.salary && <div className="invalid-feedback">{errors.salary.message}</div>}
            </div>

            <button type='submit' className='btn btn-primary'>Submit</button>
            <Link className='btn btn-outline-danger mx-2' to="/">Cancel</Link>
          </form>

        </div>
      </div>
    </div>
  )
}