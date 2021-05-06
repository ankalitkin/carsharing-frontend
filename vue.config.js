module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],
    "devServer": {
        "port": 4200,
        "proxy": {
            "/api": {
                "target": "http://localhost:8080",
                "changeOrigin": true,
                "pathRewrite": {
                    "^/api": ""
                },
                "logLevel": "debug"
            }
        }
    },
    chainWebpack: config => {
        config.module
            .rule("i18n")
            .resourceQuery(/blockType=i18n/)
            .type('javascript/auto')
            .use("i18n")
            .loader("@intlify/vue-i18n-loader")
            .end()
            .use('yaml')
            .loader('yaml-loader')
            .end()
    }
};
