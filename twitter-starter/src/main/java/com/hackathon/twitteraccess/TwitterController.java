package com.hackathon.twitteraccess;

import java.util.List;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.twitter.hbc.twitter4j.handler.StatusStreamHandler;
import com.twitter.hbc.twitter4j.message.DisconnectMessage;
import com.twitter.hbc.twitter4j.message.StallWarningMessage;

import twitter4j.FilterQuery;
import twitter4j.StallWarning;
import twitter4j.Status;
import twitter4j.StatusDeletionNotice;
import twitter4j.StatusListener;
import twitter4j.Twitter;
import twitter4j.TwitterException;
import twitter4j.TwitterFactory;
import twitter4j.TwitterStream;
import twitter4j.TwitterStreamFactory;
import twitter4j.auth.AccessToken;

@Controller
@RequestMapping("/")
public class TwitterController {
	
	
	@Value("${app.twitter.consumerKey}")
	private String consumerKey;
	
	@Value("${app.twitter.consumerSecret}")
	private String consumerSecret;
	
	@Value("${app.twitter.accessToken}")
	private String accessToken;
	
	@Value("${app.twitter.accessTokenSecret}")
	private String accessTokenSecret;
	
	@Value("#{'${app.twitter.handleList}'.split(',')}") 
	private List<String> handleList;

	private final static Logger logger = LoggerFactory.getLogger(TwitterController.class);
	
	private final TwitterStream twitterStream = new TwitterStreamFactory().getInstance();
	
	private long [] userIdsToTrack;
	
	 @Autowired
	 private SimpMessagingTemplate template;

	@PostConstruct
	public void init(){
		Twitter twitter = TwitterFactory.getSingleton();
		twitter.setOAuthConsumer(consumerKey, consumerSecret);
		twitter.setOAuthAccessToken(new AccessToken(accessToken, accessTokenSecret));
		
	    userIdsToTrack = new long[handleList.size()];
		for(int i=0;i<handleList.size();i++)
		{
			try {
				String screenName = StringUtils.substringAfter(handleList.get(i), "@");
				logger.info("Fetching user ID for - "+screenName);
				userIdsToTrack[i] = twitter.showUser(screenName).getId();
			} catch (TwitterException e) {
				e.printStackTrace();
			}
		}
		
		twitterStream.setOAuthConsumer(consumerKey, consumerSecret);
		twitterStream.setOAuthAccessToken(new AccessToken(accessToken, accessTokenSecret));
		final StatusListener listener = new StatusStreamHandler() {

			@Override
			public void onStatus(Status status) {
			//	System.out.println(status.getText());
				template.convertAndSend("/topic/tweets", new Tweet(status.getUser().getScreenName()+" : "+status.getText()));
				
			}

			@Override
			public void onDeletionNotice(StatusDeletionNotice statusDeletionNotice) {
				// TODO Auto-generated method stub
				
			}

			@Override
			public void onTrackLimitationNotice(int numberOfLimitedStatuses) {
				// TODO Auto-generated method stub
				
			}

			@Override
			public void onScrubGeo(long userId, long upToStatusId) {
				// TODO Auto-generated method stub
				
			}

			@Override
			public void onStallWarning(StallWarning warning) {
				// TODO Auto-generated method stub
				
			}

			@Override
			public void onException(Exception ex) {
				// TODO Auto-generated method stub
				
			}

			@Override
			public void onDisconnectMessage(DisconnectMessage message) {
				// TODO Auto-generated method stub
				
			}

			@Override
			public void onStallWarningMessage(StallWarningMessage warning) {
				// TODO Auto-generated method stub
				
			}

			@Override
			public void onUnknownMessageType(String msg) {
				// TODO Auto-generated method stub
				
			}
			
		};
		
		twitterStream.addListener(listener);
		twitterStream.filter(new FilterQuery(0, userIdsToTrack, handleList.toArray(new String[handleList.size()])));
	}
   
    @RequestMapping(method=RequestMethod.GET)
    public String accessTwitter(Model model) {
      
        return "accesstweets";
    }

}
