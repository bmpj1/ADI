import axios from 'axios';

const API_URL = 'http://localhost:3000/usuarios/';

class UsuarioService {
  getUsuarios() {
    return axios.get(API_URL);
  }

  getUsuarioById(usuario) {
    return axios.get(API_URL + usuario);
  }

  addUsuario(usuario) {
    return axios.post(API_URL, { usuario: usuario }); 
  }

  updateUsuario(changes) {
    return axios.patch(API_URL+changes.id, { changes: changes })
  }

  deleteUsuario(usuario) {
    return axios.delete(API_URL + usuario)
  }
}

export default new UsuarioService();