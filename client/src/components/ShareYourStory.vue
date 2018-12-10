<template>
  <v-dialog v-model="showDialog" max-width="600px" >
    <v-snackbar v-model="showSnackbar" bottom :timeout="0" slot="activator">
      Were you hit by a snowball of kindness?
      <v-btn color="pink" flat>
        Share
      </v-btn>
    </v-snackbar>

  <v-card>
    <v-card-title class="headline grey lighten-2" primary-title>
      Share your story
    </v-card-title>

    <v-card-text>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-text-field
          v-model="name"
          label="Display Name (Optional)"
          
        ></v-text-field>
        <v-textarea
          v-model="story"
          :rules="storyRules"
          label="Story"
          required
          multi-line
          auto-grow
        ></v-textarea>
        <vue-recaptcha 
          ref="recaptcha"
          @verify="onVerify"
          @expired="onExpired"
          sitekey="6Lf9oH8UAAAAAORH4YyRFnRfWY7QJNLdeEwrm5jf" >
        </vue-recaptcha>
      </v-form>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" flat @click="cancel">
        Cancel
      </v-btn>
      
      <v-btn color="primary" flat @click="submit" :disabled="token === null"  :loading="loading">
          Share
        </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha';
import { mapState, mapActions } from 'vuex'
export default {
  components: { VueRecaptcha },
  data() {
    return {
      showDialog: false,
      valid: false,
      name: '',
      story: '',
      storyRules: [
        v => !!v || 'Required'
      ],
      token: null,
      loading: false
    }
  }, 
  computed: {
    ...mapState([
      'siteKey'
    ]),
    showSnackbar() {
      return !this.showDialog;
    }
  },
  methods: {
    ...mapActions({
      add : 'story/add'
    }),

    clear() {
      this.$refs.form.reset()
      this.name = ''
      this.comment = ''
      this.valid = false

    },
    cancel() {
      this.clear()
      this.showDialog = false
    },
    submit: async function() {
      if (this.$refs.form.validate()) {
        this.loading = true
        try {
          await this.add({
            name: this.name,
            story: this.story,
            token: this.token
          })
        }
        catch(error) {
          console.error("error saving story", error)
        }
        finally {
          this.loading = false
        }
        this.clear()
        this.showDialog = false
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
  mounted() {
    this.$ga.page('/share')
  }
}
</script>

<style>

</style>
