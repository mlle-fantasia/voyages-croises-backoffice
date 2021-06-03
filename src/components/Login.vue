<template>
  <div class="container">
    <div class="row">
			<div class="col-md-12">
        <div class="text-center">Connexion</div>
        <form @submit="login">
          <div>
            <label for="email">Email</label>
            <input type="text" name="email" v-model="email">
          </div>
          <div>
            <label for="password">Mot de passe</label>
            <input type="password" name="password" v-model="password">
          </div>
          <div>
            <button type="submit">Se connecter</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hello',
  props: {},
  data(){
    return{
      email:"",
      password:""
    };
  },
  methods:{
      async login(event){
      event.preventDefault();
      if(!this.email || !this.password) return;
      let response = await this.$axios.post(
        this.$config.server_url +
          "/login/",
        { email: this.email, password: this.password }
      );
      if(response.data.err){
        this.alertTxt = response.data.errtxt;
      }else{
        let data = {
          token : response.data.data.token,
          refreshtoken : response.data.data.refreshtoken,
          user : response.data.data.user,
          connect:true,
        }
        this.$store.commit("set_connexion", data);
      }
    }
  }
}
</script>

<style scoped>
h1 {
  color:orange
}
</style>
