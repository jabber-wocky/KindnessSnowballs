<template>

 <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-card>

          <v-card-title primary-title>
              <h3 class="headline mb-0">Login</h3>
          </v-card-title>
          <v-card-text>
            <v-alert v-if="errorMessage != ''" type="error" :value="true" class="mb-4 mt-0">
              {{ errorMessage }}
            </v-alert>
            <v-text-field
              v-model="username"
              :rules="usernameRules"
              label="Username"
              required
            ></v-text-field>

            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Password"
              type="password"
              required
            ></v-text-field>

            <vue-recaptcha 
              ref="recaptcha"
              @verify="onVerify"
              @expired="onExpired"
              sitekey="6Lf9oH8UAAAAAORH4YyRFnRfWY7QJNLdeEwrm5jf" >
            </vue-recaptcha>

          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="submit" :disabled="!valid || token === null" :loading="loading">Login</v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'
import VueRecaptcha from 'vue-recaptcha';

export default {
  components: { VueRecaptcha },
  props: [
    "returnTo"
  ],
  data() {
    return {
      valid: false,
      username: '',
      usernameRules: [
        v => !!v || 'Username is required',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required'
      ],
      errorMessage: "",
      loading: false,
      token: null
    }
  }, 
  methods: {
    ...mapActions([
      'login'
    ]),
    getReturnTo() {
      if (typeof(this.returnTo) === "undefined") {
        return "/admin"            
      }
      return this.returnTo
    },
    submit: async function() {
      this.errorMessage = ''
      if (this.$refs.form.validate()) {
        this.loading = true
        var data = {
          username: this.username,
          password: this.password,
          token: this.token
        }
        try {
          await this.login(data)
          console.log("successfully logged in:", this.getReturnTo())
          this.$router.push({ path: this.getReturnTo() })
        }
        catch (error) {
          console.error("error", error)
          this.errorMessage = error.response.data
        }
        finally {
          this.loading = false
        }
      }
    },
    onVerify(token) {
      this.token = token
    },
    onExpired() {
      this.token = null
      this.$refs.recaptcha.reset()
    },

  },
}
</script>
