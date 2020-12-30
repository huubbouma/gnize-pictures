<template>
  <div>
    <div v-if="isAuthenticated">
      already logged in as {{ userId }}
    </div>
    <form novalidate class="md-layout" @submit.prevent="formSubmit">
      <div class="md-layout-item">
        <div>
          <div class="md-title">Inloggen</div>
        </div>

        <div>
          <div :class="getValidationClass('email')">
            <label for="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              autocomplete="email"
              v-model="form.email"
              :disabled="sending"
            />
            <span class="md-error" v-if="!$v.form.email.required">E-mail is vereist</span>
            <span class="md-error" v-else-if="!$v.form.email.email">Onjuist e-mail formaat</span>
          </div>
          <div :class="getValidationClass('password')">
            <label for="password">Wachtwoord</label>
            <input
              type="password"
              name="password"
              id="password"
              autocomplete="password"
              v-model="form.password"
              :disabled="sending"
            />
            <span class="md-error" v-if="!$v.form.password.required">wachtwoord is vereist</span>
          </div>
        </div>

        <!-- <md-progress-bar md-mode="indeterminate" v-if="sending" /> -->

        <div>
          <button type="submit" class="md-primary" :disabled="sending">Login</button>
        </div>
      </div>
    </form>
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
    ...mapGetters([
      'userId',
      'isAuthenticated',
    ]),
    loginDialog: {
      get() {
        return !this.isAuthenticated;
      },
      set(/* value */) {},
    },
  },
  methods: {
    getValidationClass(fieldName) {

      const field = this.$v.form[fieldName];

      if (field.$invalid && field.$dirty || this.loginFailed === true) {
        return {
          'md-invalid': true
        }
      }

      return null;
      // return field
      //   ? {
      //       'md-invalid': field.$invalid && field.$dirty,
      //     }
      //   : null;
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
            severity: 'error',
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
