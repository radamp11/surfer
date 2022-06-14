package wpam.backend.surfer;

import io.github.redouane59.twitter.TwitterClient;
import io.github.redouane59.twitter.dto.endpoints.AdditionalParameters;
import io.github.redouane59.twitter.dto.list.TwitterList;
import io.github.redouane59.twitter.dto.tweet.Tweet;
import io.github.redouane59.twitter.dto.tweet.TweetList;
import io.github.redouane59.twitter.signature.TwitterCredentials;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import wpam.backend.surfer.twitter.config.TwitterConfig;

import java.time.LocalDateTime;

@SpringBootApplication
public class SurferApplication {

    public static void main(String[] args) {
        SpringApplication.run(SurferApplication.class, args);
        System.out.println(LocalDateTime.now());
    }

}
