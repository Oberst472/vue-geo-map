<template>
  <section>
  <div class="conatiner mt-5">
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-3">
        <input class="form-control" type="file" id="input" accept=".xls,.xlsx" @input="download"  >
      </div>
      <div class="col-md-2">
        <button class="bg-indigo-700 px-6 py-3 rounded text-white" id="button" @click="convert">Convert</button>
        <button @click="lol">lolo</button>
      </div>
    </div>
  </div>
  </section>
</template>

<script>

export default {
  mounted() {


    // document.getElementById('button').addEventListener("click", () => {
    //   XLSX.utils.json_to_sheet(data, 'out.xlsx');
    //   if(selectedFile){
    //     let fileReader = new FileReader();
    //     fileReader.readAsBinaryString(selectedFile);
    //     fileReader.onload = (event)=>{
    //       let data = event.target.result;
    //       let workbook = XLSX.read(data,{type:"binary"});
    //       console.log(workbook);
    //       workbook.SheetNames.forEach(sheet => {
    //         let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
    //         console.log(rowObject);
    //         document.getElementById("jsondata").innerHTML = JSON.stringify(rowObject,undefined,4)
    //       });
    //     }
    //   }
    // });
  }
};
</script>

<script setup>
import { reactive } from 'vue';

const state = reactive(
    {
      infoJson: null,
      selectedFile: null,
      data: [{
        "name":"jayanth",
        "data":"scd",
        "abc":"sdef"
      }]
    }
)
const emits = defineEmits(['changeObj', 'lol'])

const download = function (e) {
    state.selectedFile = e.target.files[0];
    console.log(state.selectedFile);
}
const convert = function () {
    XLSX.utils.json_to_sheet(state.data, 'out.xlsx');
    if(state.selectedFile){
      let fileReader = new FileReader();
      fileReader.readAsBinaryString(state.selectedFile);
      fileReader.onload = (e)=>{
        let data = e.target.result;
        let workbook = XLSX.read(data,{type:"binary"});
        workbook.SheetNames.forEach(sheet => {
          let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
          console.log(66);
          state.infoJson = rowObject
          emits('changeObj', rowObject)
        });
      }
    }
}
function lol() {
  console.log(3);
  emits('lol', 88)
}
</script>
