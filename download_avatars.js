var request = require('request');
var githubToken = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {

    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
            'User-Agent': 'request',
            'Authorization': 'token ' + githubToken.GITHUB_TOKEN
        }
    };

    request(options, function(err, res, body) {
        var parsedData = JSON.parse(body);
        parsedData.forEach(log)

        cb(err, parsedData);

        function log(element) {
            console.log("Avatar URL: ", element.avatar_url);
        }
        
    });

  }

getRepoContributors("jquery", "jquery", function(err, result) {
    //console.log("Errors:", err);
    //console.log("Result:", result);
});