// Importation des bibliothèques React et des hooks nécessaires
// Importation de React pour pouvoir utiliser JSX et les fonctionnalités de React
import React, { createContext, useContext, useState, useEffect } from "react"; // Import React library
import { Route, Routes } from "react-router-dom"; // Import necessary components from react-router-dom for routing

// Import the components for the different pages
import Home from "./pages/Home";
import CitationHome from "./pages/CitationHome";
import Quotes from "./pages/Quotes";
import PasswordRecovery from "./pages/PasswordRecovery";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Calendar from "./pages/Calendar";
import UserAccount from "./pages/UserAccount";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import LegalNotice from "./pages/LegalNotice";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import UserAccountProps from "@components/UserAccount/UserAccountProps";
import ManageMyQuotes from "./pages/ManageMyQuotes";

// Import Navbar and Footer
import NavBar from "@components/NavBar/NavBar";
import Footer from "@components/Footer/Footer";

//`createContext` est utilisé pour créer un contexte pour le partage d'état dans une hiérarchie de composants
const PostsContext = createContext();
// Création et exportation d'un hook personnalisé `PostsQuotes` pour utiliser le contexte
// `useContext` est utilisé pour consommer le contexte créé avec `createContext`
export const PostsQuotes = () => useContext(PostsContext);

function App() {
  return (
    // Set up the Router to handle routing within the app
    <PostsContext.Provider
      //Ajouter vos composants dans le router pour la réutilisation de vos props dans chaque pages.
      value={{
        UserAccountProps,
      }}
    >
      <NavBar />
      <main>
        <Routes>
          {/* Define routes for each page */}
          <Route path="/" element={<Home />} /> {/* Route for the home page */}
          <Route path="/customize-quotes" element={<CitationHome />} />{" "}
          {/* Route for customizing quotes page */}
          <Route path="/quotes" element={<Quotes />} />{" "}
          {/* Route for quotes page */}
          <Route
            path="/password-recovery"
            element={<PasswordRecovery />}
          />{" "}
          {/* Route for password recovery page */}
          <Route path="/signup" element={<Signup />} />{" "}
          {/* Route for login page */}
          <Route path="/login" element={<Login />} />{" "}
          {/* Route for signup page */}
          <Route path="/about" element={<About />} />{" "}
          {/* Route for about page */}
          <Route path="/deadlines" element={<Calendar />} />{" "}
          {/* Route for calendar page */}
          <Route path="/user-account" element={<UserAccount />} />{" "}
          {/* Route for user account page */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />{" "}
          {/* Route for privacy policy page */}
          <Route path="/legal-notice" element={<LegalNotice />} />{" "}
          {/* Route for legal notice page */}
          <Route path="/contact" element={<Contact />} />{" "}
          {/* Route for legal notice page*/}
          <Route path="/manage-my-quotes" element={<ManageMyQuotes />} />{" "}
          {/* Route for legal notice page*/}
          <Route path="*" element={<NotFound />} />{" "}
          {/* Route for handling 404 Not Found */}
        </Routes>
      </main>
      <Footer />
    </PostsContext.Provider>
  );
}

export default App; // Export the App component as default
