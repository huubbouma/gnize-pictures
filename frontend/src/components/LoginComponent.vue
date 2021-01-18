<template>
  <div>
    <Card v-if="isAuthenticated">
      <template #title>Al ingelogd</template>
      <template #content>
        <div class="p-mb-2">Je bent al ingelogd als {{ userId }}</div>
        <div><Button @click="logout" label="Log uit"></Button></div>
      </template>
    </Card>

    <Card v-if="!isAuthenticated">
      <template #title>Login</template>
      <template #subtitle> Je moet inloggen om de inhoud van deze website te kunnen zien </template>
      <template #content>
        <div class="p-fluid">
          <form novalidate @submit.prevent="formSubmit">
            <div class="p-formgroup-inline">
              <div class="p-field">
                <label for="email" class="p-sr-only">E mail</label>
                <InputText
                  id="email"
                  placeholder="E mail"
                  :disabled="sending"
                  autocomplete="email"
                  v-model="form.email"
                  :class="{ 'p-invalid': isFieldValid('email') }"
                />
                <span class="p-error" v-if="$v.form.email.required.$invalid"
                  >E-mail is vereist</span
                >
                <span class="p-error" v-else-if="$v.form.email.email.$invalid"
                  >Onjuist e-mail formaat</span
                >
              </div>

              <div class="p-field">
                <label for="password" class="p-sr-only">Wachtwoord</label>
                <InputText
                  id="password"
                  placeholder="Wachtwoord"
                  type="password"
                  :disabled="sending"
                  autocomplete="password"
                  v-model="form.password"
                  :class="{ 'p-invalid': isFieldValid('password') }"
                />
                <span class="p-error" v-if="$v.form.email.required.$invalid"
                  >Wachtwoord is vereist</span
                >
              </div>

              <ProgressSpinner v-if="sending" />

              <Button
                :disabled="sending"
                type="submit"
                label="Login"
                icon="pi pi-angle-right"
                iconPos="right"
              />
            </div>
          </form>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
// import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';

export default {
  name: 'LoginComponent',
  // mixins: [validationMixin],

  data: () => ({
    form: {
      email: null,
      password: null,
    },
    sending: false,
    errors: [],
    showSnackbar: false,
    snackbarMsg: '',
    loginFailed: false,
  }),

  validations: {
    form: {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    },
  },

  computed: {
    ...mapState(['user']),
    ...mapGetters(['userId', 'isAuthenticated']),
  },
  methods: {
    logout() {
      this.$store.dispatch('AUTH_LOGOUT');
    },
    isFieldValid(fieldName) {
      const field = this.$v.form[fieldName];

      if ((field.$invalid && field.$dirty) || this.loginFailed === true) {
        return false;
      }

      return true;
    },
    clearForm() {
      this.$v.$reset();
      this.form.email = null;
      this.form.password = null;
    },
    formSubmit() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.loginUser();
      }
    },

    loginUser() {
      const payload = { email: this.form.email, password: this.form.password };
      this.$store.dispatch('AUTH_REQUEST', payload).then(
        () => {
          this.$toast.add({
            severity: 'info',
            summary: 'Logged in',
            detail: `Logged in as ${this.userId}`,
          });
          this.loginFailed = false;
        },
        () => {
          this.$toast.add({
            severity: 'warn',
            summary: 'Login failed',
            detail: 'Cannot login with this email / password combination',
          });
          this.loginFailed = true;
        },
      );
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
