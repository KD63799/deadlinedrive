import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  HeartIcon as HeartIconSolid,
  HeartIcon as HeartIconOutline,
} from "@heroicons/react/24/solid";
import CommentSection from "@components/CommentSection/CommentSection";

function Quote() {
  const [isEditing, setIsEditing] = useState(true);
  const [quotes, setQuotes] = useState([]); // State for storing fetched quotes
  const [currentQuotes, setCurrentQuotes] = useState([]); // State for storing filtered quotes
  const [selectedCategory, setSelectedCategory] = useState(null); // State for selected category filter
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal open/close
  const [selectedQuote, setSelectedQuote] = useState(null); // State for selected quote in modal
  const [fav, setFav] = useState(false); // State for managing favorite toggle
  const [categoriesMap, setCategoriesMap] = useState({}); // State for storing categories

  // Function to fetch quotes from the API
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        navigate("/login");
        return;
      }

      const userId = localStorage.getItem("id");
      if (!userId) {
        console.error("No user ID found");
        navigate("/login");
        return;
      }
  // Make a GET request to fetch favorite quotes for the user
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/favorites/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQuotes(response.data);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch categories for a quote
  const fetchCategories = async (quoteId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/categories/${quoteId}`
      );

      setCategoriesMap((prevCategoriesMap) => ({
        ...prevCategoriesMap,
        [quoteId]: response.data,
      }));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Load categories for all quotes
  useEffect(() => {
    const loadCategoriesForAllQuotes = async () => {
      try {
        const promises = quotes.map((quote) => fetchCategories(quote.id));
        await Promise.all(promises);
      } catch (error) {
        console.error("Error loading categories for all quotes:", error);
      }
    };

    loadCategoriesForAllQuotes();
  }, [quotes]);

  // Toggle favorite for a quote
  const handleFavoriteToggle = async (quoteId) => {
    try {
      const updatedQuote = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/quotes/${quoteId}`
      );

      setQuotes((prevQuotes) =>
        prevQuotes.map((q) => (q.id === quoteId ? updatedQuote.data : q))
      );
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  // Handle click on a quote
  const handleQuoteClick = (quote) => {
    const quoteCategory = categoriesMap[quote.id]?.[0]?.name || "No Category"; // Fetch the category name or provide a default
    setSelectedQuote({ ...quote, category: quoteCategory });
    setIsModalOpen(true);
  };

  // Filter quotes based on selected category
  useEffect(() => {
    const filteredQuotes = quotes.filter((q) =>
      selectedCategory ? q.category === selectedCategory : true
    );
    setCurrentQuotes(filteredQuotes);
  }, [quotes, selectedCategory]);

  // Filtering quotes based on selected category (Favorites or All)
  const filteredQuotes =
    selectedCategory === "Favorites"
      ? currentQuotes.filter((q) => q.isFavorite)
      : currentQuotes;

  // Function for handling favorite toggle
  const favorisHandle = () => {
    setFav((prev) => !prev);
  };

  // Function to handle upvoting a quote
  const handleUpvote = async (quoteId) => {
    console.log(`Upvoting quote ID: ${quoteId}`);
    try {
      const token = localStorage.getItem("token");
      // Make a POST request to the server to upvote the quote
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
      setQuotes((prevQuotes) =>
        prevQuotes.map((q) =>
          q.id === quoteId ? { ...q, vote: q.vote + 1 } : q
        )
      );
      console.log("Upvote successful");
    } catch (error) {
      console.error("Failed to upvote", error);
    }
  };
  
  // Function to handle downvoting a quote
  const handleDownvote = async (quoteId) => {
    console.log(`Downvoting quote ID: ${quoteId}`);
    try {
      const token = localStorage.getItem("token");
       // Make a POST request to the server to downvote the quote
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
      // Update the quotes state with the new vote count
      setQuotes((prevQuotes) =>
        prevQuotes.map((q) =>
          q.id === quoteId ? { ...q, vote: q.vote - 1 } : q
        )
      );
      console.log("Downvote successful");
    } catch (error) {
      console.error("Failed to downvote", error);
    }
  };

  return (
    <div>
      {/* Render if not in favorite mode */}
      {!fav ? (
        <>
        {/* Container for quotes */}
          <div className="flex flex-col max-w-7xl m-auto py-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-wrap flex-row gap-9 m-auto justify-center"
              >
                {filteredQuotes.map((quote) => (
                  <motion.article
                    key={quote.id}
                    className="mb-4 p-4 border-2 rounded-md border-custom-main-orange shadow w-80 min-h-80 flex flex-col hover:bg-slate-50"
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
                    <div className="mb-6 mt-1 w-full text-xl text-custom-black">
                      {categoriesMap[quote.id]?.map((category) => (
                        <span key={category.id}>{category.name}</span>
                      ))}
                    </div>
                    {/* Footer with voting and favorite options */}
                    <footer className="mt-4 text-lg font-semibold flex justify-between mt-auto">
                    <section className="flex border-2 border-dashed border-custom-main-orange rounded p-px px-4"
                  onClick={(e) => e.stopPropagation()}
                  >
                    <button aria-label="Upvote" className="p-1.5 w-full">
                    <ChevronUpIcon
                      className="w-6 hover:fill-green-500 cursor-pointer"
                      onClick={(e) => { e.stopPropagation(); handleUpvote(quote.id); }}
                    />
                    </button>
                    <p className="text-2xl px-1">{quote.vote}</p>
                    <button aria-label="Downvote" className="w-full p-1.5">
                    <ChevronDownIcon
                      className="w-6 hover:fill-red-500 cursor-pointer"
                      onClick={(e) => { e.stopPropagation(); handleDownvote(quote.id); }}/>
                      </button>
                  </section>
                      <button aria-label="Partager" className="rounded bg-custom-main-orange w-1/3 text-white font-normal cursor-copy">
                        Partager
                      </button>
                      {/* Favorite toggle button */}
                      <button aria-label="Mettre en favoris" onClick={() => handleFavoriteToggle(quote.id)}>
                        {quote.isFavorite ? (
                          <HeartIconSolid className="w-6 text-red-700" />
                        ) : (
                          <HeartIconOutline className="w-6 text-gray-700" />
                        )}
                      </button>
                    </footer>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Modal for comment section */}
          <AnimatePresence>
            {isModalOpen && selectedQuote && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <CommentSection
                  quote={selectedQuote}
                  category={selectedQuote.category} // Pass the category here
                  onClose={() => setIsModalOpen(false)}
                  editing={isEditing}
                  setEditing={setIsEditing}
                  fav={favorisHandle}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <Quote />
      )}
    </div>
  );
}

export default Quote;
