<template>
  <div class="home">
    <div class="row">
      <img alt="mainbackground" src="../assets/home-background.jpg" style="min-width: 100%">
    </div>
    <div class="d-flex">
            <div class="bg-light border-right col-sm-2 scrollable-menu" id="sidebar">
              <p> Halo here</p>
            </div>
            <div class="col-sm-10" id="page-content">
              
              <AllQuestions />
            </div>
            
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import AllQuestions from '@/components/AllQuestions.vue'
export default {
  name: 'home',
  components: {
    HelloWorld,
    AllQuestions
  },
};
</script>
