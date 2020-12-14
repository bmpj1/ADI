<template>
  <v-container>
    <v-form ref="form" v-model="valid">
      <h1>Registro de Usuarios</h1>
      <v-row>
        <v-col>
          <v-text-field v-model="nombre" :rules="reglasNombre" label="Nombre*" required></v-text-field>
        </v-col>
        <v-col>
          <v-text-field v-model="apellidos" label="Apellidos"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="telefono" label="Telefono" append-icon="mdi-cellphone"></v-text-field>
        </v-col>
        <v-col>
          <v-menu max-width="290">
            <template v-slot:activator="{ on }">
              <v-text-field
                v-on="on"
                :value="fechaFormateada"
                slot="activator"
                label="Fecha Nacimiento"
                append-icon="mdi-calendar-range"
                readonly
              ></v-text-field>
            </template>
            <v-date-picker v-model="fechaNac"></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols=6>
          <v-text-field v-model="email" :rules="reglasEmail" label="E-mail*" required></v-text-field>
        </v-col>
        <v-col>
          <v-select v-model="rol" :items="roles" v-if="$route.name == 'admin'" label="Rol"></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="password"
            label="Contraseña*"
            :append-icon="mostrarPassword ? 'mdi-eye' : 'mdi-eye-off'"
            required
            :rules="reglasPassword"
            :type="mostrarPassword ? 'text' : 'password'"
            hint="Al menos 5 carácteres"
            @click:append="mostrarPassword = !mostrarPassword"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            :type="mostrarPassword ? 'text' : 'password'"
            v-model="password_confirmation"
            :rules="[() => this.password === this.password_confirmation || 'Las contraseñas deben coincidir']"
            label="Confirmar Contraseña*"
            required
          ></v-text-field>
        </v-col>
      </v-row>  
      <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'Debes aceptar las condiciones de uso!']"
        label="¿Aceptas los terminos y condiciones?"
        required
      ></v-checkbox>
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validar">Registrar</v-btn>
    </v-form>

    <v-alert :type="successful? 'success' : 'error'" v-if="errorServer != ''" style="margin-top:10px;">{{errorServer}}</v-alert>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    successful: false,
    valid: true,
    nombre: "",
    rol: "",
    roles: ['admin', 'usuario'],
    reglasNombre: [v => !!v || "El nombre es obligatorio"],
    email: "",
    reglasEmail: [
      v => !!v || "El email es obligatorio",
      v => /.+@.+\..+/.test(v) || "El email debe tener un formato válido"
    ],
    telefono: "",
    apellidos: "",
    fechaNac: null,
    password: "",
    reglasPassword: [
      v => !!v || 'Constraseña requerida!!',
      v => (v && v.length >= 5) || 'Almenos 5 carácteres'
      /*
      v => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character', 
      v => /(?=.*\d)/.test(v) || 'Must have one number', 
      v => /([!@$%])/.test(v) || 'Must have one special character [!@#$%]' 
      */
    ],
    password_confirmation: "",
    checkbox: false,
    mostrarPassword: false,
    errorServer: '',
  }),

  methods: {
    validar() {
      if (this.$refs.form.validate()) {
        var usuario = {
              nombre: this.nombre,
              email: this.email,
              telefono: this.telefono,
              apellidos: this.apellidos,
              fechaNac: this.fechaNac,
              password: this.password
        }
        this.$store.dispatch('auth/register', usuario).then(
          res => {
            this.errorServer = "Usuario creado correctamente.";
            this.successful = true;
            if(this.$route.name != 'Admin')
              this.$router.push({ name: 'Home', params: { snackbar: 'Registrado correctamente' }})
            else{
              this.$emit('registrado', res.usuario)
            }
          },
          error => {
            this.errorServer =
              (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.successful = false;
              this.errorServer = this.errorServer.message;
          }
        );
      }
    }
  },
  computed: {
    fechaFormateada() {
      if (this.fechaNac) {
        var split = this.fechaNac.split("-");
        return split[2] + "/" + split[1] + "/" + split[0];
      }

      return "";
    }
  }
};
</script>

<style>
</style>