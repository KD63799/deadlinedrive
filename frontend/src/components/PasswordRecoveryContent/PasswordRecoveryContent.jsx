import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import logo from "../../assets/Logo-Deadlines.svg";
import { motion } from 'framer-motion';


const PasswordRecoverySchema = Yup.object().shape({
  email: Yup.string()
    .email('Adresse email invalide')
    .required('L’email est requis'),
});

const PasswordRecoveryContent = ({ onRecoverPassword }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 md:p-24 w-full min-h-[85.5vh]">
      <div className="relative flex flex-col items-center border rounded-md border-butterscotch p-8 md:p-12 w-full max-w-4xl">
      <motion.img
  src={logo}
  className="absolute bg-white -left-[30px] -top-[70px] w-24"
  alt="deadlinedrive logo"
  animate={{ rotate: 360 }}
  transition={{ duration: 3, loop: Infinity, ease: "linear" }}
/>
        <Formik
          initialValues={{ email: '' }}
          validationSchema={PasswordRecoverySchema}
          onSubmit={(values, { setSubmitting }) => {
            onRecoverPassword(values.email);
            setSubmitting(false);
          }}
        >
          {({ errors, touched }) => (
            <Form className="w-full max-w-lg">
              <label htmlFor="email" className="block text-sm text-center font-bold text-gray-700">
                Votre Adresse email
              </label>
              <Field
                type="email"
                name="email"
                placeholder="Email..."
                className={`mt-1 p-2 block w-full shadow-sm sm:text-sm border ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-indigo-500 focus:border-indigo-500`}
              />
              {errors.email && touched.email ? (
                <div className="text-red-500 text-xs mt-1">{errors.email}</div>
              ) : null}
              <button aria-label="Récuperer mot de passe"
                type="submit"
                className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-butterscotch hover:bg-caramel focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Envoyer
              </button>
            </Form>
          )}
        </Formik>
        <p className="mt-2 text-sm text-center text-gray-600">
          Entrez votre adresse e-mail pour récupérer votre mot de passe.
        </p>
      </div>
    </div>
  );
};

export default PasswordRecoveryContent;