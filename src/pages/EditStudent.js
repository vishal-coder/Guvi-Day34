import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "./AppContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

function EditStudent() {
  const { id } = useParams();
  const { getStudent, student } = useContext(AppContext);

  useEffect(() => getStudent(id), []);

  return student ? <EditStudentForm student={student} /> : "Loading...";
}
function EditStudentForm({ student }) {
  const navigate = useNavigate();
  const studentValidationSchema = yup.object({
    name: yup.string().required("please Enter name of student"),
    classname: yup.string().required("Please Enter class of student"),
    branch: yup.string().required("Please enter branch of student"),
    address: yup.string().required("please enter address of student"),
  });
  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        name: student.name,
        classname: student.classname,
        branch: student.branch,
        address: student.address,
      },
      validationSchema: studentValidationSchema,
      onSubmit: async (values) => {
        const response = await fetch(
          `https://631056a836e6a2a04eeb6c08.mockapi.io/student/${student.id}`,
          {
            method: "PUT",
            body: JSON.stringify(values),
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.status == 201 || response.status == 200) {
          alert("student edited successfully");
          navigate("/showStudent");
        }
      },
    });

  return (
    <div>
      <h3>edit student details</h3>
      {student ? (
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
      ) : (
        "loading"
      )}
    </div>
  );
}

export default EditStudent;
