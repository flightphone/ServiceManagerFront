<template>
  <div style="height:100vh;maxheight:100vh;overflow:auto">
    <div v-bind:hidden="mode!='edit'" style="height:100vh;maxheight:100vh;overflow:auto">
      <v-app-bar app  max-width="100vw">
        <v-app-bar-nav-icon v-if="action!='setting'" @click="mainObj.drawer = !mainObj.drawer"></v-app-bar-nav-icon>
        
        
        
        <v-toolbar-title>{{Descr()}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="addfile()" v-if="!readonly && findData.AddKeys">
          <v-icon title="Добавить файл">mdi-paperclip</v-icon>
        </v-btn>

        <v-btn icon @click="save()" v-if="!readonly">
          <v-icon title="Сохранить">mdi-check</v-icon>
        </v-btn>
        <v-btn icon @click="closeEditor()">
          <v-icon title="Отменить">mdi-window-close</v-icon>
        </v-btn>
      </v-app-bar>
      <v-main>
        <slot>
        <v-simple-table>
          <template v-slot:default>
            <tbody v-if="(nupdate > 0) && uid !=''">
              <template v-if="readonly">
                <tr v-for="(column, index) in findData.Fcols" :key="index" style="background-color:white">
                  <td style="border-bottom: none;">
                    <v-text-field
                      :label="column.FieldCaption"
                      :key="column.FieldName + uid"
                      :value="findData.WorkRow[column.FieldName]"
                      readonly
                    ></v-text-field>
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr v-for="(column, index) in findData.ReferEdit.Editors" :key="index" style="background-color:white">
                  <td style="border-bottom: none;">
                  <v-text-field
                      v-if="column.DisplayFormat=='password' && (nupdate > 0)"
                      :label="column.FieldCaption"
                      :key="column.FieldName + uid"
                      v-model="findData.WorkRow[column.FieldName]"
                      :append-icon="column.show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="column.show1 ? 'text' : 'password'"
                      @click:append="column.show1 = !column.show1; nupdate++;"
                    
                    ></v-text-field>
                    <template v-else>
                  
                  <!--28.07.2022-->
                   <v-textarea v-if="column.DisplayFormat=='text'" 
                     :label="column.FieldCaption"
                      :key="column.FieldName + uid"
                      v-model="findData.WorkRow[column.FieldName]"
                    ></v-textarea>  
                    <template v-else>
                    <v-text-field
                      v-if="column.joinRow==null"
                      :label="column.FieldCaption"
                      :key="column.FieldName + uid"
                      v-model="findData.WorkRow[column.FieldName]"
                      :disabled = "column.DisplayFormat=='disabled'"
                    ></v-text-field>
                    <template v-else>
                     <!--выводим checklist 27.07.2022--> 
                      <v-text-field
                      v-if="(column.joinRow.classname == 'CheckList' || column.joinRow.classname == 'List')"
                      :label="column.FieldCaption"
                      :key="column.FieldName + uid"
                      v-model="findData.WorkRow[column.FieldName]"
                    ></v-text-field>

                      <v-text-field
                        v-if="column.joinRow.classname == 'Bureau.Finder'"
                        :label="column.FieldCaption"
                        :key="column.FieldName + uid"
                        v-model="findData.WorkRow[column.FieldName]"
                        append-icon="mdi-magnify"
                        @click:append="open(index)"
                        readonly
                      ></v-text-field>

                      <v-select
                        v-if="column.joinRow.classname == 'Bureau.GridCombo'"
                        :label="column.FieldCaption"
                        :items="column.joinRow.FindConrol.MainTab"
                        :item-value="column.joinRow.keyField"
                        :item-text="column.joinRow.FindConrol.DispField"
                        :key="column.FieldName + uid"
                        v-model="findData.WorkRow[column.joinRow.valField]"
                        @change="(event)=>sortChange(event, column)"
                      ></v-select>


                    </template>
                    </template>
                    </template>
                  </td>
                </tr>
              </template>
            </tbody>
          </template>
        </v-simple-table>
        <!--файлы 01.08.2022 -->
        <FileList 
        :findData = "findData"
        v-if="!readonly && findData.AddKeys">

        </FileList>


        <template v-if="!readonly">
      <template v-for="(column, index) in findData.ReferEdit.Editors">
        <template v-if="column.joinRow != null && (column.joinRow.classname == 'CheckList' || column.joinRow.classname == 'List')">
            <span style="margin-left:15px"
            :key="index"
            >{{column.joinRow.FindConrol.Descr}}:</span>
            <v-simple-table 
            dense
            :key="index"
            >
            <template v-slot:default>
              <thead>
              <tr dence>
                <th style="background-color: LightGrey"
                v-if="column.joinRow.classname == 'CheckList'"                
                >
                   Доступ 
                </th>
                <th style="background-color: LightGrey" v-for="col in column.joinRow.FindConrol.Fcols"
                  :key="col.FieldName"
                >{{col.FieldCaption}}</th>
                
              </tr>
            </thead>
              <tbody v-if="(nupdate > 0) && uid !=''">
              
              <template v-for="(row, index) in column.joinRow.FindConrol.MainTab">
              <tr dense
              v-if="column.joinRow.classname == 'CheckList' || row.check"
              style="border-bottom: none;"
              :key="index"
              >
              
              <td dense v-if="column.joinRow.classname == 'CheckList'">
                <v-checkbox
                  v-model="row.check"
                >
                </v-checkbox>
              </td>

              <td dense
                  v-for="col in column.joinRow.FindConrol.Fcols"
                  :key="col.FieldName"
                >{{row[col.FieldName]}}</td>
              
              
              </tr>
              </template>
              </tbody>
            </template>
            </v-simple-table>

          
        </template>
      </template>
      </template>      
        </slot>
      </v-main>
    </div>
    <template v-if="!readonly">
      <template v-for="(column, index) in findData.ReferEdit.Editors">
        <template v-if="column.joinRow != null">
          <Finder
            v-if="column.joinRow.classname == 'Bureau.Finder' || column.joinRow.classname == 'CheckList' || column.joinRow.classname == 'List'"
            :visible="mode=='finder_' + index.toString()"
            :params="column.joinRow.IdDeclare"
            :editid="index"
            :findData="column.joinRow.FindConrol"
            :key="index"
            :selectFinder="selectFinder"
            :clearFinder="clearFinder"
          />
        </template>
      </template>
    </template>
  </div>
</template>

<script>
import { mainObj } from "../main";
import FileList from "./FileList.vue"

export default {
    name: "Editor",
    data: () => ({
        mode: "edit",
        mainObj: mainObj,
        nupdate: 1
    }),
    props: {
        save: Function,
        closeEditor: Function,
        action: String,
        findData: Object,
        uid: String,
        readonly: Boolean
    },
    beforeCreate: function () {
        this.$options.components.Finder = require("./Finder.vue").default;
    },
    methods: {
        addfile: function () {
            this.findData.newfile()
        },
        Descr: function () {
            if (this.action == "add")
                return "Новая запись (" + this.findData.Descr + ")";
            if (this.action == "edit") {
                if (this.readonly)
                    return "Просмотр (" + this.findData.Descr + ")";
                else
                    return "Редактирование (" + this.findData.Descr + ")";
            }
            if (this.action == "setting")
                return "Параметры (" + this.findData.Descr + ")";
        },
        open: function (index) {
            this.mode = "finder_" + index.toString();
        },
        selectFinder: function (editid) {
            let column = this.findData.ReferEdit.Editors[editid];
            let c = this.findData.ReferEdit.Editors[editid].joinRow.FindConrol.curRow;
            let row = column.joinRow.FindConrol.MainTab[c];
            for (let s in column.joinRow.fields) {
                this.findData.WorkRow[column.joinRow.fields[s]] = row[s];
            }
            this.nupdate = this.nupdate + 1;
            this.mode = "edit";
        },
        sortChange: function (event, column) {
            column.joinRow.FindConrol.MainTab.map(row => {
                if (row[column.joinRow.keyField] == event) {
                    for (let s in column.joinRow.fields) {
                        this.findData.WorkRow[column.joinRow.fields[s]] = row[s];
                    }
                }
            });
            this.nupdate = this.nupdate + 1;
        },
        clearFinder: function () {
            this.mode = "edit";
        },
        textChange: function (event, index) {
            this.findData.WorkRow[index] = event;
        }
    },
    components: { FileList }
};
</script>