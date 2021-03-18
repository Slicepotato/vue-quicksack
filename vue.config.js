module.exports = {
    css: {
        loaderOptions: {
            sass: {
                additionalData: '@import "@/assets/scss/main.scss";',
                implementation: require('node-sass')
            }
        }
    },

    transpileDependencies: [
      'vuetify'
    ]
}
