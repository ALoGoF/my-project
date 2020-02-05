<template>
  <div class="home">
    <svg-icon class="full-width" style="height: 500px;" name="binggan"></svg-icon>
  </div>
</template>

<script>
import { test } from '@/api/test';

export default {
  name: 'home',
  created() {
    test().then(res => {
      console.log(res)
    })
  }
}
</script>
