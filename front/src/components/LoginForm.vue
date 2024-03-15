<template>
  <div
    class="h-screen flex items-center justify-center bg-[radial-gradient(rgba(173,216,230)_30%,rgba(81,180,213)_100%)]"
  >
    <div class="flex justify-center items-center bg-white">
      <div divs="6" class="pl-10 py-10">
        <h2 class="my-2 text-xl text-center">Registra't</h2>
        <form @submit.prevent="register" class="mr-6">
          <div class="name-field">
            <input
              model="emailRegistration.name"
              :rules="emailRegistration.nameRules"
              label="Nom"
              type="name"
              class="pr-6 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <input
            model="emailRegistration.email"
            :rules="emailRegistration.emailRules"
            label="Email*"
            type="email"
            required
          />

          <input
            model="emailRegistration.password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="emailRegistration.passwordRules"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Contrassenya*"
            @click:append="show1 = !show1"
            required
          />
          <div class="name-field">
            <checkbox
              id="profeRegistro"
              type="checkbox"
              label="Soc professor/a"
            ></checkbox>
          </div>
          <button id="btnSubmit" type="submit" divor="primary">
            Registra't
          </button>
        </form>
      </div>
      <div divs="6" class="container-right pr-10 py-10">
        <h2 class="my-2 ml-6 text-center">Inicia sessió</h2>
        <form @submit.prevent="login" class="ml-6">
          <input
            v-model="usernameLogin.email"
            :rules="emailRegistration.emailRules"
            label="Email*"
            type="email"
            required
          />
          <input
            v-model="usernameLogin.password"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="emailRegistration.passwordRules"
            :type="show2 ? 'text' : 'password'"
            name="input-10-1"
            label="Contrassenya*"
            @click:append="show2 = !show2"
            required
          />
          <checkbox
            type="checkbox"
            id="profeLogin"
            label="Soc professor/a"
          ></checkbox>
          <button type="submit" divor="primary">Inicia sessió</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { register, login } from "../services/communicationManager";
import { getState, setState, subscribe } from "../store/store.js";
import party from "party-js";

export default {
  data() {
    return {
      show1: false,
      show2: false,
      emailRegistration: {
        name: "",
        email: "",
        password: "",
        isAdmin: false,
        nameRules: [
          (value) => {
            if (value) return true;
            return "Aquest camp és obligatori.";
          },
          (value) => {
            if (value?.length <= 10) return true;

            return "El nom ha de ser més curt.";
          },
        ],
        emailRules: [
          (value) => {
            if (value) return true;

            return "Aquest camp és obligatori.";
          },
          (value) => {
            if (/.+@.+\..+/.test(value)) return true;
            return "L'email ha de ser vàlid.";
          },
        ],

        passwordRules: [
          (value) => {
            if (value) return true;
            return "Aquest camp és obligatori.";
          },
        ],
      },
      usernameLogin: {
        email: "",
        password: "",
        admin: false,
      },
    };
  },
  methods: {
    lanzarConfeti() {
      const btnSubmit = document.getElementById("btnSubmit");

      party.confetti(btnSubmit);

      party.sparkles(btnSubmit);
    },
    async register() {
      this.emailRegistration.isAdmin =
        document.getElementById("profeRegistro").checked;

      let data = await register(this.emailRegistration);

      if (data.err) {
        console.log(data.err);
      } else {
        setState({usuari: { 
            nom: this.emailRegistration.name,
            email: this.emailRegistration.email,
            id: data.userData.insertId
        }});
        this.$router.push(
          this.emailRegistration.isAdmin ? "/classes" : "/join"
        );
      }
    },
    async login() {
      this.usernameLogin.admin = document.getElementById("profeLogin").checked;

      console.log(this.usernameLogin);
      let data = await login(this.usernameLogin);

      if (data.err) {
        window.alert(
          "L'usuari o la contrasenya no són correctes o no existeixen"
        );
      } else {
        setState({usuari: { 
            nom: data.userData.nom,
            cognom: data.userData.cognom,
            email: data.userData.correu,
            id: data.userData.idUsu
        }});
        console.log(getState());
        //window.location.href = this.usernameLogin.admin ? "/classes" : "/join";
      }
    },
  },
};
</script>

<style scoped>
.name-field {
  display: flex;
  flex-wrap: wrap;
}

.imgFondo {
  z-index: 1;
}

.full-container {
  height: 100vh;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container-right {
  /* background-divor: #72BAE8; */
  width: 100%;
  background-image: url("../assets/Background.png");
}
</style>setState, 
