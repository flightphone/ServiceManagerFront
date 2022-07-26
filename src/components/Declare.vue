<template>
  <Finder :id="id" :visible="visible" :params="params" ref="columnEdit">
    <template>
      <v-btn icon @click="update()">
        <v-icon>mdi-download</v-icon>
      </v-btn>
      <v-btn icon @click="save()">
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
      <v-btn icon @click="del()">
        <v-icon>mdi-delete</v-icon>
      </v-btn>

    </template>
  </Finder>
</template>
<script>
import { mainObj, openMap, baseUrl } from "../main";
import Finder from "./Finder";
export default {
  name: "Declare",
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
    del: function () {
      let c = openMap.get(this.id).data.curRow;
      if (c < 0 || c > openMap.get(this.id).data.MainTab.length - 1) return;
      let ido = openMap.get(this.id).data.MainTab[c]["iddeclare"];
      if (ido == null)
        ido = openMap.get(this.id).data.MainTab[c]["IdDeclare"];
      let id = ido.toString();
      let lnk = baseUrl + "React/ClearColumn?id=" + id;

      fetch(lnk, {
        method: "GET"
      })
        .then(function (result) {
          return result.json();
        })
        .then(function (msg) {
          mainObj.alert("Колонки таблиц", msg.Error);
        });
    },

    update: function () {
      let c = openMap.get(this.id).data.curRow;
      if (c < 0 || c > openMap.get(this.id).data.MainTab.length - 1) return;
      let id = openMap.get(this.id).data.MainTab[c]["iddeclare"].toString();
      let lnk = baseUrl + "React/UpdateColumn?id=" + id;

      fetch(lnk, {
        method: "GET"
      })
        .then(function (result) {
          return result.json();
        })
        .then(function (msg) {
          mainObj.alert("Колонки таблиц", msg.Error);
        });
    },

    save: function () {
      let c = openMap.get(this.id).data.curRow;
      if (c < 0 || c > openMap.get(this.id).data.MainTab.length - 1) return;
      let id = openMap.get(this.id).data.MainTab[c]["iddeclare"].toString();
      let lnk = baseUrl + "React/SaveColumn?id=" + id;

      fetch(lnk, {
        method: "GET"
      })
        .then(function (result) {
          return result.json();
        })
        .then(function (msg) {
          mainObj.alert("Колонки таблиц", msg.Error);
        });
    }
  }
};
</script>