import React from "react"; // Import React to create the component
import { Formik, Form, Field, ErrorMessage } from "formik"; // Import Formik components for form handling
import * as Yup from "yup"; // Import Yup for schema validation
import { motion } from "framer-motion"; // Import Framer Motion for animations
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import axios from "axios"; // Import axios
import logo from "../../assets/log-in.webp"; // Import logo image
import { Link } from 'react-router-dom';

const LoginForm = () => {
  // Animation parameters for the image
  const imageVariants = {
    hidden: { opacity: 0, x: -50 }, // Image starts hidden and off-screen to the left
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", duration: 2, bounce: 0.3 },
    }, // Image moves to its normal position with a 'spring' effect
  };

  const navigate = useNavigate(); // Use useNavigate to obtain the navigate function

  return (
    <div className="md:min-h-[87.5vh] flex flex-col p-2 items-center justify-center"> {/* Main container with minimum height, centered content */}
      <div className="max-w-6xl m-auto grid md:grid-cols-2 gap-8"> {/* Responsive grid for large screens */}
        <motion.div variants={imageVariants} initial="hidden" animate="visible"> {/* Animated component for the image */}
          <img
            src={logo}
            alt="Login Visual"
            className="w-full object-cover h-40 rounded-xl md:h-full" // Logo image with styles
          />
        </motion.div>
        <div className="p-2"> {/* Container for the form */}
          <h2 className="text-2xl font-bold mb-4">Connexion</h2> {/* Form title */}
          <Formik
            initialValues={{ email: "", password: "", rememberMe: false }} // Initial form values
            validationSchema={Yup.object({
              email: Yup.string()
                .email("L'adresse e-mail saisie est invalide")
                .required("Ce champ est obligatoire."), // Validation schema for email field
              password: Yup.string()
                .min(6, "Votre mot de passe doit contenir au moins 6 caractères.")
                .required("Ce champ est obligatoire."), // Validation schema for password field
            })} 
            onSubmit={(values, { setSubmitting, setFieldError, resetForm }) => {
              // HTTP POST request to send login data to the backend using axios
              axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/login`, values) // Ensure this URL is correct and corresponds to your backend route
                .then(response => {
                  const data = response.data;
                  console.log('Connexion réussie:', data);
                  // Here, you could redirect the user or perform other actions like storing the token
                  localStorage.setItem('token', data.token);
                  localStorage.setItem('id', data.user.id);
                  localStorage.setItem('firstName', data.user.firstName);
                  localStorage.setItem('lastName', data.user.lastName);
                  localStorage.setItem('email', data.user.email);

                  resetForm(); // Reset the form
                  navigate('/deadlines'); // Redirect the user to the homepage
                })
                .catch(error => {
                  console.error('Erreur lors de la connexion:', error);
                  // Handle specific errors
                  setFieldError('general', 'Échec de la connexion, vérifiez vos identifiants');
                })
                .finally(() => {
                  setSubmitting(false); // Stop form submission
                });
            }}
          >
            {({ errors, isSubmitting }) => (
              <Form className="flex flex-col"> {/* Form start */}
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
                <div className="text-left text-gray-500 text-xs mb-4">
                  Votre mot de passe doit être une combinaison d'au moins 6 lettres, chiffres et symboles.
                </div>

                <div className="flex justify-between items-center mb-4"> {/* Container for checkbox and forgot password link */}
                  <label className="flex items-center">
                    <Field type="checkbox" name="rememberMe" className="mr-2" /> {/* Remember me checkbox */}
                    Se souvenir de moi
                  </label>
                  <Link to ="/password-recovery" className="text-caramel"> {/* Forgot password link */}
                    Mot de passe oublié?
                  </Link>
                </div>

                <button aria-label="Connexion"
                  type="submit"
                  className="bg-butterscotch text-white py-2 rounded flex items-center justify-center" // Submit button with styles
                  disabled={isSubmitting} // Disable the button during submission
                >
                  {isSubmitting ? (
                    <svg className="animate-spin h-5 w-5 text-custom-main-orange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                  ) : (
                    "Connexion"
                  )}
                </button>

                {errors.general && ( // Display general errors
                  <div className="text-red-500 text-xs mb-2">{errors.general}</div>
                )}

                <div className="mt-4"> {/* Link to sign-up page */}
                  Vous n'avez pas encore de compte?{" "}
                  <Link to ="/signup" className="text-caramel">
                    Créez-en un dès maintenant !
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

export default LoginForm; // Export LoginForm component for use in other parts of the application