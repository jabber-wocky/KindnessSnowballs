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

    <infoPanel />

    <testimonials />

    <share-your-story />
  </div>
</template>

<script>
import snowflakeSvg from '@/assets/snowflake.svg'
import infoPanel from './_infoPanel'
import testimonials from './_testimonials'
import shareYourStory from '@/components/ShareYourStory'

export default {
  components: { infoPanel, testimonials, shareYourStory },
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