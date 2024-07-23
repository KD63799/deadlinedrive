import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "@components/Pagination/Pagination";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";
import CommentSection from "@components/CommentSection/CommentSection";
import { Link } from "react-router-dom";

function QuoteCard() {
  const [quote, setQuote] = useState([]);
  const [category, setCategory] = useState([]);
  const [quoteCategory, setQuoteCategory] = useState([]);
  const [currentQuotes, setCurrentQuotes] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const itemsPerPage = 9;

  const fetchData = async () => {
    try {
      const [resQuote, resCategory, resQuoteCategory] = await Promise.all([
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/quotes`),
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/categories`),
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/quote_category`),
      ]);
      setQuote(resQuote.data);
      setCategory([{ id: 0, name: "All" }, ...resCategory.data]);
      setQuoteCategory(resQuoteCategory.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    const filteredQuotes = selectedCategory === "All"
      ? shuffleArray([...quote])
      : quote.filter((q) => getCategoryName(q.id) === selectedCategory);
    setCurrentQuotes(filteredQuotes.slice(itemOffset, endOffset));
  }, [itemOffset, quote, selectedCategory]);

  const handlePageClick = (event) => {
    const filteredQuotes = selectedCategory === "All"
      ? shuffleArray([...quote])
      : quote.filter((q) => getCategoryName(q.id) === selectedCategory);
    const newOffset = (event.selected * itemsPerPage) % filteredQuotes.length;
    setItemOffset(newOffset);
  };

  const getCategoryName = (quoteId) => {
    const quoteCat = quoteCategory.find((qc) => qc.id_quote === quoteId);
    if (quoteCat) {
      const categories = category.find(
        (cat) => cat.id === quoteCat.id_category
      );
      return categories ? categories.name : "Unknown Category";
    }
    return "No Category";
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setItemOffset(0);
    setIsMenuOpen(false);
  };

  const handleQuoteClick = (quote) => {
    setSelectedQuote(quote);
    setIsModalOpen(true);
  };

  const handleUpvote = async (quoteId) => {
    console.log(`Upvoting quote ID: ${quoteId}`);
    try {
      const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/quotes/${quoteId}/upvote`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Upvote response:", response.data);
      setQuote((prevQuotes) =>
        prevQuotes.map((q) =>
          q.id === quoteId ? { ...q, vote: q.vote + 1 } : q
        )
      );
      console.log("Upvote successful");
    } catch (error) {
      console.error("Failed to upvote", error);
    }
  };

  const handleDownvote = async (quoteId) => {
    console.log(`Downvoting quote ID: ${quoteId}`);
    try {
      const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/quotes/${quoteId}/downvote`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Downvote response:", response.data);
      setQuote((prevQuotes) =>
        prevQuotes.map((q) =>
          q.id === quoteId ? { ...q, vote: q.vote - 1 } : q
        )
      );
      console.log("Downvote successful");
    } catch (error) {
      console.error("Failed to downvote", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="flex flex-col max-w-7xl m-auto py-6 p-4 sm:p-6"
      >
        <div className="flex flex-row m-auto gap-10 items-baseline max-sm:items-start">
          <div className="block lg:hidden mb-8 relative flex justify-center">
            <button
              onClick={toggleMenu}
              className="flex items-center px-3 py-2 border border-custom-main-orange rounded-lg focus:outline-none text-lg w-36 h-14"
            >
              Catégorie
              {isMenuOpen ? (
                <ChevronUpIcon className="w-5 h-5 ml-2" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 ml-2" />
              )}
            </button>
            {isMenuOpen && (
              <ul className="absolute text-lg mt-2 bg-white border border-custom-main-orange rounded-lg shadow-lg z-10">
                {category.map((c) => (
                  <motion.li
                    key={c.id}
                    whileHover={{ scale: 1.2 }}
                    onHoverStart={(e) => {}}
                    onHoverEnd={(e) => {}}
                    className={`cursor-pointer px-3 py-2 w-36${
                      selectedCategory === c.name
                        ? "font-semibold rounded-sm bg-slate-200 border border-custom-main-orange text-lg"
                        : ""
                    }`}
                    onClick={() => handleCategoryClick(c.name)}
                  >
                    {c.name}
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
          <motion.ul
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="hidden lg:flex flex-wrap justify-center gap-14 mb-8"
          >
            {category.map((c) => (
              <motion.li
                whileHover={{ scale: 1.2 }}
                onHoverStart={(e) => {}}
                onHoverEnd={(e) => {}}
                key={c.id}
                className={`cursor-pointer ${
                  selectedCategory === c.name
                    ? "font-semibold border border-2 border-custom-main-orange rounded-md px-1"
                    : ""
                }`}
                onClick={() => handleCategoryClick(c.name)}
              >
                {c.name}
              </motion.li>
            ))}
          </motion.ul>
          {/* Button always visible */}
          <div className="flex justify-center mb-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.6 }}
              className="rounded bg-custom-main-orange text-white font-normal px-3 py-1 max-md:w-36"
            >
              <Link to="/manage-my-quotes">Gérer mes citations</Link>
            </motion.button>
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap flex-row gap-9 m-auto justify-center"
          >
            {currentQuotes.map((quote) => (
              <motion.article
                key={quote.id}
                className="mb-4 p-4 border-2 rounded-md border-custom-main-orange shadow w-full sm:w-1/2 md:w-96 lg:w-96 xl:w-96 flex flex-col hover:bg-slate-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleQuoteClick(quote)}
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
                    <ChevronUpIcon
                      className="w-6 hover:fill-green-500 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUpvote(quote.id);
                      }}
                    />
                    <p className="text-2xl px-1">{quote.vote}</p>
                    <ChevronDownIcon
                      className="w-6 hover:fill-red-500 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownvote(quote.id);
                      }}
                    />
                  </section>
                  <button
                    className="rounded bg-custom-main-orange w-1/3 text-white font-normal cursor-copy"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Partager
                  </button>
                </footer>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>{" "}
        <Pagination
          pageCount={Math.ceil(
            (selectedCategory === "All"
              ? quote
              : quote.filter((q) => getCategoryName(q.id) === selectedCategory)
            ).length / itemsPerPage
          )}
          onPageChange={handlePageClick}
        />
      </motion.div>
      <AnimatePresence>
        {isModalOpen && (
          <CommentSection
            quote={selectedQuote}
            category={getCategoryName(selectedQuote.id)}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default QuoteCard;
