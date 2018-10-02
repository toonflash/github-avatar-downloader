var request = require('request');
var fs = require('fs');
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
            var avatarPath = element.avatar_url;
            var avatarFile = element.id;
            
            downloadImageByURL(avatarPath, "./avatars/"+ avatarFile + ".jpg")
        }
    });
}

function downloadImageByURL(url, filePath) {

    request.get(url)

        .on('error', function (err) {
            throw err;
        })

        // letting me know that everything is ok by giving me 200's
        .on('response', function (response) { 
            console.log('Response Status Code: ', response.statusCode);
        })

       .pipe(fs.createWriteStream(filePath));

}

getRepoContributors("jquery", "jquery", function(err, result) {
    // console.log("Errors:", err);
    // console.log("Result:", result);
});