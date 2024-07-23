import { useState, useEffect } from "react";
import Pagination from "@components/Pagination/Pagination";

function QuoteCard() {
  const [itemOffset, setItemOffset] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handlePageClick = (event) => {
    const filteredQuotes = selectedCategory
      ? quote.filter((q) => getCategoryName(q.id) === selectedCategory)
      : quote;
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

  return (
    <>
    <Pagination
          pageCount={Math.ceil(
            (selectedCategory
              ? quote.filter((q) => getCategoryName(q.id) === selectedCategory)
              : quote
            ).length / itemsPerPage
          )}
          onPageChange={handlePageClick}
        />
    </>
  )

