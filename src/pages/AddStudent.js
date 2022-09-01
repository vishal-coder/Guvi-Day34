import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AppContext } from "./AppContext";
import { useFormik } from "formik";
import * as yup from "yup";

function AddStudent() {
  const { addStudent } = useContext(AppContext);
  const studentValidationSchema = yup.object({
    name: yup.string().required("please Enter name of student"),
    classname: yup.string().required("Please Enter class of student"),
    branch: yup.string().required("Please enter branch of student"),
    address: yup.string().required("please enter address of student"),
  });
  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
        classname: "",
        branch: "",
        address: "",
      },
      validationSchema: studentValidationSchema,
      onSubmit: async (values) => {
        const response = await addStudent(values);
        if (response.status == 201 || response.status == 200) {
          alert("student added successfully");
        }
      },
    });

  return (
    <div>
      <h3>Add student details</h3>
      <Form action="" onSubmit={handleSubmit}>
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
            // id="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Group>
        {touched.classname && errors.classname ? (
          <h6 className="warning">{errors.classname}</h6>
        ) : (
          ""
        )}
        <Form.Group className="mb-3" controlId="formBasicClass">
          <Form.Label>Class</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Class"
            name="classname"
            value={values.classname}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Group>
        {touched.branch && errors.branch ? (
          <h6 className="warning">{errors.branch}</h6>
        ) : (
          ""
        )}
        <Form.Group className="mb-3" controlId="formBasicBranch">
          <Form.Label>Branch</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Branch"
            name="branch"
            value={values.branch}
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

export default AddStudent;
