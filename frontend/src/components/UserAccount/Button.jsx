import React from "react";

 //Component for displaying the button on the Account user interface
function Button({ type, edit, text, disabled }) {
  return (
    <button aria-label="Ouvrir la modal supression de compte"
      type={type}
      onClick={edit}
      disabled={disabled} 
      className="btn hover:bg-gray-600 bg-black bg-dark dark:bg-dark-2 border-dark dark:border-dark-2 border rounded-md inline-flex items-center justify-center py-2 px-5 text-center text-base font-medium text-white hover:bg-body-color hover:border-body-color disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5"
    >
      {text}
    </button>
  );
}

export default Button;
