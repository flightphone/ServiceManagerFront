<template>
    <div   v-bind:hidden="!visible" style="background-color: #84FFFF;height: 100%;" >
        <div style="background-color: white;text-align: center;position:absolute;left:0px;bottom:0px;width:100%;font-size: 11px">
          ООО ... © 2022
        </div>
      <v-app-bar app>
        <v-app-bar-nav-icon @click="mainObj.drawer = !mainObj.drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Справочники</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-app-bar>
      <v-main>
        <div v-bind:style="{height:gridHeight+'px'}">
          <v-card v-if="!loading" style="position:absolute;left:70px;top:50px;width: 320px; height: 200px;"
            tile
            flat
             class="mx-auto rounded-xl"
          >
          <v-list dense>
            <v-list-item-group >
              <v-list-item dense v-for="item in items" :key="item.id" @click="open(item)">
                <v-list-item-content>
                   <v-list-item-title class="subtitle-2">{{item.text}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>

          </v-card>

          <v-card v-if="!loading" style="position:absolute;right:70px;bottom:70px;width: 320px; height: 200px;"
            tile
            flat
             class="mx-auto rounded-xl"
          >
          <v-list dense>
            <v-list-item-group >
              <v-list-item dense v-for="item in items2" :key="item.id" @click="open(item)">
                <v-list-item-content>
                   <v-list-item-title class="subtitle-2">{{item.text}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          </v-card>
      </div>
        
      </v-main>
    </div>
</template>
<script>
import {mainObj, openIDs, prodaction, baseUrl, openMap} from "../main"
import Finder from "./Finder.vue";
export default {
    name: "Comp1",
    data: () => ({
    mainObj: mainObj,
    loading: true,
    gridHeight: mainObj.gridHeight(),
    items: [],
    items2: []
  }),
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  
  methods:{
    resize: function()
        {
            this.gridHeight = mainObj.gridHeight()
        },
    open: function(item){
      let obj = {
        Control: Finder,
        Params: item.iddeclare,
        SQLParams: null,
        data: {}
      };
      let newid = item.id;
      if (openMap.get(newid) == null) {
        openMap.set(newid, obj);
        openIDs.push(newid);
      }
      mainObj.current = newid;
      window.location.hash = newid;
    }
  },
  mounted: async function() {
    let mid = openMap.get("-1");
    mid.resize = this.resize;
    let url = baseUrl + "React/Banner";
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: prodaction ? "no-cors" : "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: prodaction ? "include" : "omit" // include, *same-origin, omit
    });
    let data = await response.json(); 
    Array.prototype.push.apply(this.items, data.items);
    Array.prototype.push.apply(this.items2, data.items2);
    this.loading = false;
    //mainObj.drawer = true; //так красивее, меню слева и не прыгает каждый раз, отменили по запросу 31.07.2022
          
    
  }
}
</script>