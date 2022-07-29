import Vue from 'vue';
import App from './App.vue';

import Comp1 from './components/Comp1.vue';
import vuetify from './plugins/vuetify';


Vue.config.productionTip = true;
const prodaction = true;
let start = "-1"


let openMap = new Map();
openMap.set(start,
  {
    Control: Comp1,
    Params: "150",
    SQLParams: null,
    data: {}
  });

let openIDs = [];
  openIDs.push(start);  

//21.07.2022
window.location.hash = start  


//запускаем нужную форму через стартовый якорь, например  #81 тарифы  
let mainObj = {
  message: "__",
  drawer: false,
  current: start,
  openAlert: false,
  alert: function (title, text) {
    this.alertConfirm = false;
    this.alertTitle = title;
    this.alertText = text;
    this.openAlert = true;
  },
  confirm: function (title, text, action) {
    this.alertConfirm = true;
    this.alertTitle = title;
    this.alertText = text;
    this.confirmAction = action;
    this.openAlert = true;
  },
  history: [start],
  curhistory: 0,

  gridHeight: function () {
    return document.documentElement.clientHeight - 68;

  },
  selectedColor: "LightGreen",
  dateformat: function (d, f) {
    if (f == 'password')
      return '*****';

    if (!d) return d;

    if (f=="text" || f == "hide")
      return d;

    if (d.length < 19) {
      let res = f.match(/0\.(0+)/);

      let n = 0;
      if (res)
        if (res.length > 1) {
          n = res[1].length;
        }

      if (n > 0) return Number(d.toString()).toFixed(n);
      else return d;
    }
    f = f.replace("yyyy", d.substr(0, 4));
    f = f.replace("yy", d.substr(2, 2));
    f = f.replace("MM", d.substr(5, 2));
    f = f.replace("dd", d.substr(8, 2));
    f = f.replace("HH", d.substr(11, 2));
    f = f.replace("mm", d.substr(14, 2));
    return f;
  },
  resize: function () {
    openMap.forEach((value) => {
      if (value.resize)
        value.resize()
    });
  },
  openFinder: function(iddeclare, newid, Finder)
  {
    let obj = {
      Control: Finder,
      Params: iddeclare,
      SQLParams: null,
      data: {}
    };
    
    //пересоздаем заново
    if (openMap.get(newid) != null)
    {
      openMap.delete(newid);
    }
    openMap.set(newid, obj);
    openIDs.push(newid);

    /*
    if (openMap.get(newid) == null) {
      openMap.set(newid, obj);
      openIDs.push(newid);
     }
   */
    mainObj.current = newid;
    window.location.hash = newid;
  }
};

const baseUrl = (prodaction) ? "" : "http://localhost:5000/";






//размеры окон 24/05/2022
window.addEventListener('resize', function() {
  if (mainObj.resize)
      mainObj.resize()
}, true);

//история переходов
window.addEventListener('popstate', function() {
  let hi = window.location.hash.replace('#', '');
  if (hi!=mainObj.current && openIDs.includes(hi))
  {
      mainObj.current = hi;
  }
}, false);

Vue.component('uni-comp', {
  data: function () {
    return {
      openMap: openMap,
      mainObj: mainObj
    };
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  render: function (createElement) {
    let C = openMap.get(this.id).Control;
    let params = openMap.get(this.id).Params;
    let v = (mainObj.current == this.id);
    return createElement(C, {
      props: {
        id: this.id,
        params: params,
        visible: v
      }
    });
  }
});

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app');

export { openMap, mainObj, openIDs, prodaction, baseUrl }


