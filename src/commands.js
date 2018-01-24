const sticker = require('./commands/sticker.js')
const addsticker = require('./commands/addsticker.js')
const removesticker = require('./commands/removesticker.js')

const commands = {
    "sticker": sticker,
    "addsticker": addsticker,
    "removesticker": removesticker
}

module.exports = commands