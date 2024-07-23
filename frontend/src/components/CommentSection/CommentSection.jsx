import {
  ChevronUpIcon,
  ChevronDownIcon,
  XMarkIcon,
  PencilIcon,
  TrashIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import QuotesFavoris from "@components/Favorites/QuotesFavoris";
import GetUserFirstName from "@services/GetUserFirstName";
import formatDateCommentary from "@services/formatDateCommentary";

function CommentSection({
  quote,
  category,
  onClose,
  editing,
  setEditing,
  fav,
}) {
  // State variables for managing comments, user data, and new comment inputs
  const [comments, setComments] = useState([]);
  // State to store user data for reference in comments display.
  const [users, setUsers] = useState([]);
  // State for holding the text input value for new comments.
  const [newComment, setNewComment] = useState("");
  // State to track the current comment being edited.
  const [editingComment, setEditingComment] = useState(null);
  // State for the content of the comment being edited.
  const [editedContent, setEditedContent] = useState("");
  // State to hold the user ID from local storage for authentication purposes.
  const [userId, setUserID] = useState(localStorage.getItem("id"));
  const [quoteState, setQuoteState] = useState(quote);
  // Ref to manage clicks outside the modal to close it.
  const modalRef = useRef(null);
  const [favIcon, setFavIcon] = useState(false);

  // Effect to fetch comments when the component mounts or when quote changes.
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/comments/by-quote/${quote.id}`)
      .then(response => {
        const lastThreeComments = response.data[0].slice(-3);  // Get only the latest three comments
        setComments(lastThreeComments);
      })
      .catch(error => console.error("Error loading comments:", error));
  }, [quote.id, comments]);  // Dependency array includes comments to update on new comment addition.

    // Effect to fetch user data once when the component mounts.
    useEffect(() => {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/users`)
        .then(response => setUsers(response.data))
        .catch(error => console.error("Error loading users:", error));
    }, []);

  // Function to toggle favorite icon state
  const toggleFavorite = () => {
    setFavIcon((prev) => !prev);
  };

  // Adds a new comment to the backend and updates local state.
  const handleAddComment = () => {
    const commentData = {
      content: newComment,
      id_user: userId,
      id_quote: quote.id,
    };
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/comments`, commentData)
      .then(response => {
        // Update comments locally without needing to refetch from the server.
        const updatedComments = [...comments, {
          ...commentData,
          username: getUserFirstNameFromLocalStorage(),
          created_at: new Date().toISOString(),
        }].slice(-3);  // Maintains only the last three comments in the state.
        setComments(updatedComments);
        setNewComment("");  // Reset input field after submission.
      })
      .catch(error => console.error("Failed to add comment:", error));
  };

  // Deletes a comment by ID and updates local state.
  const handleDeleteComment = (commentId) => {
    axios.delete(`${import.meta.env.VITE_BACKEND_URL}/comment/${commentId}`)
      .then(() => {
        // Filter out the deleted comment from the local state.
        setComments(comments.filter(comment => comment.id !== commentId));
      })
      .catch(error => console.error("Failed to delete comment:", error));
  };

  // Sets up the component state for editing a specific comment.
  const handleEditComment = (commentId) => {
    setEditingComment(commentId);
    const comment = comments.find(comment => comment.id === commentId);
    setEditedContent(comment.content);
  };

  // Updates an existing comment and syncs with the backend.
  const handleUpdateComment = (commentId) => {
    axios.put(`${import.meta.env.VITE_BACKEND_URL}/comments/${commentId}`, {
      content: editedContent,
      id_user: userId,
      id_quote: quote.id
    })
      .then(() => {
        // Update the local state with the new content of the edited comment.
        setComments(comments.map(comment =>
          comment.id === commentId ? { ...comment, content: editedContent } : comment
        ));
        setEditingComment(null);
        setEditedContent("");  // Clear the edited content state after update.
      })
      .catch(error => console.error("Failed to update comment:", error));
  };

  // Utility function to format dates for display.
  // const formatDate = (dateString) => {
  //   const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  //   return new Date(dateString).toLocaleDateString("fr-FR", options);
  // };

  // Retrieves user's first name from local storage, defaulting to "Anonyme" if not found.
  const getUserFirstNameFromLocalStorage = () => {
    return localStorage.getItem("firstName") || "Anonyme";
  };

  // // Looks up a user's first name using their ID from the loaded user data.
  // const getUserFirstName = (userId) => {
  //   const user = users.find(user => user.id === parseInt(userId, 10));
  //   return user ? user.firstName : "Unknown User";
  // };

  // Handles clicks outside of the modal to close it.
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();  // Trigger the close function passed as a prop.
    }
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
        setQuoteState((prevQuote) =>
          prevQuote.id === quoteId ? { ...prevQuote, vote: prevQuote.vote + 1 } : prevQuote
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
      setQuoteState((prevQuote) =>
        prevQuote.id === quoteId ? { ...prevQuote, vote: prevQuote.vote - 1 } : prevQuote
      );
      console.log("Downvote successful");
    } catch (error) {
      console.error("Failed to downvote", error);
    }
  };

// Main component render method, including modal and interactive elements.
return (
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
        <button aria-label="Fermer le menu" onClick={onClose} className="text-white">
          <XMarkIcon className="bg-red-500 w-6 h-6" />
        </button>
      </div>
      <div className="flex flex-col items-center justify-center px-10">
        <div className="text-butterscotch text-6xl leading-none">
          &ldquo;
        <p className="mb-4 w-full text-custom-black text-center text-3xl italic bg-gray-100 py-5 px-10 rounded">
          {quote.text}
        </p>
        <div className="text-butterscotch text-end text-6xl leading-none">
          &rdquo;
        </div>
        <p className="mb-6 w-full font-semibold text-custom-black text-center text-xl">
          &ndash; {quote.author}
        </p>
        </div>
      </div>
      <p className="mb-6 mt-1 w-full text-xl text-custom-black text-center">Catégorie : {category}</p>
      <footer 
      className="mt-4 text-lg font-semibold flex w-full justify-center gap-2"
      onClick={(e) => e.stopPropagation()}
      >
        <section className="flex items-center border-2 border-dashed border-custom-main-orange rounded p-px px-4"
        onClick={(e) => e.stopPropagation()}
        >
          <ChevronUpIcon 
          className="w-6 hover:fill-green-500 cursor-pointer" 
          onClick={(e) => { e.stopPropagation(); handleUpvote(quoteState.id); }}
          />
          <p className="text-2xl px-1">{quoteState.vote}</p>
          <ChevronDownIcon 
          className="w-6 hover:fill-red-500 cursor-pointer" 
          onClick={(e) => { e.stopPropagation(); handleDownvote(quoteState.id); }} 
          />
        </section>
        <button aria-label="Partager la citation" className="rounded bg-custom-main-orange w-36 text-white font-normal cursor-pointer">
          Partager
        </button>
          <QuotesFavoris
            quote={quote}
            favIcon={favIcon}
            toggleFavorite={toggleFavorite}
            fav={fav}
          />
      </footer>
      <div className="w-full mt-4">
        {comments.map((comment, index) => (
          <div key={index} className="bg-gray-100 p-3 rounded-lg mb-2">
            <p className="text-lg font-bold">
              {GetUserFirstName(comment.id_user, users)}
            </p>
            <p className="text-sm">{formatDateCommentary(comment.created_at)}</p>
            {editingComment === comment.id && parseInt(userId) === comment.id_user ? (
              <div className="flex flex-col">
                <textarea
                  className="w-full p-2 text-base border border-gray-300 rounded-md"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
                <button aria-label="Comfirmer la modification du commentaire"
                  className="mt-2 bg-butterscotch hover:bg-caramel text-white font-bold py-2 px-4 rounded w-/4"
                  onClick={() => handleUpdateComment(comment.id)}
                >
                  Modifier votre commentaire
                </button>
              </div>
            ) : (
              <div>
                <div style={{ height: '1px', backgroundColor: 'black', marginBottom: '20px' }}></div>
                <p className="text-sm">{comment.content}</p>
              </div>
            )}
            <div className="flex space-x-2 mt-2 justify-end">
              <button aria-label="Modifier le commentaire"
                className="text-blue-500 hover:text-blue-700"
                onClick={() => handleEditComment(comment.id)}
              >
                {parseInt(userId) === comment.id_user && <PencilIcon className="w-5 h-5" />}
              </button>
              <button aria-label="Supprimer le commentaire"
                className="text-red-500 hover:text-red-700"
                onClick={() => handleDeleteComment(comment.id)}
              >
                {parseInt(userId) === comment.id_user && <TrashIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        ))}
        <div className="mt-4">
          <textarea
            className="w-full p-2 text-base border border-gray-300 rounded-md"
            placeholder="Ajoutez un commentaire..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button aria-label="publier le commentaire"
            className="mt-2 bg-butterscotch hover:bg-caramel text-white font-bold py-2 px-4 rounded"
            onClick={handleAddComment}
          >
            Publier
          </button>
        </div>
      </div>
    </div>
  </motion.div>
);}

export default CommentSection;
