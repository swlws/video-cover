const PluginName = 'VcSign'

class VcSign {
    apply(complier) {
        complier.hooks.compilation.tap(PluginName, compilation => {
            // console.log('filePath', compilation.getAssets())
            compilation.hooks.succeedModule.tap(PluginName, module => {

            })
        })
    }
}

module.exports = VcSign