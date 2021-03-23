module.exports = {
    outputDir: "dist",
    indexPath: "index.html",
    filenameHashing: true,
    pages: undefined,
    lintOnSave: true,
    runtimeCompiler: false,
    transpileDependencies: [],
    productionSourceMap: false,
    configureWebpack: config => {
        if (process.env.NODE_ENV === "production") {} else {}
    },
    chainWebpack: config => {},
    devServer: {
        host: "0.0.0.0",
        port: 8082,
        disableHostCheck: true,
        https: false,
        open: true,
        hotOnly: false,
        proxy: null,
        before: app => {},

    },
    pwa: {},
    pluginOptions: {},
};