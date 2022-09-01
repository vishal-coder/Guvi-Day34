import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "./AppContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

function EditTeacher() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getTeacher, teacher } = useContext(AppContext);

  useEffect(() => getTeacher(id), []);

  return teacher ? <EditTeacherForm teacher={teacher} /> : "Loading...";
}

function EditTeacherForm({ teacher }) {
  const { addTeacher } = useContext(AppContext);
  const navigate = useNavigate();
  const studentValidationSchema = yup.object({
    name: yup.string().required("please Enter name of teacher"),
    department: yup.string().required("Please Enter department of teacher"),
    experience: yup
      .string()
      .required("Please enter experience of teacher in years"),
    address: yup.string().required("please enter address of teacher"),
  });
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    resetForm,
  } = useFormik({
    initialValues: {
      name: teacher.name,
      department: teacher.department,
      experience: teacher.experience,
      address: teacher.address,
    },
    validationSchema: studentValidationSchema,
    onSubmit: async (values) => {
      const response = await fetch(
        `https://631056a836e6a2a04eeb6c08.mockapi.io/Teacher/${teacher.id}`,
        {
          method: "PUT",
          body: JSON.stringify(values),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status == 201 || response.status == 200) {
        alert("student added successfully");
        navigate("/showTeacher");
      }
    },
  });
  return (
    <div>
      <h3>edit teacher details</h3>
      {teacher ? (
        <Form onSubmit={handleSubmit}>
          {touched.name && errors.name ? (
            <h6 className="warning">{errors.name}</h6>
          ) : (
            ""
          )}
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>
          {touched.department && errors.department ? (
            <h6 className="warning">{errors.department}</h6>
          ) : (
            ""
          )}
          <Form.Group className="mb-3" controlId="formBasicClass">
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Class"
              name="department"
              value={values.department}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>
          {touched.experience && errors.experience ? (
            <h6 className="warning">{errors.experience}</h6>
          ) : (
            ""
          )}
          <Form.Group className="mb-3" controlId="formBasicBranch">
            <Form.Label>Experience</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Branch"
              name="experience"
              value={values.experience}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>
          {touched.address && errors.address ? (
            <h6 className="warning">{errors.address}</h6>
          ) : (
            ""
          )}
          <Form.Group className="mb-3" controlId="formBasicAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Address"
              name="address"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      ) : (
        "Leading.."
      )}
    </div>
  );
}

export default EditTeacher;
