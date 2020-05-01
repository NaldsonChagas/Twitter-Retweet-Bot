require('dotenv').config();

const config = require('./config');

const twit = require('twit');
const T = new twit(config);

setInterval(() => {
    searchTweets();
}, 60000);

let params = {
    q: '',
    lang: 'pt',
    result_type: 'recent',
    count: 1
};

function searchTweets() {
    T.get('search/tweets', params, (err, data) => {
        let tweets = data.statuses;
        if (!err) {
            for (const dat of tweets) {
                const retweetId = dat.id_str;
                const tweetText = dat.text;

                retweet(retweetId, tweetText);
            }
        }
    });
}

function retweet(retweetId, tweetText) {
    T.post('statuses/retweet/:id', { id: retweetId }, (err) => {
        if (err) console.log(err.message);
        else console.log(`RT success: ${tweetText}`);
    });
}
