const Binance = require('node-binance-api');

const binance = new Binance().options({
    APIKEY: '5Irl4kor6iP6nNpVVBZJo7vH4wrBDjnhklarIEnKMH42g5DCIXaOWtvNBDY3hWzl',
    APISECRET: 'RVq2ppznwIAJ5BVrQQ66fZvjclKdVZkPPAi5fAaVkTkVjkiQKdsEb8Yv6373VlrX'
});

module.exports = binance