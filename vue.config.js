module.exports = {
  devServer: {
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  lintOnSave: true,
  css: {
    loaderOptions: {
      sass: {
        prependData: `
            @import "@/styles/abstracts/_variables.scss";
          `,
      },
    },
  },
  transpileDependencies: ['vuetify'],
};
