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
      How to Share
    </v-card-title>

    <v-card-text>
      <p>Share your story by selecting any of the icons below:</p>
      <v-item-group>
        <v-container grid-list-xs>
          <v-layout wrap class="text-xs-center">
            <v-flex xs4>
              <a target="_blank" href="https://www.facebook.com/sharer.php?u=https://www.snowballofkindness.com&amp;hashtag=%23snowballofkindness">
                <v-icon x-large>fab fa-facebook-square</v-icon>
              </a>
              <p>Facebook</p>
            </v-flex>

            <v-flex xs4>
              <a target="_blank" href="https://twitter.com/intent/tweet?url=https://www.snowballofkindness.com&amp;text=&amp;hashtags=snowballofkindness">
                <v-icon x-large>fab fa-twitter-square</v-icon>
              </a>
              <p>Twitter</p>
            </v-flex>

            <v-flex xs4>
              <a href="mailto:stories@snowballofkindness.com?subject=Story submission">
                <v-icon x-large>fas fa-envelope-square</v-icon>
              </a>
              <p>Email</p>
            </v-flex>
          </v-layout>
        </v-container>
      </v-item-group>

    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" flat @click="showDialog = false">
        Close
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>

<script>
export default {
  data() {
    return {
      showDialog: false
    }
  }, 
  computed: {
    showSnackbar() {
      return !this.showDialog;
    }
  }
}
</script>

<style>

</style>
