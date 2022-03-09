const {WebSocket} = require("ws");

class CoinService {

    static async getMinMaxPrice(ctx, query, coin, maxPrice, minPrice, coinForUrl) {

        const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${coinForUrl}usdt@trade`);
        let count = 0

        try {
            ws.on('message', await function message(data) {

                let price = +JSON.parse(data).p

                if ((price > maxPrice || price < minPrice) && count === 0) {
                    ws.terminate();
                    ctx.reply(`🔹${coin}::${price} 💲`)
                    count++
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    static async getPrice( coin, coinForUrl, ctx) {

        const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${coinForUrl}usdt@trade`);
        let count = 0
        ws.on('message', await function message(data) {
            let price = +JSON.parse(data).p
            if (count === 0) {
                ws.terminate();
                ctx.reply(`🔹${coin}::${price} 💲`)
                count++
            }
        })
    }
}

module.exports = CoinService