const CoinService = require("../service/coinService");
const {Markup} = require("telegraf");

class CoinController {
    static async start(ctx) {
        ctx.reply("Hii, I am the BinanceCoin bot," +
            "I help you in the crypto world" + "\n" +
            "I will help you earn money......" + "\n" +
            "A lot of money💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰💰" + "\n" + "To get the price of " +
            "any token just send me the message" + "\n" + "👍👍👍👍👍👍👍👍Price <TOKEN>👍👍👍👍👍👍👍👍" + "\n" + "" +
            " For example to get the price of BTC: Price BTC💸💸💸💸💸" + "\n" + "If you want" +
            " to receive a letter when the price of the currency changes, write the amount " +
            "you specified <TOKEN> max min" + "\n" + "For example: BTC xxxxxx yyyyyy 💸💸💸💸💸💸💸💸💸💸", {

            ...Markup.inlineKeyboard([
                Markup.button.callback('🔸BTC Price', 'BTC'),
                Markup.button.callback('🔸LTC Price', 'LTC'),
                Markup.button.callback('🔸ETH Price', 'ETH'),
                Markup.button.callback('🔸XRP Price', 'XRP'),
                Markup.button.callback('🔸BNB Price', 'BNB'),
                Markup.button.callback('🔸SOL Price', 'SOL'),
                Markup.button.callback('🔸MATIC Price', 'MATIC'),
                Markup.button.callback('🔸SHIB Price', 'SHIB'),
            ], {
                columns: 3
            })
        })
    }

    static async getPriceButton(ctx) {
        let coin = ctx.update.callback_query.data;
        let coinForUrl = coin.toLowerCase();
        await CoinService.getPrice(coin, coinForUrl, ctx)

    }

    static async getPrice(ctx) {
        let query = ctx.message.text.trim()
        let coin = query.split(" ")[1];
        let coinForUrl = coin.toLowerCase();
        await CoinService.getPrice(coin, coinForUrl, ctx)
    }

    static async getMinMaxPrice(ctx) {

        let query = ctx.message.text.trim()
        let coin = query.split(" ")[0];
        let maxPrice = query.split(" ")[1];
        let minPrice = query.split(" ")[2] || 0;
        let coinForUrl = coin.toLowerCase();
        await CoinService.getMinMaxPrice(ctx, query, coin, maxPrice, minPrice, coinForUrl);
    }

    static async getSentiment(ctx){
        
        await CoinService.getSentiment(ctx);
    }
}

module.exports = CoinController