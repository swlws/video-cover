const { urlToRequest } = require('loader-utils')
const { validate } = require('schema-utils')
const markdownit = require('markdown-it')

const md = markdownit()

// 参数类型校验
const schema = {
    type: 'object',
    properties: {
        theme: {
            type: 'string',
        },
    },
};

const LOADER_NAME = 'mardkwon'

module.exports = function (source) {
    console.log(`\n\n call loader ${LOADER_NAME} \n\n`)

    const options = this.getOptions();

    validate(schema, options, {
        name: LOADER_NAME,
        baseDataPath: this.resourcePath
    });

    console.log('The request path', urlToRequest(this.resourcePath));

    // 对资源应用一些转换……

    console.log(`\n\n loader ${LOADER_NAME} end \n\n`)

    const result = md.render(source)
    return `export default ${JSON.stringify(result)}`;
}