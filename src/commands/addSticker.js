const fs = require('fs')

module.exports = function addSticker(msg, args) {
    var stickerName = args[0],
        stickerURL = args[1]
    fs.readFile('./src/stickers/stickerMap.json', (err, data) => {
        var stickermapjson = JSON.parse(data)
        console.log(stickermapjson)
        stickermapjson[stickerName] = stickerURL
        fs.writeFileSync('./src/stickers/stickerMap.json', JSON.stringify(stickermapjson))
    })
}