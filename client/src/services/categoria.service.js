import axios from 'axios';

const API_URL = 'http://localhost:3000/categorias/';

class CategoriaService {
  getCategorias() {
    return axios.get(API_URL);
  }

  getCategoriaById(categoria) {
    return axios.get(API_URL + categoria);
  }

  addCategoria(categoria) {
    return axios.post(API_URL, { categoria: categoria }); 
  }

  updateCategoria(changes) {
    return axios.patch(API_URL+changes.id, { changes: changes })
  }

  deleteCategoria(categoria) {
    return axios.delete(API_URL + categoria)
  }
}

export default new CategoriaService();