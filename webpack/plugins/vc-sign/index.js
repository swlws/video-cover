const PluginName = 'VcSign'

class VcSign {
    apply(complier) {
        console.log(Object.keys(complier.hooks))
        complier.hooks.compilation.tap(PluginName, compilation => {
            console.log(Object.keys(compilation.hooks))
        })


    }
}

module.exports = VcSign