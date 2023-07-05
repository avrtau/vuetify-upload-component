[![](https://img.shields.io/npm/v/vuetify-upload-component.svg)](https://www.npmjs.com/package/vuetify-upload-component)
[![](https://img.shields.io/github/languages/code-size/avrtau/vuetify-upload-component)](https://www.npmjs.com/package/vuetify-upload-component)
[![](https://img.shields.io/github/license/avrtau/vuetify_upload_component)](https://github.com/avrtau/vuetify_upload_component/blob/master/LICENSE)
# Vuetify Upload Component
This is a simple upload component for [Vuetify](https://vuetifyjs.com/en/).

## Installation:
### In the `<script>` tag:
```html
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/vuetify-upload-component"></script>
...
  <v-upload ...>
...
```

### Or as a project dependency:
```
npm i vuetify-upload-component -s
```

## Props:
Name \<Type\> | Description | Defaults | Notes
--- | --- | --- | --- 
`accept <String>` | Limit accepted file-types. | "\*" | [More information...](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept)
`multiple <Boolean>` | Set to accept multiple files. | `false` | 
`label <String>` | Header text. | "Attachments"

## Usage examples:
### Template:
#### Component with defaults:
```html
<v-upload v-model="files"></v-upload>
```
#### Allow multiple files:
```html
<v-upload v-model="files" multiple></v-upload>
```
#### Accept only image files:
```html
<v-upload v-model="files" accept="image/*"></v-upload>
```
### Script:
```html
<script>
  import VUpload from "vuetify-upload-component"; // SSR and webpack
  
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
