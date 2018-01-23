const path = require('path')
const jsonfile = require('jsonfile')
const stickerMap = jsonfile.readFileSync('./src/stickers/stickerMap.json')
const stickersList = Object.keys(stickerMap)

module.exports = function sticker(msg) {
    var stickerName = msg.content.split('/')[1]
    if(stickersList.includes(stickerName)) {
        var stickerFile = stickerMap[stickerName]
        if(/^https?:\/\//.test(stickerFile)) {
            if(!/\.(png|jpe?g|gif)$/.test(stickerFile)) {
                stickerFile = stickerFile+'.jpg'
            }
        } else {
            stickerFile = `${__dirname}/../stickers/${stickerFile}`
        }
        console.log(`sending ${stickerFile}...`)
        msg.channel.send('', {
            files: [stickerFile]
        })
    }
}