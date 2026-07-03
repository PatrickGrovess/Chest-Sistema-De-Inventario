import axios from 'axios';

// Creamos una instancia de axios para no repetir la URL base
const api = axios.create({
  baseURL: 'http://localhost:8000/api'
});

// Ahora sí, exportamos la función que tu Login necesita
export const getProducts = async () => {
  const response = await api.get('/datos'); // Ajusta la ruta según tu API
  return response.data;
};