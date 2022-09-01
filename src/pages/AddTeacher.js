import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AppContext } from "./AppContext";
import { useFormik } from "formik";
import * as yup from "yup";
function AddTeacher() {
  const { addTeacher } = useContext(AppContext);
  const studentValidationSchema = yup.object({
    name: yup.string().required("please Enter name of teacher"),
    department: yup.string().required("Please Enter department of teacher"),
    experience: yup
      .string()
      .required("Please enter experience of teacher in years"),
    address: yup.string().required("please enter address of teacher"),
  });
  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
        department: "",
        experience: "",
        address: "",
      },
      validationSchema: studentValidationSchema,
      onSubmit: async (values) => {
        const response = await addTeacher(values);
        if (response.status == 201 || response.status == 200) {
          alert("student added successfully");
        }
      },
    });

  return (
    <div>
      <h3>Add teacher details</h3>
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
    </div>
  );
}

export default AddTeacher;
