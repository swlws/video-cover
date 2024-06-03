export default function (source: string){
    return `export default ${JSON.stringify(source)}`
}