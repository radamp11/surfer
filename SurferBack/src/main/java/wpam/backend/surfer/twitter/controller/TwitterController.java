package wpam.backend.surfer.twitter.controller;

import io.github.redouane59.twitter.TwitterClient;

import io.github.redouane59.twitter.dto.endpoints.AdditionalParameters;
import io.github.redouane59.twitter.dto.tweet.Tweet;
import io.github.redouane59.twitter.dto.tweet.TweetList;
import io.github.redouane59.twitter.signature.TwitterCredentials;
import lombok.extern.java.Log;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import wpam.backend.surfer.twitter.config.TwitterConfig;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


@RestController
@RequestMapping(TwitterController.TWITTER_BASE_URI)
@Log
public class TwitterController {
    public static final String TWITTER_BASE_URI = "/tweets";
    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

    private final TwitterClient twitterClient = new TwitterClient(TwitterCredentials.builder()
            .apiKey(TwitterConfig.API_KEY)
            .apiSecretKey(TwitterConfig.API_KEY_SECRET)
            .accessToken(TwitterConfig.ACCESS_TOKEN)
            .accessTokenSecret(TwitterConfig.ACCESS_TOKEN_SECRET)
            .bearerToken(TwitterConfig.BEARER_TOKEN)
            .build());

    @RequestMapping(value = "/getposts", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TweetList> getTweets(@RequestBody final QueryParameters query) {

        AdditionalParameters additionalParameters = AdditionalParameters.builder()
                .startTime(LocalDateTime.parse(query.getStart(), formatter))
                .endTime(LocalDateTime.parse(query.getEnd(), formatter))
                .recursiveCall(false)
                .maxResults(query.getMaxResults())
                .build();

        TweetList tweetList = twitterClient.searchTweets(query.getSubject(), additionalParameters);
        return ResponseEntity.ok(tweetList);
    }

}
