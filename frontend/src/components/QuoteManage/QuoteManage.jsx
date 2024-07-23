import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { AnimatePresence,motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import { XMarkIcon } from "@heroicons/react/24/solid";
import getCategoryName from "@services/getCategoryName";

export default function QuoteManage() {
  const [myQuotes, setMyQuotes] = useState([]);
  const [category, setCategory] = useState([]);
  const [quoteCategory, setQuoteCategory] = useState([]);
  const [editingQuote, setEditingQuote] = useState(null);
  const [updatedText, setUpdatedText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);

  const token = localStorage.getItem("token");

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
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/quotes/by-user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/quotes/${quoteId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMessage("Citation supprimée avec succès !");
      setTimeout(() => setSuccessMessage(""), 5000);
      fetchMyQuotes();
    } catch (error) {
      setErrorMessage("Erreur lors de la suppression de la citation.");
      setTimeout(() => setErrorMessage(""), 5000);
      console.error("Erreur lors de la suppression de la citation :", error);
    }
  };

  const handleOpenModal = (quote) => {
    setSelectedQuote(quote);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedQuote(null);
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleCloseModal();
    }
  };

  const modalRef = useRef(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 2, ease: "easeOut" }}
      className="flex flex-col max-w-7xl m-auto py-6 p-4 sm:p-6"
    >
      {" "}
      <h1 className="text-3xl py-6 font-semibold flex justify-center">
        Mes citations
      </h1>
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
              className="mb-4 p-4 border-2 rounded-md border-custom-main-orange shadow w-full sm:w-1/2 md:w-96 lg:w-96 xl:w-96 flex flex-col hover:bg-slate-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleOpenModal(quote)}
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
              <p className="mt-2 pb-4">{getCategoryName(quote.id, quoteCategory, category)}</p>
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
                  className="rounded bg-blue-500 hover:bg-blue-400 w-1/3 text-white font-normal cursor-pointer"
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
      <AnimatePresence>
        {isModalOpen && selectedQuote && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/50"
            onClick={handleClickOutside}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              ref={modalRef}
              className="bg-white rounded-lg max-w-5xl w-full p-6 border border-2 border-custom-main-orange pb-12 overflow-auto"
              style={{ maxHeight: '85vh' }}
              onClick={(e) => e.stopPropagation()} // Prevents propagation of click events to the modal's backdrop.
            >
              <div className="flex justify-end mb-4">
                <button onClick={handleCloseModal} className="text-white">
                  <XMarkIcon className="bg-red-500 w-6 h-6" />
                </button>
              </div>
              <div className="flex flex-col items-center justify-center px-10">
                <div className="text-butterscotch text-6xl leading-none">
                  &ldquo;
                </div>
                <p className="mb-4 w-full text-custom-black text-center text-3xl italic bg-gray-100 py-5 px-10 rounded">
                  {selectedQuote.text}
                </p>
                <div className="text-butterscotch text-end text-6xl leading-none">
                  &rdquo;
                </div>
                <p className="mb-6 w-full font-semibold text-custom-black text-center text-xl">
                  &ndash; {selectedQuote.author}, {getCategoryName(selectedQuote.id, quoteCategory, category)}
                </p>
              </div>
              <footer className="mt-4 text-lg font-semibold flex w-full justify-center gap-2">
                <section className="flex items-center border-2 border-dashed border-custom-main-orange rounded p-px px-4">
                  <p className="text-2xl px-5">{selectedQuote.vote}</p>
                </section>
                <button className="rounded bg-custom-main-orange w-36 text-white font-normal cursor-pointer">
                  Partager
                </button>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
