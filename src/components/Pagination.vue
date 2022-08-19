<template>
  <!--<v-app-bar app  max-width="100vw">-->
    
    <v-toolbar dense flat width="100vw" >
    <span hidden>{{action}}</span>
    <v-spacer></v-spacer>
    <v-btn class="mx-2" small @click="onChangePage(0)" :disabled="page() === 0">
      <v-icon>mdi-page-first</v-icon>
    </v-btn>
    <v-btn  class="mx-2"  small  @click="onChangePage(page()-1)" :disabled="page() === 0">
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <span  class="mx-2" small>
    <!--
    Страница {{page() + 1}} из {{Math.max(0, Math.ceil(count() / nrows()) - 1) + 1}},
    Просмотр {{page() * nrows() + 1}} - {{Math.min((page() + 1) * nrows(), count())}} из {{count()}} записей
    -->  
    {{page() + 1}} из {{Math.max(0, Math.ceil(count() / nrows()) - 1) + 1}}
    </span>
    <v-btn
       class="mx-2" small 
      @click="onChangePage(page()+1)"
      :disabled="page() >= Math.ceil(count() / nrows()) - 1"
    >
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
    <v-btn
       class="mx-2" small 
      @click="onChangePage(Math.max(0, Math.ceil(count() / nrows()) - 1))"
      :disabled="page() >= Math.ceil(count() / nrows()) - 1"
    >
      <v-icon>mdi-page-last</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <!--
    {{page() * nrows() + 1}} - {{Math.min((page() + 1) * nrows(), count())}} из {{count()}}
    -->
    
    </v-toolbar>
  <!--</v-app-bar>-->
</template>
<script>


export default {
  name: "Pagination",
  data: () => ({
    //openMap: openMap,
    rowsPerPage: 30
  }),
  props: {
    //id: String,
    //editid: Number
    findData: Object,
    par: Function,
    action:Object
    
  },
  methods: {
    onChangePage: function(p)
    {
      this.par(p);
    },
    OpenMapData: function() {
      return this.findData;
    },
    count: function() {
      if (this.OpenMapData().TotalTab)
        return this.OpenMapData().TotalTab[0].n_total;
      else return 0;
    },
    page: function() {
      if (this.OpenMapData().page) return this.OpenMapData().page - 1;
      else return 0;
    },
    nrows: function() {
      if (this.OpenMapData().nrows) return this.OpenMapData().nrows;
      else return 30;
    }
  }
};
</script>