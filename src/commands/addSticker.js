const fs = require('fs')
const request = require('request')
const path = require('path')

module.exports = function addsticker(msg, args) {
    var stickerName = args[0],
        stickerURL = args[1]

    request.get(stickerURL, (err, response, content) => {
        if(err) {
            console.log("something went wrong with the addsticker command, sending error embed...")
            var errorEmbed = {
                "title": "Couldn't add sticker",
                "description": "yuyu chan couldn't add the sticker for some reason... \n make sure that the image is a valid url and that the addsticker command is in the form: ```y/addsticker stickername imageurl```",
                "color": 6815222,
                "timestamp": "2018-01-23T22:31:44.056Z",
                "footer": {
                  "icon_url": `${msg.author.avatarURL}`,
                  "text": `addsticker failed by ${msg.author.username}`
                },
                "thumbnail": {
                  "url": "http://i.imgur.com/FpKId7M.png"
                }
              }
            msg.channel.send({embed: errorEmbed})
        }
     }).on('response', (res) => {
        if(/\.(gif)$/.test(stickerURL)) {
            var newStickerFile = fs.createWriteStream(`./src/stickers/${stickerName}.gif`)
        } else {
            var newStickerFile = fs.createWriteStream(`./src/stickers/${stickerName}.jpg`)
        }
        res.pipe(newStickerFile)
        newStickerFile.on('finish', () => {
            fs.readFile('./src/stickers/stickerMap.json', (err, data) => {
                var stickermapjson = JSON.parse(data)
                console.log(stickermapjson)
                stickermapjson[stickerName] = `${stickerName}.jpg`
                var successEmbed = {
                    "title": "New Sticker Added!",
                    "description": `added sticker **${stickerName}**, it should now be available with **s/${stickerName}**`,
                    "color": 6815222,
                    "timestamp": `${new Date().toISOString()}`,
                    "footer": {
                    "icon_url": `${msg.author.avatarURL}`,
                    "text": `Sticker added by ${msg.author.username}`
                    },
                    "thumbnail": {
                    "url": `${stickerURL}`
                    }
                }
                msg.channel.send({embed: successEmbed})
                fs.writeFile('./src/stickers/stickerMap.json', JSON.stringify(stickermapjson), (err) => {
                    if(err) throw err;
                })
            })
        })
     })
}