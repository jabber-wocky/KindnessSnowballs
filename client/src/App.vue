<template>
<v-app light>
    <v-content>
      <section :class="'snowball-title text-xs-center snowball-title-' + $vuetify.breakpoint.name">
        <v-layout align-center justify-center>
          <v-flex class="text-xs-right"><simple-svg :filepath="snowflake" :width="snowflakeSize" fill="#A8A9C5" class="snowball-icon" /></v-flex>
          <v-flex xs5 class="mx-2"><h1 class="accent--text">Snowball of Kindness</h1></v-flex>
          <v-flex class="text-xs-left"><simple-svg :filepath="snowflake" :width="snowflakeSize" fill="#A8A9C5" class="snowball-icon" /></v-flex>
        </v-layout>
      </section>

      <router-view />

      <share-your-story />


    </v-content>
    <v-footer class="pa-4">
      <v-spacer />
      <div>&copy; 2018</div>
    </v-footer>
</v-app>
</template>

<script>
import snowflakeSvg from '@/assets/snowflake.svg'
import shareYourStory from '@/components/ShareYourStory'

export default {
  name: 'App',
  components: { shareYourStory },
  data () {
    return {
      snowflake: snowflakeSvg,
    }
  },
  computed: {
    snowflakeSize() {
      var size = 75;
      switch(this.$vuetify.breakpoint.name) {
        case 'lg': 
          size = 75;
          break;
        case 'md':
          size = 60;
          break;
        case 'sm':
          size = 60;
          break;
        case 'xs':
          size = 60;
          break;
      }
      return size + 'px'
    }
  }
}
</script>


<style scoped>
  .snowball-title {
    font-family: 'Mountains of Christmas', cursive;
    font-size:40px;
    margin-top:20px;
    margin-bottom:20px;
  }
  .snowball-title-lg  { font-size: 45px; }
  .snowball-title-md  { font-size: 35px; }
  .snowball-title-sm  { font-size: 30px; }
  .snowball-title-xs  { font-size: 25px; }
  
</style>