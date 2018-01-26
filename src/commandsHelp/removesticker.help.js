const path = require('path')
const fs = require('fs')
const jsonfile = require('jsonfile')
const stickerMap = jsonfile.readFileSync('./src/stickers/stickerMap.json')
const stickersList = Object.keys(stickerMap)

module.exports = async function removesticker(msg, args) {
    var stickerName = args[0]
    if(stickersList.includes(stickerName)) {
        if(!/^https?:\/\//.test(stickerMap[stickerName])) {
            var stickerFile = `./src/stickers/${stickerMap[stickerName]}`
            var successEmbed = {
                "title": "Sticker Deleted!",
                "description": `deleted sticker **${stickerName}**`,
                "color": 6815222,
                "timestamp": `${new Date().toISOString()}`,
                "footer": {
                "icon_url": `${msg.author.avatarURL}`,
                "text": `Sticker deleted by ${msg.author.username}`
                }
            }
            await msg.channel.send({embed: successEmbed})
            fs.readFile('./src/stickers/stickerMap.json', (err, data) => {
                var stickermapjson = JSON.parse(data)
                delete stickermapjson[stickerName]
                fs.unlinkSync(stickerFile)
                fs.writeFile('./src/stickers/stickerMap.json', JSON.stringify(stickermapjson), (err) => {
                    if(err) throw err;
                })
            })
        }
    } else {
        var invalidEmbed = {
            "title": "Sticker doesn't exist...",
            "description": `**${stickerName}** could not be deleted because it does not exist!`,
            "color": 6815222,
            "timestamp": `${new Date().toISOString()}`,
            "footer": {
            "icon_url": `${msg.author.avatarURL}`,
            "text": `invalid sticker delete by ${msg.author.username}`
            }
        }
        msg.channel.send({embed: invalidEmbed})
    }
}