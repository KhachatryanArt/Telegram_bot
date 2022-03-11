const {WebSocket} = require("ws");
const aposToLexForm = require("apos-to-lex-form");
const {WordTokenizer, SentimentAnalyzer, PorterStemmer} = require("natural");

const SpellCorrector = require("spelling-corrector");
const stopword = require("stopword");

const tokenizer = new WordTokenizer();
const spellCorrector = new SpellCorrector();
spellCorrector.loadDictionary();

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

    static async getPrice(coin, coinForUrl, ctx) {

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

    static async getSentiment(ctx) {
        const str = ctx.message.text.trim()
        const analyzer = new SentimentAnalyzer("English", PorterStemmer, "afinn");


        const lexed = aposToLexForm(str)
            .toLowerCase()
            .replace(/[^a-zA-Z\s]+/g, "");

        const tokenized = tokenizer.tokenize(lexed);

        const fixedSpelling = tokenized.map((word) => spellCorrector.correct(word));

        const stopWordsRemoved = stopword.removeStopwords(fixedSpelling);

        const analyzed = analyzer.getSentiment(stopWordsRemoved);

        if (analyzed >= 1) ctx.reply("🥰"); // positive
        if (analyzed === 0 || isNaN(analyzed)) ctx.reply("🤔");
        if (analyzed < 1 && analyzed !== 0 ) ctx.reply("🥵");

    }
}

module.exports = CoinService