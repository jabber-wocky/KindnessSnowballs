<template>
<section>
  <h2 class="headline mt-3 text-xs-center">Stories</h2>
   <v-timeline class="mx-5">
    <v-timeline-item
      v-for="n in stories"
      :key="n.id"
      color="red lighten-2"
      large
      icon="fas fa-snowflake"
    >
      <span slot="opposite">
        {{ fromNow(n.posted) }}
      </span>
      <v-card class="elevation-2">
        <v-card-title v-if="n.name !== null && n.name.length > 0" class="headline" >{{n.name}}</v-card-title>
        <v-card-text>
          {{n.story}}
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>

</section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      stories: 'story/all'
    }),
  },
  
  methods: {
    ...mapActions({
      load: 'story/load'
    }),
    formatDate(postedDate) {
      return this.moment.tz(postedDate, this.tz).format('MMMM D, YYYY hh:mm')
    },
    fromNow(postedDate) {
      return this.moment.tz(postedDate, this.tz).fromNow();
    }


  }, 
  mounted() {
    this.tz = this.moment.tz.guess()
    this.load().then()
  }
}
</script>

