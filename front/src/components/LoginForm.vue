<template>
  <div
    class="h-screen flex items-center justify-center bg-[radial-gradient(rgba(173,216,230)_30%,rgba(81,180,213)_100%)]"
  >
    <div class="flex justify-center bg-white rounded-2xl shadow-lg">
      <div divs="6" class="p-10 bg-image rounded-l-2xl w-full">
        <h2 class="my-2 text-xl text-center">Registra't</h2>
        <form @submit.prevent="register">
          <div class="flex flex-wrap -mx-3 mb-3">
            <div class="w-full md:w-1/2 px-3 md:mb-0">
              <input
                model="emailRegistration.name"
                :rules="emailRegistration.nameRules"
                placeholder="Nom d'usuari"
                type="name"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div class="w-full md:w-1/2 px-3 md:mb-0">
              <input
                model="emailRegistration.email"
                :rules="emailRegistration.emailRules"
                placeholder="Email"
                type="email"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <input
            model="emailRegistration.password"
            :rules="emailRegistration.passwordRules"
            placeholder="Contrassenya"
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
          <button
            id="btnSubmit"
            type="submit"
            class="bg-sky-400 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Registra't
          </button>
        </form>
      </div>
      <div divs="6" class="p-10 rounded-2xl w-full">
        <h2 class="my-2 text-center text-xl">Inicia sessió</h2>
        <form @submit.prevent="login" class="ml-6">
          <input
            v-model="usernameLogin.email"
            :rules="emailRegistration.emailRules"
            placeholder="Email"
            type="email"
            class="pr-6 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
          <input
            v-model="usernameLogin.password"
            :rules="emailRegistration.passwordRules"
            name="input-10-1"
            placeholder="Contrassenya*"
            class="pr-6 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
          <button
            type="submit"
            class="bg-sky-400 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Inicia sessió
          </button>
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
        setState({
          usuari: {
            nom: this.emailRegistration.name,
            email: this.emailRegistration.email,
            id: data.userData.insertId,
          },
        });
        this.$router.push(
          this.emailRegistration.isAdmin ? "/classes" : "/join"
        );
      }
    },
    async login() {
      //this.usernameLogin.admin = document.getElementById("profeLogin").checked;

      console.log(this.usernameLogin);
      let data = await login(this.usernameLogin);

      if (data.err) {
        window.alert(
          "L'usuari o la contrasenya no són correctes o no existeixen"
        );
      } else {
        setState({
          usuari: {
            nom: data.userData.nom,
            cognom: data.userData.cognom,
            email: data.userData.correu,
            id: data.userData.idUsu,
          },
        });
        console.log(getState());
        window.location.href = this.usernameLogin.admin ? "/classes" : "/join";
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

.bg-image {
  background-image: url("../assets/Background.png");
}
</style>
