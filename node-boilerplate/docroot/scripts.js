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
            decorateFaceApiUpload(JSON.parse(xhr.responseText));
        }
    };
    fd.append('image', image);
    xhr.send(fd);
}

function decorateFaceApiUpload(faces) {
    var $imgPreview = $("#face-api-upload-preview");
    var sizeRatio = $imgPreview[0].width / $imgPreview[0].naturalWidth;

    var face;
    var $overlay;

    for (var i = 0; i < faces.length; i++) {
        face = faces[i];

        $overlay = $('<div class="overlay" />').text(face.attributes.age + " " + face.attributes.gender);
        $overlay.css({
            top: face.faceRectangle.top * sizeRatio,
            left: face.faceRectangle.left * sizeRatio
        })
        $overlay.appendTo($imgPreview.parent());
    }

    $("#face-api-response").text(JSON.stringify(faces));
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
