const config = require('./config');

const twit = require('twit');
const T = new twit(config);

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
                const retweetId = dat.id_str;

                T.post('statuses/retweet/:id', { id: retweetId }, (err, response) => {
                    if (err) {
                        console.log(err.message);
                    } else {
                        console.log(`Retuitou, macho vei`);
                    }
                });
            }
        }
    });
}

setInterval(() => {
    retweet();
}, 15000);

