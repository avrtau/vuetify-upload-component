<template>
  <div class="cust_uploader">
    <input
      type="file"
      ref="fileInput"
      :accept="accept"
      :multiple="multiple"
      @change="onFileChange"
    >

    <v-layout row>
      <v-flex>
        <v-card>
          <v-toolbar color="white">
            <v-btn right absolute fab @click="activateFilePrompt" color="primary" small>
              <v-icon>add</v-icon>
            </v-btn>
            <v-toolbar-title>
              <v-icon>attach_file</v-icon> {{ label }}
            </v-toolbar-title>
          </v-toolbar>
          <v-list>
            <v-list-tile v-for="(item, index) in files" :key="item.name" @click="">
              <v-list-tile-action>
                <v-icon>insert_drive_file</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-text="item.name"></v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action @click="deleteAttachment(index)">
                <v-icon>delete_forever</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  export default {
    props: {
      accept: {
        type: String,
        default: '*'
      },
      label: {
        type: String,
        default: 'Attachments'
      },
      multiple: {
        type: Boolean,
        default: false
      }
    },

    data () {
      return {
        files: [],
        defaultAttachment: {
          action: this.deleteAtachment,
          title: '',
          icon_pre: "insert_drive_file",
          icon_post: "delete_forever"
        }
      }
    },

    methods: {
      activateFilePrompt () {
        this.$refs.fileInput.click();
      },

      onFileChange (event) {
        // https://stackoverflow.com/questions/3144419/how-do-i-remove-a-file-from-the-filelist
        // FileList --> Array
        let inputFiles = [];
        Array.prototype.push.apply(inputFiles, this.$refs.fileInput.files);

        if (inputFiles.length > 0) {
          inputFiles = inputFiles
            .filter(inputFile => {
              const isDuplicate = this.files.find(file => file.name === inputFile.name) !== undefined;
              return !isDuplicate;
            });

          if (this.multiple) {
            inputFiles.forEach(inputFile => { this.files.push(inputFile) });
          }
          else {
            this.files = [];
            this.files.push(inputFiles[0]);
          }
        }

        this.$emit('input', this.files);
      },

      deleteAttachment (itemIndex) {
        this.files.splice(itemIndex, 1);
        this.$refs.fileInput.value = null;
        this.$emit('input', this.files);
      }
    }
  }
</script>

<style scoped>
  input[type=file] {
    position: absolute;
    left: -99999px;
  }
</style>