import getCategoryName from "../services/getCategoryName";

describe('getCategoryName', () => {

    // Test to check if the correct category name is returned for a given quote ID
    it('should return the correct category name', () => {
        const quoteCategory = [
            { id_quote: 1, id_category: 101 },
            { id_quote: 2, id_category: 102 },
        ];
        const category = [
            { id: 101, name: 'Inspiration' },
            { id: 102, name: 'Humor' },
        ];

        expect(getCategoryName(1, quoteCategory, category)).toBe('Inspiration');
        expect(getCategoryName(2, quoteCategory, category)).toBe('Humor');
    });

    // Test to check if "Pas de catégorie" is returned when the quoteCategory is not found
    it('should return "Pas de catégorie" if quoteCategory is not found', () => {
        const quoteCategory = [
            { id_quote: 1, id_category: 101 },
        ];
        const category = [
            { id: 101, name: 'Inspiration' },
        ];

        expect(getCategoryName(3, quoteCategory, category)).toBe('Pas de catégorie');
    });

    // Test to check if "Pas de catégorie" is returned when quoteCategory array is empty
    it('should return "Pas de catégorie" if quoteCategory is empty', () => {
        const quoteCategory = [];
        const category = [
            { id: 101, name: 'Inspiration' },
        ];

        expect(getCategoryName(1, quoteCategory, category)).toBe('Pas de catégorie');
    });

    // Test to check if "Catégorie inconnue" is returned when category array is empty
    it('should return "Catégorie inconnue" if category is empty', () => {
        const quoteCategory = [
            { id_quote: 1, id_category: 101 },
        ];
        const category = [];

        expect(getCategoryName(1, quoteCategory, category)).toBe('Catégorie inconnue');
    });

    // Test to check if "Pas de catégorie" is returned when quoteCategory is undefined
    it('should return "Pas de catégorie" if quoteCategory is undefined', () => {
        const category = [
            { id: 101, name: 'Inspiration' },
        ];

        expect(getCategoryName(1, undefined, category)).toBe('Pas de catégorie');
    });

     // Test to check if "Catégorie inconnue" is returned when category is undefined
    it('should return "Catégorie inconnue" if category is undefined', () => {
        const quoteCategory = [
            { id_quote: 1, id_category: 101 },
        ];

        expect(getCategoryName(1, quoteCategory, undefined)).toBe('Catégorie inconnue');
    });
});