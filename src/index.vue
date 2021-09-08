<template>
  <div class="vuetify-upload-component">
    <input
      ref="fileInput"
      type="file"
      :accept="accept"
      :multiple="multiple"
      @change="onFileChange"
    >

    <v-container>
      <v-row>
        <v-col>
          <v-card>
            <v-toolbar color="white">
              <v-btn
                right
                absolute
                fab
                color="primary"
                small
                @click="activateFilePrompt"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <v-toolbar-title>
                <v-icon>mdi-paperclip</v-icon> {{ label }}
              </v-toolbar-title>
            </v-toolbar>
            <v-list v-if="files.length > 0">
              <v-list-item
                v-for="(item, index) in files"
                :key="index"
              >
                <v-list-item-icon>
                  <v-icon>mdi-file-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  {{ item.name }}
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon small @click="deleteAttachment(index)">
                    <v-icon>
                      mdi-delete-forever
                    </v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
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

  data: () => ({
    files: [],
    defaultAttachment: {
      title: '',
      icon_pre: "insert_drive_file",
      icon_post: "delete_forever"
    }
  }),

  created () {
    this.$set(this.defaultAttachment, "action", this.deleteAtachment);
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
          .filter((inputFile) => {
            const isDuplicate = this.files.find(file => file.name === inputFile.name) !== undefined;
            return !isDuplicate;
          });

        if (this.multiple) {
          inputFiles.forEach((inputFile) => { this.files.push(inputFile); });
        } else {
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
};
</script>

<style scoped>
  input[type=file] {
    position: absolute;
    left: -99999px;
  }
</style>
