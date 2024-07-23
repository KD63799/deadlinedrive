// Utility function to format dates for display.
const formatDateCommentary = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      throw new Error('Invalid Date'); 
    }
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString("fr-FR", options);
  };
  
export default formatDateCommentary