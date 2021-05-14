<template>
  <q-img
    class="absolute-top"
    src="https://cdn.quasar.dev/img/material.png"
    style="height: 150px"
  >
    <div class="absolute-bottom bg-transparent">
      <q-avatar size="70px" class="q-mb-sm">
        <img src="https://cdn.pixabay.com/photo/2017/03/20/00/51/dr-2157993_960_720.jpg" />
      </q-avatar>
      <div class="text-weight-bold"> {{medicos.nombre}} </div>
      <div>{{medicos.email}}</div>
    </div>
  </q-img>
</template>

<script>
export default {
  data() {
    return {
      medicos: 
        {
          id: "asdfasd88asd7fas6dfasd",
          email: "algo@gmail.com",
          foto: "http://google.user.content.com/1234123/123.jpg&quot",
          nombre: "Juan Antonio Perez",
          prefijo: "Lic.",
        },
      
    };
  },
};
</script>