<template>

  <div class="accent white--text py-3 px-1">
    <div class="text-xs-center">
      <h2 class="headline">Share your story with us</h2>
      <span class="subheading">
        See how small acts of kindness started by grade one students have snowballed into more.
      </span>
    </div>

    <v-item-group class="mt-3i"   v-show="showDetails">
      <v-container grid-list-sm>
        <v-layout wrap>
          <v-flex xs12 sm4>
            <v-card class="elevation-0 transparent" dark>
              <v-card-text class="text-xs-center">
                <v-icon x-large>fa-hands-helping</v-icon>
              </v-card-text>
              <v-card-title primary-title class="layout justify-center">
                <div class="title text-xs-center">Get hit by a snowball</div>
              </v-card-title>
              <v-card-text>
                <p>
                  The grade one students of Maple Ridge Elementary School are learning how acts of kindness snowball. 
                  Our paper snowballs are making their way around our community accompanied by random acts of kindness. 
                </p>
                <p>
                  You, as a recipient of a snowball, are part of a chain that began at our school in December 2018.
                </p>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 sm4>
            <v-card class="elevation-0 transparent" dark>
              <v-card-text class="text-xs-center">
                <v-icon x-large>fa-paper-plane</v-icon>
              </v-card-text>
              <v-card-title primary-title class="layout justify-center">
                <div class="title">Throw it along</div>
              </v-card-title>
              <v-card-text>
                <p>
                  We need your help snowballing kindness. If you receive a paper snowball, please perform
                  a random act of kindness to a member of your community and pass the snowball along. 
                </p>
                <p>
                  Even if you have not received a snowball, we would love your help spreading kindness.
                </p>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 sm4>
            <v-card class="elevation-0 transparent" dark>
              <v-card-text class="text-xs-center">
                <v-icon x-large>fa-comment-alt</v-icon>
              </v-card-text>
              <v-card-title primary-title class="layout justify-center">
                <div class="title">Share your story</div>
              </v-card-title>
              <v-card-text>
                We'd love to hear your story! Please tell us about a random act of kindness done to you or one that you've performed.
                Enjoy reading stories we're collecting on how kindness has snowballed around our community.
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-item-group>
    <div class="text-xs-center">
      <v-btn v-show="showDetails" @click="showDetails = false" flat color="white"><v-icon>fas fa-chevron-up</v-icon></v-btn>
      <v-btn v-show="!showDetails" @click="showDetails = true" flat color="white"><v-icon>fas fa-chevron-down</v-icon></v-btn>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showDetails: false
    }
  }, 
  methods: {
    toggle() {
      this.showDetails = !this.showDetails;
    }
  },
  computed: {
    icon() {
      return this.showDetails ? "fas fa-chevron-down" : "fas fa-chevron-up"
    }
  }
}
</script>