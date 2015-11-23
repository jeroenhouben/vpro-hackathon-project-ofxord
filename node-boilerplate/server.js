var http = require('http');
var https = require('https');
var static = require('node-static');
var fileServer = new static.Server('./docroot');
var fs = require('fs');

var API_KEYS = {
  VISION: "72651b4b33a84a2f9676e94511f2de94",
  EMOTION: "68767175f50d4b29b358ac39c901fe84",
  FACE: "e3fc0b290d994b788e78faddfc633dce"
}

var server = http.createServer(function(request, response) {
  if (request.url.indexOf('/oxford-api-proxy') === 0) {

    var localFile = "./DSC_1609.JPG";
    var localFile = "./pechtold.png";

    fs.readFile(localFile, function(err, data) {
      if (err) {
          console.log("read jpg fail " + err);
      } else {
        var apiRequestOptions = {
          host: 'api.projectoxford.ai',
          method: 'POST',
          data: data,
          path: request.url.replace('/oxford-api-proxy', ''),
          headers: {
            'Content-Type': 'application/octet-stream',
            'Content-Length': data.length,
            'Ocp-Apim-Subscription-Key': API_KEYS.FACE
          }
        };

        response.writeHead(200, { 'Content-Type': 'application/json' });

        var apiRequest = https.request(apiRequestOptions, function(apiResponse) {
          var apiResponseText;

          apiResponse.on('data', function(rdata) {
            response.write(rdata);
          });

          apiResponse.on('end', function() {
            response.end();
          });

        });

        apiRequest.write(data);
        apiRequest.end();
      }
    });

  } else {
    fileServer.serve(request, response);
  }

});

console.log("listening on port 5050")
server.listen(5050);
