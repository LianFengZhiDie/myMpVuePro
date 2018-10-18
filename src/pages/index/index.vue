<template>
  <!--页面spm class data-spm='值'-->
  <div id="product-list">
    首页
  </div>
</template>
<script>
import appData from '@/utils/appData'
export default {
  name: 'product-list',
  data () {
    return {
    }
  },
  components: {
  },
  methods: {
  },
  mounted () {
    appData.setData('aa', 1)
  },
  onShow () {
  },
  onLoad () {
  }
}
</script>

<style lang="scss" scoped>
  #product-list {
  }
</style>
