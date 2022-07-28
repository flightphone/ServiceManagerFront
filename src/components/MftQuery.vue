<template>
  <Finder :id="id" :visible="visible" :params="params" ref="mftquery">
    <template>
     <v-tooltip left>
      <template v-slot:activator="{ on, attrs }">   
      <v-btn icon @click="open()"
          v-bind="attrs"
          v-on="on"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      </template>
      <span>Редактировать данные НСИ</span>
    </v-tooltip>
    </template>
  </Finder>
</template>
<script>
import { mainObj, openMap } from "../main";
import Finder from "./Finder";
export default {
  name: "MftQuery",
  data: () => ({}),
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    id: String,
    params: String
  },
  components: { Finder },
  methods: {
    open: function () {
      let c = openMap.get(this.id).data.curRow;
      if (c < 0 || c > openMap.get(this.id).data.MainTab.length - 1) return;
      let rw = openMap.get(this.id).data.MainTab[c];
      let iddeclare = rw["iddeclare"].toString();
      let newid = this.id + "_query_" + rw["iddeclare"].toString();
      mainObj.openFinder(iddeclare, newid, Finder);
    },

    
  }
};
</script>