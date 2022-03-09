const bot = require("../connections/telegraf-connection")
const CoinController = require("../controllers/coinController")



bot.start(CoinController.start)

bot.action(/(.*)/i,CoinController.getPriceButton)

bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))

bot.hears(/Price (.*)/i, CoinController.getPrice)
bot.hears(/(.*) (.+)/i, CoinController.getMinMaxPrice)


bot.launch()


process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

module.exports = bot
