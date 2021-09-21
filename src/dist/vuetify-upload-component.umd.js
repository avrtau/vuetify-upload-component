(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.VuetifyUploadComponent = {}));
}(this, (function (exports) { 'use strict';

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script = {
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

    data: function () { return ({
      files: [],
      defaultAttachment: {
        title: '',
        icon_pre: "insert_drive_file",
        icon_post: "delete_forever"
      }
    }); },

    created: function created () {
      this.$set(this.defaultAttachment, "action", this.deleteAtachment);
    },

    methods: {
      activateFilePrompt: function activateFilePrompt () {
        this.$refs.fileInput.click();
      },

      onFileChange: function onFileChange (event) {
        var this$1 = this;

        // https://stackoverflow.com/questions/3144419/how-do-i-remove-a-file-from-the-filelist
        // FileList --> Array
        var inputFiles = [];
        Array.prototype.push.apply(inputFiles, this.$refs.fileInput.files);

        if (inputFiles.length > 0) {
          inputFiles = inputFiles
            .filter(function (inputFile) {
              var isDuplicate = this$1.files.find(function (file) { return file.name === inputFile.name; }) !== undefined;
              return !isDuplicate;
            });

          if (this.multiple) {
            inputFiles.forEach(function (inputFile) { this$1.files.push(inputFile); });
          } else {
            this.files = [];
            this.files.push(inputFiles[0]);
          }
        }

        this.$emit('input', this.files);
      },

      deleteAttachment: function deleteAttachment (itemIndex) {
        this.files.splice(itemIndex, 1);
        this.$refs.fileInput.value = null;
        this.$emit('input', this.files);
      }
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      var options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      var hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              var originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              var existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  var isOldIE = typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
      return function (id, style) { return addStyle(id, style); };
  }
  var HEAD;
  var styles = {};
  function addStyle(id, css) {
      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
      if (!style.ids.has(id)) {
          style.ids.add(id);
          var code = css.source;
          if (css.map) {
              // https://developer.chrome.com/devtools/docs/javascript-debugging
              // this makes source maps inside style tags work properly in Chrome
              code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
              // http://stackoverflow.com/a/26603875
              code +=
                  '\n/*# sourceMappingURL=data:application/json;base64,' +
                      btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                      ' */';
          }
          if (!style.element) {
              style.element = document.createElement('style');
              style.element.type = 'text/css';
              if (css.media)
                  { style.element.setAttribute('media', css.media); }
              if (HEAD === undefined) {
                  HEAD = document.head || document.getElementsByTagName('head')[0];
              }
              HEAD.appendChild(style.element);
          }
          if ('styleSheet' in style.element) {
              style.styles.push(code);
              style.element.styleSheet.cssText = style.styles
                  .filter(Boolean)
                  .join('\n');
          }
          else {
              var index = style.ids.size - 1;
              var textNode = document.createTextNode(code);
              var nodes = style.element.childNodes;
              if (nodes[index])
                  { style.element.removeChild(nodes[index]); }
              if (nodes.length)
                  { style.element.insertBefore(textNode, nodes[index]); }
              else
                  { style.element.appendChild(textNode); }
          }
      }
  }

  /* script */
  var __vue_script__ = script;

  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { staticClass: "vuetify-upload-component" },
      [
        _c("input", {
          ref: "fileInput",
          attrs: { type: "file", accept: _vm.accept, multiple: _vm.multiple },
          on: { change: _vm.onFileChange }
        }),
        _vm._v(" "),
        _c(
          "v-container",
          [
            _c(
              "v-row",
              [
                _c(
                  "v-col",
                  [
                    _c(
                      "v-card",
                      [
                        _c(
                          "v-toolbar",
                          { attrs: { color: "white" } },
                          [
                            _c(
                              "v-btn",
                              {
                                attrs: {
                                  right: "",
                                  absolute: "",
                                  fab: "",
                                  color: "primary",
                                  small: ""
                                },
                                on: { click: _vm.activateFilePrompt }
                              },
                              [_c("v-icon", [_vm._v("mdi-plus")])],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-toolbar-title",
                              [
                                _c("v-icon", [_vm._v("mdi-paperclip")]),
                                _vm._v(" " + _vm._s(_vm.label) + "\n            ")
                              ],
                              1
                            )
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _vm.files.length > 0
                          ? _c(
                              "v-list",
                              _vm._l(_vm.files, function(item, index) {
                                return _c(
                                  "v-list-item",
                                  { key: index },
                                  [
                                    _c(
                                      "v-list-item-icon",
                                      [
                                        _c("v-icon", [_vm._v("mdi-file-outline")])
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c("v-list-item-content", [
                                      _vm._v(
                                        "\n                " +
                                          _vm._s(item.name) +
                                          "\n              "
                                      )
                                    ]),
                                    _vm._v(" "),
                                    _c(
                                      "v-list-item-action",
                                      [
                                        _c(
                                          "v-btn",
                                          {
                                            attrs: { icon: "", small: "" },
                                            on: {
                                              click: function($event) {
                                                return _vm.deleteAttachment(index)
                                              }
                                            }
                                          },
                                          [
                                            _c("v-icon", [
                                              _vm._v(
                                                "\n                    mdi-delete-forever\n                  "
                                              )
                                            ])
                                          ],
                                          1
                                        )
                                      ],
                                      1
                                    )
                                  ],
                                  1
                                )
                              }),
                              1
                            )
                          : _vm._e()
                      ],
                      1
                    )
                  ],
                  1
                )
              ],
              1
            )
          ],
          1
        )
      ],
      1
    )
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    var __vue_inject_styles__ = function (inject) {
      if (!inject) { return }
      inject("data-v-0c4efe93_0", { source: "\ninput[type=file][data-v-0c4efe93] {\n  position: absolute;\n  left: -99999px;\n}\n", map: {"version":3,"sources":["/Users/avraham/Projects/Node/vuetify_upload_component/src/index.vue"],"names":[],"mappings":";AA6HA;EACA,kBAAA;EACA,cAAA;AACA","file":"index.vue","sourcesContent":["<template>\n  <div class=\"vuetify-upload-component\">\n    <input\n      ref=\"fileInput\"\n      type=\"file\"\n      :accept=\"accept\"\n      :multiple=\"multiple\"\n      @change=\"onFileChange\"\n    >\n\n    <v-container>\n      <v-row>\n        <v-col>\n          <v-card>\n            <v-toolbar color=\"white\">\n              <v-btn\n                right\n                absolute\n                fab\n                color=\"primary\"\n                small\n                @click=\"activateFilePrompt\"\n              >\n                <v-icon>mdi-plus</v-icon>\n              </v-btn>\n              <v-toolbar-title>\n                <v-icon>mdi-paperclip</v-icon> {{ label }}\n              </v-toolbar-title>\n            </v-toolbar>\n            <v-list v-if=\"files.length > 0\">\n              <v-list-item\n                v-for=\"(item, index) in files\"\n                :key=\"index\"\n              >\n                <v-list-item-icon>\n                  <v-icon>mdi-file-outline</v-icon>\n                </v-list-item-icon>\n                <v-list-item-content>\n                  {{ item.name }}\n                </v-list-item-content>\n                <v-list-item-action>\n                  <v-btn icon small @click=\"deleteAttachment(index)\">\n                    <v-icon>\n                      mdi-delete-forever\n                    </v-icon>\n                  </v-btn>\n                </v-list-item-action>\n              </v-list-item>\n            </v-list>\n          </v-card>\n        </v-col>\n      </v-row>\n    </v-container>\n  </div>\n</template>\n\n<script>\nexport default {\n  props: {\n    accept: {\n      type: String,\n      default: '*'\n    },\n    label: {\n      type: String,\n      default: 'Attachments'\n    },\n    multiple: {\n      type: Boolean,\n      default: false\n    }\n  },\n\n  data: () => ({\n    files: [],\n    defaultAttachment: {\n      title: '',\n      icon_pre: \"insert_drive_file\",\n      icon_post: \"delete_forever\"\n    }\n  }),\n\n  created () {\n    this.$set(this.defaultAttachment, \"action\", this.deleteAtachment);\n  },\n\n  methods: {\n    activateFilePrompt () {\n      this.$refs.fileInput.click();\n    },\n\n    onFileChange (event) {\n      // https://stackoverflow.com/questions/3144419/how-do-i-remove-a-file-from-the-filelist\n      // FileList --> Array\n      let inputFiles = [];\n      Array.prototype.push.apply(inputFiles, this.$refs.fileInput.files);\n\n      if (inputFiles.length > 0) {\n        inputFiles = inputFiles\n          .filter((inputFile) => {\n            const isDuplicate = this.files.find(file => file.name === inputFile.name) !== undefined;\n            return !isDuplicate;\n          });\n\n        if (this.multiple) {\n          inputFiles.forEach((inputFile) => { this.files.push(inputFile); });\n        } else {\n          this.files = [];\n          this.files.push(inputFiles[0]);\n        }\n      }\n\n      this.$emit('input', this.files);\n    },\n\n    deleteAttachment (itemIndex) {\n      this.files.splice(itemIndex, 1);\n      this.$refs.fileInput.value = null;\n      this.$emit('input', this.files);\n    }\n  }\n};\n</script>\n\n<style scoped>\n  input[type=file] {\n    position: absolute;\n    left: -99999px;\n  }\n</style>\n"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__ = "data-v-0c4efe93";
    /* module identifier */
    var __vue_module_identifier__ = undefined;
    /* functional template */
    var __vue_is_functional_template__ = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__ = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      createInjector,
      undefined,
      undefined
    );

  // Import vue component

  // Declare install function executed by Vue.use()
  function install(Vue) {
  	if (install.installed) { return; }
  	install.installed = true;
  	Vue.component('VuetifyUploadComponent', __vue_component__);
  }

  // Create module definition for Vue.use()
  var plugin = {
  	install: install,
  };

  // Auto-install when vue is found (eg. in browser via <script> tag)
  var GlobalVue = null;
  if (typeof window !== 'undefined') {
  	GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
  	GlobalVue = global.Vue;
  }
  if (GlobalVue) {
  	GlobalVue.use(plugin);
  }

  exports.default = __vue_component__;
  exports.install = install;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
