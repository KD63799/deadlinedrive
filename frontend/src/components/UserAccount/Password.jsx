import axios from "axios";
import { useState, useEffect } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

function Password() {
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  }); // State to manage password inputs
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const userId = localStorage.getItem("id");

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      //get user data
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
 // change values of password
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswords({
      ...passwords,
      [name]: value,
    });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSaveClick = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas"); // Set error message if passwords do not match
      return;
    } else if (passwords.newPassword.length <= 5) {
      setErrorMessage("Minimum de 6 caractères pour le mot de passe"); // Set error message if password length is less than 6
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/users/${userId}/password`,
        { ...user, newPassword: passwords }, // Update user password in the backend
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsEditing(false);
      fetchUserData(); // Refresh user data after password change
      setErrorMessage(""); // Clear error message
    } catch (error) {
      console.error("Error updating password:", error);
      setErrorMessage("Erreur lors de la mise à jour du mot de passe");
    }
  };

  const Edit = () => {
    setIsEditing(!isEditing); // Toggle edit mode
  };

  useEffect(() => {
    // Fetch user data on component mount and when userId changes
    fetchUserData();
  }, [userId]);

  return (
    <>
      {user ? ( // Check if user data is available
        <>
          {!isEditing ? ( // Display edit button if not editing
            <div>
              <a
                href="#"
                onClick={Edit}
                className="btn mt-3 mb-4 inline-block shadow-2xl rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Modifier le mot de passe
              </a>
            </div>
          ) : ( // Display password change form if editing
            <div>
              <label className="mb-3 block text-base font-medium text-dark dark:text-white">
                Nouveau Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  placeholder="Nouveau mot de passe"
                  value={passwords.newPassword}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-stroke dark:border-dark-3 py-2 px-3 text-dark-6 outline-none transition focus:border-primary active:border-primary"
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={handleTogglePassword}
                >
                  {showPassword ? ( // Toggle eye icon for password visibility
               <EyeSlashIcon className="h-6 w-6" />
              ) : (
              <EyeIcon className="h-6 w-6" />
                  )}
                </div>
              </div>
              <label className="mb-[10px] block text-base font-medium text-dark dark:text-white">
                Confirmation du nouveau Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirmer le mot de passe"
                  value={passwords.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-3 text-dark-6 outline-none transition focus:border-primary active:border-primary"
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={handleTogglePassword}
                >
                  {showPassword ? ( // Toggle eye icon for password visibility
                 <EyeSlashIcon className="h-6 w-6" />
                  ) : (
                  <EyeIcon className="h-6 w-6" />
                  )}
                </div>
              </div>
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}{" "}
              {/* Display error message if present */}
              <div className="mt-4">
                <button aria-label="Sauvegarder nouveau mot de passe"
                  onClick={handleSaveClick}
                  className="inline-block shadow-2xl rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Sauvegarder
                </button>
                <button
                  onClick={Edit}
                  className="ml-2 inline-block shadow-2xl rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Annuler
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <p>Loading...</p> // Loading state while fetching user data
      )}
    </>
  );
}

export default Password;
