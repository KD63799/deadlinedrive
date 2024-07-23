export default function getCategoryName(quoteId, quoteCategory, category) {
    if (!quoteCategory || !Array.isArray(quoteCategory)) {
        return "Pas de catégorie";
      }
      
      if (!category || !Array.isArray(category)) {
        return "Catégorie inconnue";
      }
      
      const quoteCat = quoteCategory.find((qc) => qc.id_quote === quoteId);
      if (quoteCat) {
        const categories = category.find(
          (cat) => cat.id === quoteCat.id_category
        );
        return categories ? categories.name : "Catégorie inconnue";
      }
      return "Pas de catégorie";
    };