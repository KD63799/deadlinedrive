import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "./Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function FetchData() {
  const [user, setUser] = useState(null);
  const [formValues, setFormValues] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('id');

  // Function to fetch user data from the API
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data);
      setFormValues(response.data); // Set form values to fetched user data
      setError(null);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Failed to fetch user data");
    }
  };

  // Fetch user data when component mounts or userId changes
  useEffect(() => {
    fetchUserData();
  }, [userId]);

  // Function to handle edit mode toggling
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // Function to save edited user data
  const handleSaveClick = async (values, { setSubmitting }) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/users/${userId}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsEditing(false);
      fetchUserData(); // Refetch user data to update the state
      setError(null);
    } catch (error) {
      console.error("Error updating user data:", error);
      setError("Failed to update user data");
    } finally {
      setSubmitting(false);
    }
  };

  //Initializes a Yup schema validation object.
  const validationSchema = Yup.object({
    firstName: Yup.string().required("Ce champ est obligatoire"), //firstName is required
    lastName: Yup.string().required("Ce champ est obligatoire"), //lastName is required
    email: Yup.string()
      .email("Adresse e-mail invalide")
      .required("Ce champ est obligatoire"), //email is required
  });

  return (
    <div>
      {user ? (
        <div>
          {/* Formik wrapper to manage form state, validation, and submission */}
          <Formik
            initialValues={formValues}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={handleSaveClick}
          >
            {({ values, handleChange, isSubmitting }) => (
              <Form>
                <div className="flex flex-wrap max-lg:justify-center gap-3">
                  <div className="flex max-lg:justify-center">
                    <Button aria-label="Editer"
                      type="button"
                      edit={handleEditClick}
                      text={isEditing ? "Annuler" : "Éditer"}
                    />
                  </div>
                  {/* Save button only shown in edit mode */}
                  {isEditing && (
                    <div className="flex max-lg:justify-center">
                      <Button aria-label="Sauvegarder"
                        type="submit"
                        text={"Sauvegarder"}
                        disabled={isSubmitting}
                      />
                    </div>
                  )}
                </div>
                {/* Form fields section */}
                <div className="flex max-lg:justify-center">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 gap-8 flex flex-wrap">
                    <div>
                      <dd className="text-sm leading-6 text-gray-900 bg-neutral-100 p-2 font-semibold">
                        Nom
                      </dd>
                      <dt className="text-sm font-medium leading-6 text-gray-900 mt-4">
                        {/* Conditionally render input or plain text based on edit mode */}
                        {isEditing ? (
                          <Field
                            type="text"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleChange}
                            className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary"
                          />
                        ) : (
                          `${user.firstName}`
                        )}
                        {/* Display validation error messages */}
                        <ErrorMessage
                          name="firstName"
                          component="div"
                          className="text-red-600"
                        />
                      </dt>
                    </div>
                    <div>
                      <dd className="text-sm font-medium leading-6 text-gray-900 bg-neutral-100 font-semibold p-2">
                        Prénom
                      </dd>
                      <dt className="text-sm font-medium leading-6 text-gray-900 mt-4">
                        {/* Conditionally render input or plain text based on edit mode */}
                        {isEditing ? (
                          <Field
                            type="text"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary"
                          />
                        ) : (
                          `${user.lastName}`
                        )}
                        {/* Display validation error messages */}
                        <ErrorMessage
                          name="lastName"
                          component="div"
                          className="text-red-600"
                        />
                      </dt>
                    </div>
                    <div>
                      <dd className="font-semibold text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 bg-neutral-100 p-2">
                        Adresse email
                      </dd>
                      <dt className="text-sm font-medium leading-6 text-gray-900 mt-4">
                        {/* Conditionally render input or plain text based on edit mode */}
                        {isEditing ? (
                          <Field
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            className=" w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary"
                          />
                        ) : (
                          user.email
                        )}
                        {/* Display validation error messages */}
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-600"
                        />
                      </dt>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          {/* Display error message if there is an error */}
          {error && <p className="text-red-600">{error}</p>}
        </div>
      ) : (
        // Render loading message if user data is not yet available
        <p>Loading...</p>
      )}
    </div>
  );
}

export default FetchData;
