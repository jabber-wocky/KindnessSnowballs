<template>
  <div>
    <section class="text-xs-center snowball-title">
      <simple-svg 
        :filepath="snowflake"
        :width="'125px'"
        fill="#A8A9C5"
      />
      <h1 class="accent--text">Snowball of Kindness</h1>
    </section>

    <v-footer dark height="auto" class="accent">
      <v-layout
        column
        wrap
        class="my-5"
        align-center
      >
        <v-flex xs12 sm4 class="my-3">
          <div class="text-xs-center">
            <h2 class="headline">Were you hit by a kindness snowball?</h2>
            <span class="subheading">
              Share your story with us and read about how a single act of kindness can snowball into so much more.
            </span>
          </div>
        </v-flex>
        <v-flex xs12>
          <v-container grid-list-xl>
            <v-layout row wrap align-center>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="white--text">fa-hands-helping</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">Get hit by a snowball</div>
                  </v-card-title>
                  <v-card-text>
                    The grade one students of Maple Ridge Elementary School are learning about how acts of kindness snowball. 
                    Our paper snowballs are making their way around our community accompanied by random acts of kindness. 
                    Receipeints of these snowballs are part of a chain that began at our school in December 2018.
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="white--text">fa-paper-plane</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline">Throw it along</div>
                  </v-card-title>
                  <v-card-text>
                    We need your help snowballing kindness. If you've receive a paper snowball, please perform
                    a random act of kindness to a member of your community and pass the snowball along. 
                    Even if you have not received a snowball we would love your help with this initiative.
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="text-xs-center">
                    <v-icon x-large class="white--text">fa-comment-alt</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">Share your story</div>
                  </v-card-title>
                  <v-card-text>
                    We'd love to hear your story! Please tell us about a random act of kindness done to you or one that you've performed.
                    Enjoy <a href="#">reading stories</a> we're collecting of how kindness has snowballed around our community.
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </v-footer>
  </div>
</template>

<script>
import snowflakeSvg from '@/assets/snowflake.svg'
export default {
  data() {
    return {
      snowflake: snowflakeSvg
    }
  }
}
</script>
<style scoped>
.snowball-title {
  margin-top:20px;
  margin-bottom:20px;
}
.snowball-title h1 {
  font-family: 'Mountains of Christmas', cursive;
  font-size:35pt;
}
</style>