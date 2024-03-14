<template>
    <div class="full-container">
        <div class="d-flex justify-center align-center">
            <div divs="12" sm="8">
                <div class="rounded-xl elevation-6">
                    <div>
                        <div divs="6" class=" pl-10 py-10">
                            <h2 class="my-2 text-center">Registra't</h2>
                            <form @submit.prevent="register" class="mr-6">
                                <div class="name-field">
                                    <input model="emailRegistration.name" :rules="emailRegistration.nameRules"
                                        label="Nom*" type="name" class="pr-6" required></input>
                                    <input model="emailRegistration.surname" :rules="emailRegistration.nameRules"
                                        label="Cognom*" type="cognom" required></input>
                                </div>
                                <input model="emailRegistration.email" :rules="emailRegistration.emailRules"
                                    label="Email*" type="email" required></input>

                                <input model="emailRegistration.password"
                                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                    :rules="emailRegistration.passwordRules" :type="show1 ? 'text' : 'password'"
                                    name="input-10-1" label="Contrassenya*" @click:append="show1 = !show1"
                                    required></input>
                                <div class="name-field">
                                    <checkbox id="profeRegistro" type="checkbox" label="Soc professor/a"></checkbox>
                                </div>
                                <btn id="btnSubmit" type="submit" divor="primary">Registra't</btn>
                            </form>
                        </div>
                        <div divs="6" class="container-right pr-10 py-10">
                            <h2 class="my-2 ml-6 text-center">Inicia sessió</h2>
                            <form @submit.prevent="login" class="ml-6">
                                <input model="usernameLogin.email" :rules="emailRegistration.emailRules"
                                    label="Email*" type="email" required></input>
                                <input model="usernameLogin.password"
                                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                    :rules="emailRegistration.passwordRules" :type="show2 ? 'text' : 'password'"
                                    name="input-10-1" label="Contrassenya*" @click:append="show2 = !show2"
                                    required></input>
                                <checkbox type="checkbox" id="profeLogin" label="Soc professor/a"></checkbox>
                                <btn type="submit" divor="primary">Inicia sessió</btn>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import { register, login } from '../services/communicationManager';
import { useAppStore } from '../store/app';
import party from 'party-js';

export default {
    data() {
        return {
            show1: false,
            show2: false,
            emailRegistration: {
                name: '',
                surname: '',
                email: '',
                password: '',
                isAdmin: false,
                nameRules: [
                    value => {
                        if (value) return true
                        return 'Aquest camp és obligatori.'
                    },
                    value => {
                        if (value?.length <= 10) return true

                        return 'El nom ha de ser més curt.'
                    },
                ],
                emailRules: [
                    value => {
                        if (value) return true

                        return 'Aquest camp és obligatori.'
                    },
                    value => {
                        if (/.+@.+\..+/.test(value)) return true
                        return "L'email ha de ser vàlid."
                    },
                ],

                passwordRules: [
                    value => {
                        if (value) return true
                        return 'Aquest camp és obligatori.'
                    },

                ],
            },
            usernameLogin: {
                email: '',
                password: '',
                admin: false,
            },
        };
    },
    methods: {
        lanzarConfeti() {
            const btnSubmit = document.getElementById('btnSubmit');

            party.confetti(btnSubmit);

            party.sparkles(btnSubmit);
        },
        async register() {
            this.emailRegistration.isAdmin = document.getElementById("profeRegistro").checked;

            let data = await register(this.emailRegistration);

            if (data.err) {
                console.log(data.err);
            } else {
                let store = useAppStore();
                store.usuari.nom = this.emailRegistration.name;
                store.usuari.cognom = this.emailRegistration.surname;
                store.usuari.email = this.emailRegistration.email;
                store.usuari.id = data.userData.insertId;
                this.$router.push(this.emailRegistration.isAdmin ? '/classes' : '/join');
            }
        },
        async login() {
            this.usernameLogin.admin = document.getElementById("profeLogin").checked;

            let data = await login(this.usernameLogin);

            if (data.err) {
                window.alert("L'usuari o la contrasenya no són correctes o no existeixen")
            } else {
                let store = useAppStore();
                store.usuari.nom = data.userData.nom;
                store.usuari.cognom = data.userData.cognom;
                store.usuari.email = data.userData.correu;
                store.usuari.id = data.userData.idUsu;
                this.$router.push(this.usernameLogin.admin ? '/classes' : '/join');
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
    background-divor: lightblue;
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

}</style>
