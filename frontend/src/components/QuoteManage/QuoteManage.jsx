import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";

export default function QuoteManage() {
  const [myQuotes, setMyQuotes] = useState([]);
  const [category, setCategory] = useState([]);
  const [quoteCategory, setQuoteCategory] = useState([]);
  const [editingQuote, setEditingQuote] = useState(null);
  const [updatedText, setUpdatedText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const token = localStorage.getItem('token');

  const getUserFromToken = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.sub; // Récupère l'ID utilisateur du token
    } catch (error) {
      console.error("Erreur lors du décodage du token :", error);
      return null;
    }
  };

  const fetchMyQuotes = async () => {
    try {
      const userId = getUserFromToken(token);
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/quotes/by-user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMyQuotes(res.data[0]);
      console.log(res.data[0]);
    } catch (error) {
      console.error("Erreur lors de la récupération de mes citations :", error);
    }
  };

  const fetchData = async () => {
    try {
      const [resCategory, resQuoteCategory] = await Promise.all([
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/categories`),
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/quote_category`),
      ]);
      setCategory(resCategory.data);
      setQuoteCategory(resQuoteCategory.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };

  useEffect(() => {
    fetchMyQuotes();
    fetchData();
  }, []);

  const getCategoryName = (quoteId) => {
    const quoteCat = quoteCategory.find((qc) => qc.id_quote === quoteId);
    if (quoteCat) {
      const categories = category.find(
        (cat) => cat.id === quoteCat.id_category
      );
      return categories ? categories.name : "Catégorie inconnue";
    }
    return "Pas de catégorie";
  };

  const handleEditQuote = (quote) => {
    setEditingQuote(quote);
    setUpdatedText(quote.text);
  };

  const handleUpdateQuote = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/quotes/${editingQuote.id}`,
        { text: updatedText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMessage("Citation mise à jour avec succès !");
      setTimeout(() => setSuccessMessage(""), 5000);
      setEditingQuote(null);
      fetchMyQuotes();
    } catch (error) {
      setErrorMessage("Erreur lors de la mise à jour de la citation.");
      setTimeout(() => setErrorMessage(""), 5000);
      console.error("Erreur lors de la mise à jour de la citation :", error);
    }
  };

  const handleDeleteQuote = async (quoteId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/quotes/${quoteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccessMessage("Citation supprimée avec succès !");
      setTimeout(() => setSuccessMessage(""), 5000);
      fetchMyQuotes();
    } catch (error) {
      setErrorMessage("Erreur lors de la suppression de la citation.");
      setTimeout(() => setErrorMessage(""), 5000);
      console.error("Erreur lors de la suppression de la citation :", error);
    }
  };

  return (
    <div className="flex flex-col max-w-7xl m-auto py-6">
      <h1 className="text-3xl py-6 font-semibold flex justify-center">Mes citations</h1>
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
      <div className="flex flex-wrap flex-row gap-9">
        {myQuotes.length === 0 ? (
          <p>Aucune citation trouvée.</p>
        ) : (
          myQuotes.map((quote) => (
            <motion.article
              key={quote.id}
              className="mb-4 p-4 border-2 rounded-md border-custom-main-orange shadow w-96 min-h-80 flex flex-col hover:bg-slate-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
            >
              <h2 className="text-xl font-bold">Citation n°{quote.id}</h2>
              <p className="mt-1 pb-4">
                {quote.text.length > 89
                  ? `${quote.text.substring(0, 88)} [...]`
                  : quote.text}
              </p>
              <hr className="w-3/4 border border-black" />
              <p className="mt-3 text-xl font-semibold">Tirée de</p>
              <p className="mt-2 pb-4">{quote.author}</p>
              <hr className="w-3/4 border border-black" />
              <p className="mt-3 text-xl font-semibold">Catégorie</p>
              <p className="mt-2 pb-4">{getCategoryName(quote.id)}</p>
              <footer
                className="mt-4 text-lg font-semibold flex justify-between mt-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <section
                  className="flex border-2 border-dashed border-custom-main-orange rounded p-px px-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <p className="text-2xl px-1">{quote.vote}</p>
                </section>
                <button
                  className="rounded bg-purple-400 hover:bg-african-violet w-1/3 text-white font-normal cursor-pointer"
                  onClick={() => handleEditQuote(quote)}
                >
                  Modifier
                </button>
                <button
                  className="rounded bg-red-600 hover:bg-red-400 w-1/3 text-white font-normal cursor-pointer"
                  onClick={() => handleDeleteQuote(quote.id)}
                >
                  Supprimer
                </button>
              </footer>
            </motion.article>
          ))
        )}
      </div>
      {editingQuote && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4">Modifier la citation</h2>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="4"
              value={updatedText}
              onChange={(e) => setUpdatedText(e.target.value)}
            />
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="rounded bg-gray-400 hover:bg-gray-600 text-white py-2 px-4"
                onClick={() => setEditingQuote(null)}
              >
                Annuler
              </button>
              <button
                className="rounded bg-blue-500 hover:bg-blue-700 text-white py-2 px-4"
                onClick={handleUpdateQuote}
              >
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
