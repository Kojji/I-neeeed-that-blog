<template>
  <q-page class="row flex flex-center">
    <q-card class="col-10 q-pa-md" style="max-width: 480px;">
      <q-card-section class="text-teal-9 text-h5 text-center">
        I NEED THAT!
      </q-card-section>
      <q-card-section>
        <q-input v-model="loginEmail" label="Email" />
        <q-input v-model="loginPassword" :type="isPwd ? 'password' : 'text'" label="Password">
          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
          </template>
        </q-input>
      </q-card-section>
      <q-card-section class="row justify-end">
        <q-btn disable style="width: 150px;" color="teal-9" v-if="loginLoading">
          <q-spinner size="xs"></q-spinner>
        </q-btn>
        <q-btn style="width: 150px;" color="teal-9" @click="adminLogin()" v-else>
          Login
        </q-btn>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from "vue-router";
import { useAuthenticationStore } from 'stores/LoginAuth';
import { useQuasar } from 'quasar';

const loginLoading = ref(false);
const loginEmail = ref("");
const loginPassword = ref("");
const isPwd = ref(true);

const $q = useQuasar();
const router = useRouter();
const store = useAuthenticationStore();

defineOptions({
  name: 'AdminLoginPage'
});


function adminLogin() {
  loginLoading.value = true;
  store.signIn(loginEmail.value, loginPassword.value).then(() => {
    loginLoading.value = false;
    $q.notify({
      type: 'positive',
      message: 'User logged in!'
    })
    router.push("/admin/preview");
  }).catch((error) => {
    let message = "";
    switch (error) {
      case "auth/user-not-found":
      case "auth/wrong-password":
        message = "Email and/or password incorrect!";
        break;
      case "auth/invalid-email":
        message = "Email invalid!";
        break;
      case "auth/user-disabled":
        message = "Administrator disabled this user!";
        break;
      default:
        message = `There was an error in your request, please try again later!`;
        break;
    }
    $q.notify({
      type: 'negative',
      message: message
    })
    loginLoading.value = false;
  });
}
</script>
