<h2> Twitter starter project for Hackathon </h2>

Example web socket and Spring boot based application to access tweets and display on a simple web page.

application.properties contains consumerKey, consumerSecret, accessToken and accessTokenSecret generated based on a sample twitter account (@reimagin2016).
Ideally each team should setup a sample account and use the codes generated - as mentioned in - <a>https://dev.twitter.com/oauth/overview</a>

Logic for twitter access in com.hackathon.twitteraccess.TwitterController - reads handles to be followed from application.properties, and then uses twitter stream api to listen - pushes messages to a web page via Websocket.

Built on Spring-social container so teams can explore other social media channels as well.

# Disclaimer

Please do not edit or modify anything!