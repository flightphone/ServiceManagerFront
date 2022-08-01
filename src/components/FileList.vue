<template>
    
    <v-list>
    <v-list-item>
    <v-list-item-icon>
    <v-btn icon @click="download()" v-if="status=='Загружен'">
        <v-icon title="Скачать файл">mdi-download</v-icon>
    </v-btn>
    
    <v-btn icon @click="del()" v-if="status!='Нет'">
        <v-icon title="Удалить файл">mdi-delete</v-icon>
    </v-btn>
    </v-list-item-icon>
    
    <v-list-item-content>
    <v-list-item-title>Файл: {{status}}</v-list-item-title>
    <input type="file" ref="fileUploadElem" style="display:none" @change="handleFiles();" />
    <a hidden ref="fileLink" target="_blank"></a>
    </v-list-item-content>
    
    </v-list-item>
    </v-list>

</template>
<script>
import { mainObj, baseUrl } from "../main";
export default {
    name: "FileList",
    data: () => ({
        status: String
    }),
    props: {
        findData:Object
    },
    computed: {
        
    },
    methods: {
        del: function(){
            this.findData.WorkRow[this.findData.AddKeys] = 0
            this.status = 'Нет'
        },
        download: function() {
            let fh_pk = this.findData.WorkRow[this.findData.AddKeys];
            let c = baseUrl + 'FileLoad/dnload?fh_pk=' + fh_pk
            this.$refs.fileLink.href = c;
            this.$refs.fileLink.click();
        },
        newfile: function(){
            this.$refs.fileUploadElem.click();
        },
        updatefilelist: function(){
            let fileid = this.findData.WorkRow[this.findData.AddKeys]
            this.status = (fileid)?"Загружен":"Нет"
        },

        handleFiles: async function() {
            
            let files = this.$refs.fileUploadElem.files;
            if (!files.length) 
                return;
            let file = files[0]
            this.status = file.name  
            let url = "FileLoad/upload"
            let bd = new FormData();
            bd.append("files", file);
            let data = await mainObj.fetch(url, bd);
            this.$refs.fileUploadElem.value = "";
            
            if (data.Error)
            {
                mainObj.alert("Загрузка файла", data.Error);
                return;
            }
            this.findData.WorkRow[this.findData.AddKeys] = data.fh_pk
    },        

    },
    mounted: function() {
        this.findData.newfile = this.newfile
        this.findData.updatefilelist = this.updatefilelist
    }
}  
</script>