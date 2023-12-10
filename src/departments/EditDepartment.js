import axios from 'axios';
import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";


const baseUrl = "http://localhost:8080/api";

export default function EditDepartment() {

  let navigate = useNavigate();

  const { id } = useParams();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const loadDepartment = async () => {
    const result = await axios.get(`${baseUrl}/departments/${id}`);
    setValue('title', result.data.title);
    setValue('description', result.data.description);
  };

  const onSubmit = async (data) => {
    await axios.put(`${baseUrl}/departments/${id}`, data);
    navigate("/");
  };

  useEffect(() => {
    loadDepartment();
  }, []);

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border shadow p-4 mt-4'>
          <h2 className='text-center m-4 mb-5'>Edit department</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-floating mb-3">
              <input
                type={"text"}
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                id="title"
                placeholder="Enter title of department"
                name='title'
                {...register("title", {
                  required: "Title is required",
                  minLength: { value: 2, message: "Title must be at least 2 characters" },
                  maxLength: { value: 128, message: "The title must be no more than 128 characters" }
                })}
              />
              <label htmlFor="title">Title</label>
              {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
            </div>

            <div className="form-floating mb-3">
              <textarea
                className={`form-control ${errors.description ? "is-invalid" : ""}`}
                placeholder="Enter descripion of department"
                id="description"
                name='description'
                style={{ height: 120 }}
                {...register("description", {
                  required: "Description is required",
                  minLength: { value: 2, message: "Description must be at least 2 characters" },
                  maxLength: { value: 255, message: "The description must be no more than 256 characters" }
                })}
              ></textarea>
              <label htmlFor="description">Description</label>
              {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
            </div>

            <button type='submit' className='btn btn-primary'>Submit</button>
            <Link className='btn btn-outline-danger mx-2' to="/">Cancel</Link>
          </form>

        </div>
      </div>
    </div>
  )
}

