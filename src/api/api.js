import axios from 'axios';

export const cleanKeys = (data) => {
    return data.map((item) => {
        const cleanedItem = {};
        Object.keys(item).forEach((key) => {
            const cleanedKey = key.replace(/["\u200B-\u200D\uFEFF]/g, "").trim();
            cleanedItem[cleanedKey] = item[key];
        });
        return cleanedItem;
    });
};

export const fetchAvailablePcs = async () => {
    try {
        const response = await axios.get(`https://api-barcode-reader.vercel.app/api/search?query=Disponible`);
        return cleanKeys(response.data);
    } catch (err) {
        if (err.response && err.response.data.error) {
            throw new Error(err.response.data.error);
        } else {
            throw new Error('Erreur lors de la récupération des PC disponibles.');
        }
    }
};

export const fetchAllBrands = async () => {
    try {
        const response = await axios.get(`https://api-barcode-reader.vercel.app/api/search?query= `);
        const cleanedResults = cleanKeys(response.data);
        const uniqueBrands = new Set(cleanedResults.map(pc => pc.Modèle.trim()));
        return [...uniqueBrands];
    } catch (err) {
        if (err.response && err.response.data.error) {
            throw new Error(err.response.data.error);
        } else {
            throw new Error('Erreur lors de la récupération des marques.');
        }
    }
};

export const searchPcs = async (searchQuery) => {
    try {
        const response = await axios.get(
            `https://api-barcode-reader.vercel.app/api/search?query=${encodeURIComponent(searchQuery)}`
        );
        return cleanKeys(response.data);
    } catch (err) {
        if (err.response && err.response.data.error) {
            throw new Error(err.response.data.error);
        } else {
            throw new Error('Erreur lors de la recherche.');
        }
    }
};