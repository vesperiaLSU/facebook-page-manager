(function() {
    module.exports = {
        facebookAuth: {
            clientID: '1446253795418031',
            clientSecret: '1e4ff780b141ee71ab23142a858794a9',
            callBackUrl: 'https://facebookpm.herokuapp.com/auth/facebook/callback'
        },
        facebookAPI: {
            getPageAccessToken: 'https://graph.facebook.com/v2.9/1474589055913389?fields=access_token',
            postFeed: 'https://graph.facebook.com/v2.9/1474589055913389/feed',
            getAllFeeds: 'https://graph.facebook.com/v2.9/1474589055913389/promotable_posts'
        }
    };
}());
