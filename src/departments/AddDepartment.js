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
          <h2 className='text-center m-4 mb-5'>Add department</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-floating mb-3">
              <input
                type={"text"}
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                id="title"
                name='title'
                placeholder="Enter title of department"
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
                id="description"
                name='description'
                placeholder="Enter description of department"
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
            <button type="submit" className="btn btn-primary me-2">Submit</button>
            <Link type="button" className="btn btn-outline-danger" to="/">Cancel</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

// import axios from 'axios';
// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom';
// import { useForm } from "react-hook-form";

// export default function AddDepartment() {

//   // validate

//   const { register, handleSubmit, formState: { errors } } = useForm();

//   // 

//   let navigate = useNavigate();

//   const [department, setDepartment] = useState({
//     title: "",
//     description: ""
//   });

//   const { title, description } = department;

//   const onInputChange = (event) => {
//     setDepartment({ ...department, [event.target.name]: event.target.value });
//   };

//   const onSubmit = async (event) => {
//     event.preventDefault();
//     await axios.post("http://localhost:8080/api/departments", department);
//     navigate("/");
//   };


//   return (
//     <div className='container'>
//       <div className='row'>
//         <div className='col-md-6 offset-md-3 border shadow p-4 mt-4'>
//           <h2 className='text-center m-4 mb-5'>Add department</h2>

//           <form onSubmit={(event) => handleSubmit(onSubmit(event))}>
//             <div className="form-floating mb-3">
//               <input
//                 type={"text"}
//                 className="form-control"
//                 id="title"
//                 placeholder="Enter title of department"
//                 name='title'
//                 defaultValue={title}
//                 onChange={(event) => onInputChange(event)}
//                 {...register("title", {
//                   required: "Title is required",
//                   minLength: { value: 2, message: "Title must be at least 2 characters" },
//                   maxLength: { value: 128, message: "The title must be no more than 128 characters" }
//                 })}
//               />
//               <label htmlFor="title">Title</label>
//               {errors.title && <p>{errors.title.message}</p>}
//             </div>

//             <div className="form-floating mb-3">
//               <textarea
//                 className="form-control"
//                 placeholder="Enter descripion of department"
//                 id="description"
//                 name='description'
//                 onChange={(event) => onInputChange(event)}
//                 style={{ height: 120 }}
//                 defaultValue={description}>
//               </textarea>
//               <label htmlFor="description">Description</label>
//             </div>

//             <button type='submit' className='btn btn-primary'>Submit</button>
//             <Link className='btn btn-outline-danger mx-2' to="/">Cancel</Link>
//           </form>

//         </div>
//       </div>
//     </div>
//   )
// }