import ChooseTheme from "@components/ChooseTheme/ChooseTheme";
import ChooseAuthor from "@components/ChooseAuthor/ChooseAuthor";
import InspirationalImage from "../assets/prateek-katyal-8Aq6t-Khe5k-unsplash.jpg";
import YoursQuote from "../components/YoursQuotes/YoursQuotes";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function CustomizeQuotes() {
  const [categories, setCategories] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [newQuote, setNewQuote] = useState({ author:"", text: "", id_category:"", id_user: "" });
  const [customAuthor, setCustomAuthor] = useState("");
  const [isCustomAuthorDisabled, setIsCustomAuthorDisabled] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const token = localStorage.getItem('token');
  console.log('token:', token)

  // Fonction pour obtenir l'utilisateur connecté à partir du token
  const getUserFromToken = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      console.log('decodedToken:', decodedToken)
      return decodedToken.sub; // Récupère l'ID utilisateur du token
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const fetchData = async () => {
    try {
      const [resCategories, resQuotes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/categories`),
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/quotes`),
      ]);
      setCategories(resCategories.data);
      setQuotes(resQuotes.data);
    } catch (error) {
      console.error("Error fetching data : ", error);
    }
  };
  
  console.log(categories);
  
  useEffect(() => {
    fetchData();

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  const addQuote = async (newQuote, token) => {
    if (!newQuote.author || !newQuote.text || !newQuote.id_category) {
      setErrorMessage("Tous les champs sont obligatoires.");
      setTimeout(() => setErrorMessage(""), 5000);
      return;
    }

    try {
      const author = customAuthor || newQuote.author;
      const userId = getUserFromToken(token); // Obtenir l'ID utilisateur à partir du token

      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/quotes`, 
        {
        author: author,
        text: newQuote.text,
        id_user: userId,
        id_category: newQuote.id_category
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setQuotes([...quotes, res.data]);
      setSuccessMessage(
        <>Votre citation a été postée avec succès, retrouvez-là dans vos <Link to="/manage-my-quotes" className="text-blue-500 hover:text-blue-700 underline">citations postées.</Link></>
      );
      setTimeout(() => setSuccessMessage(""), 6000);
    } catch (error) {
      setErrorMessage("Erreur lors de la publication de votre citation");
      setTimeout(() => setErrorMessage(""), 5000);
      console.error("Erreur de lors de l'ajout de la citation :", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      addQuote(newQuote, token);
    } else {
      setErrorMessage(
        <>Vous devez être connecté(e) pour créer une citation. <Link to="/login" className="text-blue-500 hover:text-blue-700 underline">Connectez-vous ici.</Link></>);
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };

  return (
    <>
    <motion.div
      initial={{ opacity: 0, x: -50, y: -50 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="flex flex-col max-w-7xl m-auto"
    >
      <h1 className="text-3xl py-6 font-semibold flex justify-center">Crèer une citation</h1>
      <div className="flex flex-row flex-wrap gap-20 px-2 max-sm:gap-0">
        <div className="flex flex-col w-2/5 max-sm:w-full">
          {successMessage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg"
            >
              {successMessage}
            </motion.div>
          )}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
            >
              {errorMessage}
            </motion.div>
          )}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
          >
            <motion.textarea
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              type="text"
              value={newQuote.text}
              onChange={(e) =>
                setNewQuote({
                  ...newQuote,
                  text: e.target.value,
                })
              }
              placeholder="Personnaliser une nouvelle citation"
              className="px-4 py-1 border border-gray-400 rounded-md focus:outline-none focus:border-gray-800 min-h-32 w-full bg-custom-main-orange placeholder:text-slate-100"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ChooseAuthor
                selectedAuthor={newQuote.author}
                onSelectAuthor={(author) => {
                  setNewQuote({
                    ...newQuote,
                    author: author,
                  });
                  setIsCustomAuthorDisabled(author !== "Non trouvé");
                }}
              />
            </motion.div>
            <motion.input
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              type="text"
              value={customAuthor}
              onChange={(e) => setCustomAuthor(e.target.value)}
              placeholder="Si auteur non répertorié"
              className={`px-4 py-1 border border-gray-400 rounded-md focus:outline-none focus:border-gray-800 w-full bg-custom-main-orange placeholder:text-slate-100 ${isCustomAuthorDisabled ? 'disabled-input' : ''}`}
              disabled={isCustomAuthorDisabled}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <ChooseTheme
                selectedTheme={newQuote.id_category}
                onSelectTheme={(id_category) =>
                  setNewQuote({
                    ...newQuote,
                    id_category: id_category,
                  })
                }
              />
            </motion.div>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              type="submit"
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold text-lg py-2 px-4 border border-blue-600 rounded w-24 max-sm:w-full"
            >
              Créer
            </motion.button>
          </form>
        </div>
        <div className="w-2/4 max-sm:w-full">
          <motion.img
            src={InspirationalImage}
            alt="Citation inspirante"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-4 max-h-96 w-screen rounded max-sm:hidden"
          />
        </div>
      </div>
      <YoursQuote />
    </motion.div>
    </>
  );
}
