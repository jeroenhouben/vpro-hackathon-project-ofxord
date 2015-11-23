function processFace(imageData) {
  var params = {
      // Request parameters
      "analyzesFaceLandmarks": "true",
      "analyzesAge": "true",
      "analyzesGender": "true",
      "analyzesHeadPose": "true"
  };

  var url = "/oxford-api-proxy/face/v0/detections?" + $.param(params);

  $.ajax({
      url: url,
      type: "POST",
      contentType: "multipart/form-data",
      data: imageData,
      dataType: "json"
  })
  .done(function(data) {
      $("#face-api-response").text(JSON.stringify(data));
  })
  .fail(function() {
      alert("error requesting ", url);
  });
};

$(document).ready(function () {

  $('#upload').on("change", function (e) {
    var image = e.target.files[0]

    var fileReader = new FileReader();

    fileReader.onload = (function(file) {
      return function(e) {
        processFace(e.target.result);
      };
    })(image);

      // Read in the image file as a data URL.
    fileReader.readAsBinaryString(image);
  });
});
