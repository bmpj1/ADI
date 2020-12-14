import axios from 'axios';

const API_URL = 'http://localhost:3000/articulos/';

class ArticuloService {
  getArticulos() {
    return axios.get(API_URL);
  }

  getArticuloById(articulo) {
    return axios.get(API_URL + articulo);
  }

  addArticulo(articulo) {
    return axios.post(API_URL, { articulo: articulo }); 
  }

  updateArticulo(changes) {
    return axios.patch(API_URL+changes.id, { changes: changes })
  }

  deleteArticulo(articulo) {
    return axios.delete(API_URL + articulo)
  }
}

export default new ArticuloService();