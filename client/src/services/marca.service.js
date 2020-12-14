import axios from 'axios';

const API_URL = 'http://localhost:3000/marcas/';

class MarcaService {
  getMarcas() {
    return axios.get(API_URL);
  }

  getMarcaById(marca) {
    return axios.get(API_URL + marca);
  }

  addMarca(marca) {
    return axios.post(API_URL, { marca: marca }); 
  }

  updateMarca(changes) {
    return axios.patch(API_URL+changes.id, { changes: changes })
  }

  deleteMarca(marca) {
    return axios.delete(API_URL + marca)
  }
}

export default new MarcaService();