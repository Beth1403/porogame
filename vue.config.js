const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
     
      customVariables: ['~/src/styles/variables.scss'],
      treeShake: true
    }
  }
})
