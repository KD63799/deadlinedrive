import React from "react"; // Import React to create the component
import { Formik, Form, Field, ErrorMessage } from "formik"; // Import Formik components for form handling
import * as Yup from "yup"; // Import Yup for schema validation
import { motion } from "framer-motion"; // Import Framer Motion for animations
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import axios from "axios"; // Import axios
import logo from "../../assets/log-in.webp"; // Import logo image
import { Link } from 'react-router-dom';


const SignupForm = () => {
  // Animation parameters for the image
  const imageVariants = {
    hidden: { opacity: 0, x: -50 }, // Image starts hidden and off-screen to the left
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", duration: 1, bounce: 0.3 },
    }, // Image moves to its normal position with a 'spring' effect
  };

  const navigate = useNavigate(); // Use useNavigate to obtain the navigate function

  return (
    <div className="md:min-h-[87vh] flex flex-col p-2 items-center justify-center"> {/* Main container with minimum height, centered content */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8"> {/* Responsive grid for large screens */}
        <motion.div variants={imageVariants} initial="hidden" animate="visible"> {/* Animated component for the image */}
          <img
            src={logo}
            alt="Signup Visual"
            className="w-full object-cover h-40 rounded-xl md:h-full" // Logo image with styles
          />
        </motion.div>
        <div className="p-2"> {/* Container for the form */}
          <h2 className="text-2xl font-bold mb-4">Inscription</h2> {/* Form title */}
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              rememberMe: false,
            }} // Initial form values
            validationSchema={Yup.object({
              firstName: Yup.string().required("Required"),
              lastName: Yup.string().required("Required"),
              email: Yup.string()
                .email("L'adresse e-mail saisie est invalide")
                .required("Ce champ est obligatoire."),
              password: Yup.string()
                .min(6, "Votre mot de passe doit contenir au moins 6 caractères.")
                .required("Ce champ est obligatoire."),
            })} // Validation schema for form fields
            onSubmit={(values, { setSubmitting, setFieldError, resetForm }) => {
              // HTTP POST request to send signup data to the backend using axios
              axios.post(`${import.meta.env.VITE_BACKEND_URL}/users`, values) // Ensure this URL is correct and corresponds to your backend route
                .then(response => {
                  console.log('Inscription réussie:', response.data);
                  resetForm(); // Reset the form
                  navigate('/login'); // Redirect the user to the login page
                })
                .catch(error => {
                  console.error('Erreur lors de l\'inscription:', error);
                  // Handle specific errors
                  setFieldError('general', 'Échec de l\'inscription, veuillez réessayer');
                })
                .finally(() => {
                  setSubmitting(false); // Stop form submission
                });
            }}
          >
            {({ errors, isSubmitting }) => (
              <Form className="flex flex-col"> {/* Form start */}
                <div className="flex justify-between"> {/* Container for first name and last name fields */}
                  <div className="flex-1 mr-2"> {/* Container for first name field */}
                    <label htmlFor="firstName" className="text-left mb-1"> {/* Label for first name field */}
                      Nom
                    </label>
                    <Field
                      name="firstName"
                      type="text"
                      placeholder="Votre Nom"
                      className="p-2 mb-4 border border-gray-300 rounded w-full" // First name field with styles
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-red-500 text-xs mb-2" // Error message for first name field
                    />
                  </div>
                  <div className="flex-1 ml-2"> {/* Container for last name field */}
                    <label htmlFor="lastName" className="text-left mb-1"> {/* Label for last name field */}
                      Prénom
                    </label>
                    <Field
                      name="lastName"
                      type="text"
                      placeholder="Votre Prénom"
                      className="p-2 mb-4 border border-gray-300 rounded w-full" // Last name field with styles
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="text-red-500 text-xs mb-2" // Error message for last name field
                    />
                  </div>
                </div>

                <label htmlFor="email" className="text-left mb-1"> {/* Label for email field */}
                  Adresse Email
                </label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Votre adresse e-mail"
                  className="p-2 mb-4 border border-gray-300 rounded" // Email field with styles
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mb-2" // Error message for email field
                />

                <label htmlFor="password" className="text-left mb-1"> {/* Label for password field */}
                  Mot de passe
                </label>
                <Field
                  name="password"
                  type="password"
                  placeholder="Votre mot de passe"
                  className="p-2 mb-4 border border-gray-300 rounded" // Password field with styles
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs mb-2" // Error message for password field
                />

                <div className="flex items-center mb-4"> {/* Container for remember me checkbox */}
                  <Field type="checkbox" name="rememberMe" className="mr-2" /> {/* Remember me checkbox */}
                  Se souvenir de moi
                </div>

                <button aria-label="Inscription"
                  type="submit"
                  className="bg-custom-main-orange text-white py-2 rounded" // Submit button with styles
                  disabled={isSubmitting} // Disable the button during submission
                >
                  {isSubmitting ? 'En cours...' : 'Inscrivez-vous'}
                </button>

                {errors.general && ( // Display general errors
                  <div className="text-red-500 text-xs mb-2">{errors.general}</div>
                )}

                <div className="mt-4"> {/* Link to login page */}
                  Vous avez déjà un compte?{" "}
                  <Link to="/login" className="text-caramel">
                    Connectez-vous!
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignupForm; // Export SignupForm component for use in other parts of the application