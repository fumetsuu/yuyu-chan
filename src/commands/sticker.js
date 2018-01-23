const path = require('path')
const jsonfile = require('jsonfile')
const stickerMap = jsonfile.readFileSync('./src/stickers/stickerMap.json')
const stickersList = Object.keys(stickerMap)

module.exports = async function sticker(msg) {
    var stickerName = msg.content.split('/')[1]
    if(stickersList.includes(stickerName)) {
        stickerFile = stickerMap[stickerName]
        console.log(`sending ${stickerFile}...`)
        await msg.channel.send('', {
            files: [`${__dirname}/../stickers/${stickerFile}`]
        })
    }

}