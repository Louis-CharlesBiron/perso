function random(min, max) {
    return Math.floor(Math.random()*(max-min+1))+min
}

function hexToRgb(hex) {
    return hex.match(/[a-f0-9]{2}/gi)?.map(x=>parseInt(x, 16))
}

const hex = [0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f"]
function get_random_color(format) {
    return (format == "rgb") ? "rgb("+random(0,255)+" "+random(0,255)+" "+random(0,255)+")" : "#"+new Array(6).fill().map(x=>hex[random(0,15)]).join("")
}

//let a = 0
////https://stackoverflow.com/questions/18726430/canvas-get-position-of-colour-if-available
//function getPositionFromColor(ctx, color) {
//
//    let w = ctx.canvas.width,
//        h = ctx.canvas.height,
//        data = ctx.getImageData(0, 0, w, h), /// get image data
//        buffer = data.data,                  /// and its pixel buffer
//        len = buffer.length,                 /// cache length
//        x, y = 0, p, px;                     /// for iterating
//        console.log(data)
//        console.log(buffer)
//        console.log(len)
//
//    /// iterating x/y instead of forward to get position the easy way
//    for (;y < h; y++) {
//        
//        /// common value for all x
//        p = y * 4 * w;
//
//        for(x = 0; x < w; x++) {
//
//            /// next pixel (skipping 4 bytes as each pixel is RGBA bytes)
//            px = p + x * 4;
//
//            /// if red component match check the others
//            if (buffer[px] === color[0]) {
//                if (buffer[px + 1] === color[1] && buffer[px + 2] === color[2]) {
//
//                    return [x, y];
//                }
//            }
//        }
//    }
//    return null;
//}

//https://dirask.com/posts/JavaScript-play-web-camera-video-on-canvas-element-webcam-usage-example-1xJEWp
function playStream(canvas, stream) {
    var video = document.createElement('video');
    video.addEventListener('loadedmetadata', function() {
        const context = canvas.getContext('2d');
        var drawFrame = function() {
            context.drawImage(video, 0, 0);
            window.requestAnimationFrame(drawFrame);
        };
        drawFrame();
    });
    video.autoplay = true;
    video.srcObject = stream;
}

function playCamera(canvas, preferedWidth, preferedHeight) {
    var devices = navigator.mediaDevices;
    if (devices && 'getUserMedia' in devices) {
        var constraints = {
            video: {
                width: preferedWidth,
                height: preferedHeight
            }
            // you can use microphone adding `audio: true` property here
        };
        var promise = devices.getUserMedia(constraints);
        promise
            .then(function(stream) {
                playStream(canvas, stream);
            })
            .catch(function(error) {
                console.error(error.name + ': ' + error.message);
            });
    } else {
        console.error('Camera API is not supported.');
    }
}


// Usage example:

//var canvas = document.querySelector('#my-canvas');
//playCamera(canvas, canvas.width, canvas.height);
