function uploadToFaceAPI(image) {
    var params = {
        // Request parameters
        "analyzesFaceLandmarks": "true",
        "analyzesAge": "true",
        "analyzesGender": "true",
        "analyzesHeadPose": "true"
    };

    var url = "/oxford-api-proxy/face/v0/detections?" + $.param(params);
    var xhr = new XMLHttpRequest();
    var fd = new FormData();

    xhr.open("POST", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            $("#face-api-response").text(xhr.responseText);
        }
    };
    fd.append('image', image);
    xhr.send(fd);
}

$(document).ready(function () {


    $('#face-api-upload').on("change", function (e) {
        var image = e.target.files[0];
        uploadToFaceAPI(image);

        var fileReader = new FileReader();

        fileReader.onload = (function(file) {
            return function(e) {
                document.getElementById("face-api-upload-preview").src = e.target.result;
            };
        })(image);

        // Read in the image file as a data URL.
        fileReader.readAsDataURL(image);
    });
});
