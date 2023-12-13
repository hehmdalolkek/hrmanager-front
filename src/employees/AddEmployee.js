import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";


const baseUrl = process.env.REACT_APP_BACKEND;

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
          <h2 className='text-center m-4 mb-5'>Добавить сотрудника</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-floating mb-3">
              <input
                type={"text"}
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                id="name"
                placeholder="Enter name of employee"
                name='name'
                {...register("name", {
                  required: "Укажите имя",
                  minLength: { value: 2, message: "Должно содержать минимум 2 символа" },
                  maxLength: { value: 32, message: "Должно содержать максимум 32 символа" }
                })}
              />
              <label htmlFor="name">Имя</label>
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
                  required: "Укажите фамилию",
                  minLength: { value: 2, message: "Должно содержать минимум 2 символа" },
                  maxLength: { value: 32, message: "Должно содержать максимум 32 символа" }
                })}
              />
              <label htmlFor="surname">Фамилия</label>
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
                  required: "Укажите возраст",
                  min: { value: 18, message: "Возраст должен быть не меньше 18 лет" },
                  max: { value: 100, message: "Возраст должен быть не более 100 лет" }
                })}
              />
              <label htmlFor="age">Возраст</label>
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
                  required: "Укажите номер телефона",
                  pattern: { value: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10}$/, message: "Номер телефона должен быть в формате: +7(927)999-99-99" }
                })}
              />
              <label htmlFor="phone">Номер телефона</label>
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
                  required: "Укажите опыт работы",
                  min: { value: 0, message: "Опыт работы не может быть меньше 0" },
                  max: { value: 100, message: "Опыт работы не может быть больше 100" }
                })}
              />
              <label htmlFor="experience">Опыт работы</label>
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
                <option value="">Выберите отдел</option>
                {
                  departments.map((department, index) => (
                    <option key={index} value={department.id}>{department.title}</option>
                  ))
                }
              </select>
              <label for="department">Отдел</label>
              {errors.department && <span className="invalid-feedback">Укажите отдел</span>}
            </div>

            <div className="form-floating mb-3">
              <input
                type={"text"}
                className={`form-control ${errors.salary ? "is-invalid" : ""}`}
                id="salary"
                placeholder="Enter salary of employee"
                name='salary'
                {...register("salary", {
                  required: "Укажите зарплату",
                  min: { value: 0, message: "Зарплата не может быть меньше 0" }
                })}
              />
              <label htmlFor="salary">Зарплата</label>
              {errors.salary && <div className="invalid-feedback">{errors.salary.message}</div>}
            </div>

            <button type='submit' className='btn btn-primary'>Добавить</button>
            <Link className='btn btn-outline-danger mx-2' to="/">Отмена</Link>
          </form>

        </div>
      </div>
    </div>
  )
}