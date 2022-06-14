package wpam.backend.surfer.twitter.controller;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QueryParameters {
    private String subject;
    private String start;
    private String end;
    private int maxResults;
}
