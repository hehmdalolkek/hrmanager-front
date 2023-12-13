import axios from 'axios';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";


const baseUrl = process.env.REACT_APP_BACKEND;

export default function AddDepartment() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  
  let navigate = useNavigate();

  const onSubmit = async (data) => {
    await axios.post(`${baseUrl}/departments`, data);
    navigate("/");
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border shadow p-4 mt-4'>
          <h2 className='text-center m-4 mb-5'>Добавить отдел</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-floating mb-3">
              <input
                type={"text"}
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                id="title"
                name='title'
                placeholder="Enter title of department"
                {...register("title", {
                  required: "Укажите название",
                  minLength: { value: 2, message: "Должно содержать минимум 2 символа" },
                  maxLength: { value: 128, message: "Должно содержать максимум 128 символов" }
                })}
              />
              <label htmlFor="title">Название</label>
              {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
            </div>

            <div className="form-floating mb-3">
              <textarea
                className={`form-control ${errors.description ? "is-invalid" : ""}`}
                id="description"
                name='description'
                placeholder="Enter description of department"
                style={{ height: 120 }}
                {...register("description", {
                  required: "Укажите описание",
                  minLength: { value: 2, message: "Должно содержать минимум 2 символа" },
                  maxLength: { value: 255, message: "Должно содержать максимум 255 символов" }
                })}
              ></textarea>
              <label htmlFor="description">Описание</label>
              {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
            </div>
            <button type="submit" className="btn btn-primary me-2">Добавить</button>
            <Link type="button" className="btn btn-outline-danger" to="/">Отменить</Link>
          </form>
        </div>
      </div>
    </div>
  );
};