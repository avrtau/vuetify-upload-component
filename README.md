# Vuetify Upload Component
This is a simple upload component for Vuetify.

### Props:
*`accept <String>`:* Limit accepted file-types. [default: "\*"] [More information...](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept)

*`multiple <Boolean>`:* Set to accept multiple files. [default: "false"]

*`label <String>`:* Header text. [default: "Attachments"]

### Usage examples:
#### Template:
##### Component with defaults:
```vue
<template>
  <vuetify-upload-component v-model="files"></vuetify-upload-component>
</template>
```
##### Allow multiple files:
```vue
<template>
  <vuetify-upload-component v-model="files" multiple></vuetify-upload-component>
</template>
```
##### Accept only image files:
```vue
<template>
  <vuetify-upload-component v-model="files" accept="image/*"></vuetify-upload-component>
</template>
```
#### Script:
```javascript
<script>
  import VuetifyUploadComponent from "Vuetify_upload_component";
  
  export default {
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
