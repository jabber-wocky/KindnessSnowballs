<template>
  <div>
    <infoPanel />

    <stories />

    <share-your-story />

  </div>
</template>

<script>
import infoPanel from './_infoPanel'
import stories from './_stories'
import shareYourStory from '@/components/ShareYourStory'
export default {
  components: { infoPanel, stories, shareYourStory },
  mounted() {
    this.$ga.page('/')
  }
}
</script>
