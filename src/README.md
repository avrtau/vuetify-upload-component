![](https://img.shields.io/npm/v/vuetify-upload-component.svg)
![](https://img.shields.io/github/size/avrtau/vuetify_upload_component/src/Vuetify_upload_component.vue.svg)
# Vuetify Upload Component
This is a simple upload component for [Vuetify](https://vuetifyjs.com/en/).

### Install:
```
npm i vuetify-upload-component -s
```

### Props:
*`accept <String>`:* Limit accepted file-types. [default: "\*"] [More information...](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept)

*`multiple <Boolean>`:* Set to accept multiple files. [default: "false"]

*`label <String>`:* Header text. [default: "Attachments"]

### Usage examples:
#### Template:
##### Component with defaults:
```html
<template>
  <v-upload v-model="files"></v-upload>
</template>
```
##### Allow multiple files:
```html
<template>
  <v-upload v-model="files" multiple></v-upload>
</template>
```
##### Accept only image files:
```html
<template>
  <v-upload v-model="files" accept="image/*"></v-upload>
</template>
```
#### Script:
```javascript
<script>
  import VUpload from "vuetify-upload-component";
  
  export default {
    components: { VUpload },

    data: () => ({
      files: [] // An array of files received from the vuetify_upload_component
    }),
    
    methods: {
      doSomethingWithFiles: () => {
        if (this.files) {
          this.files.forEach(file => {
            const reader = new FileReader();
        
            reader.onload = () => {
              /*
               * Do something with the file
               */
            }

            reader.readAsBinaryString(file);
          }
        }
      }
    }
  }
</script>
```

## Useful links:
[FileReader API Example](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications#Handling_the_upload_process_for_a_file)
