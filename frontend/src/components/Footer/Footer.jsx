import React from 'react'; // Import React to create the component
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation

const Footer = () => {
  return (
    <footer className="bg-custom-main-orange text-center py-4"> {/* Footer with custom orange background, centered text, and vertical padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> {/* Centered container with max width and horizontal padding */}
        <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4"> {/* Flex container with column layout for mobile and row layout for desktop */}
          <Link to="/legal-notice" className="text-custom-black font-bold hover:text-gray-200"> {/* Link to the legal notice page */}
            Mentions Légales
          </Link>
          <span className="text-custom-black"> {/* Text indicating copyright */}
            Deadline Drive 2024@ Tous droits réservés.
          </span>
          <Link to="/privacy-policy" className="text-custom-black font-bold hover:text-gray-200"> {/* Link to the privacy policy page */}
            Politique de confidentialité
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer; // Export Footer component for use in other parts of the application
