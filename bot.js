const config = require('./config');

const twit = require('twit');
const T = new twit(config);

const cities = {
    fortaleza: ['-3.71839', '-38.5434', '1km'],
    caucaia: ['-3.7203049', '-38.6663911'],
    maracanau: ['-3.87821', '-38.626']
}

function retweet() {
    let params = {
        q: 'kanal',
        lang: 'pt',
        result_type: 'recent',
        count: 1
    };
    T.get('search/tweets', params, (err, data, response) => {
        let tweets = data.statuses;
        if (!err) {
            for (const dat of tweets) {
                console.log(dat);
                const retweetId = dat.id_str;

                T.post('statuses/retweet/:id', { id: retweetId }, (err, response) => {
                    if (response) {
                        console.log(`Retuitou, macho vei ${response}`);
                    }

                    if (err) {
                        console.log(`Deu ruim`);
                        console.log(err);
                    }
                });
            }
        }
    });
}

setInterval(() => {
    retweet();
}, 15000);

