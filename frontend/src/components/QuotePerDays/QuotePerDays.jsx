import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from "axios";

const QuotePerDays = () => {
  // State variables to manage login status, quotes, categories, quote-category relationships, and random quote.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [quoteCategories, setQuoteCategories] = useState([]);
  const [randomQuote, setRandomQuote] = useState(null);


  // useEffect to check if user is logged in by checking for a JWT token in localStorage.
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Simplify token check
  }, []);


  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      // Fetch quotes, categories, and quote-category relationships simultaneously.
      const [resQuote, resCategory, resQuoteCategory] = await Promise.all([
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/quotes`),
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/categories`),
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/quote_category`),
      ]);
      
      // Update state with fetched data.
      setQuotes(resQuote.data);
      setCategories(resCategory.data);
      setQuoteCategories(resQuoteCategory.data);

      // If there are any quote-category relationships, select a random quote.
      if (resQuoteCategory.data.length > 0) {
        selectRandomQuote(resQuote.data, resCategory.data, resQuoteCategory.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect to fetch data on component mount.
  useEffect(() => {
    fetchData();
  }, []);

  // Function to select a random quote.
  const selectRandomQuote = (quotes, categories, quoteCategories) => {
    const randomIndex = Math.floor(Math.random() * quoteCategories.length); // Get random index
    const randomQuoteCategory = quoteCategories[randomIndex]; // Get random quote-category relationship
    const quote = quotes.find(q => q.id === randomQuoteCategory.id_quote); // Find quote by id
    const category = categories.find(c => c.id === randomQuoteCategory.id_category); // Find category by id

    // If both quote and category are found, update the random quote state.
    if (quote && category) {
      setRandomQuote({ text: quote.text, author: quote.author, category: category.name });
    } else {
      console.error("Quote or Category not found");
    }
  };

  // Function to handle getting a new random quote.
  const handleNewRandomQuote = () => {
    if (quoteCategories.length > 0) {
      selectRandomQuote(quotes, categories, quoteCategories);
    }
  };

  // Render component UI
return (
  <div className="p-8">
    {isLoggedIn ? (
      // If the user is logged in, display a random quote.
      <div className=" flex flex-col items-center ">
        <div className="p-4 bg-custom-main-orange m-3 rounded-lg">
        <h3 className=" text-white  flex flex-col items-center font-semibold px-2 py-3">Citations alèatoires</h3>
        {randomQuote ? (
          <section>
            <p><strong>Citation:</strong> {randomQuote.text}</p>
            <p><strong>Auteur:</strong> {randomQuote.author}</p>
            <p><strong>Categorie:</strong> {randomQuote.category}</p>
          </section>
        ) : (
          // If the random quote is not loaded yet, show a loading message.
          <p>Loading...</p>
        )}
        </div>
        <div>
        <button onClick={handleNewRandomQuote} className=" mt-12 inline-block rounded-lg border   px-4 py-3 text-center text-base font-semibold transition  text-ivory bg-butterscotch  hover:bg-caramel hover:text-primary">
          Avoir une autre citation
        </button>
        </div>
      </div>
    ) : (
      // If the user is not logged in, display a button to log in or register.
      <div className="flex flex-col items-center">
        <Link to="/signup">
          <button className=" text-ivory font-semibold p-4 bg-custom-main-orange rounded-lg hover:text-black">
            Appuyez ici pour vous inscrire ou vous connecter !
          </button>
        </Link>
      </div>
    )}
  </div>
);
};


export default QuotePerDays;
