<template>
  <div>
    <app-navbar />
    <!-- <router-link /> --> 
    <router-view />
    <app-footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footbar from '@/components/Footer.vue';

export default {
  components: {
    "app-navbar": Navbar,
    "app-footer": Footbar,
  },
  data() {
    return {
      message: 'Ready to ask something',
    };
  },
  methods: {
    greet() {
      alert('Hello from click');
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
