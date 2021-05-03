var probe = require('probe-image-size');
var sizeOf = require('image-size');

// size items based on image
// use probe to get dimension and set width and height
module.exports = async function getImageDims(imageString, folderString) {
    if (imageString.includes("http")) { // async from cdn
        return await probe(imageString);
    } else { // synchronous local call
        //var fileString = imageString.charAt(0).concat("public/", imageString.substr(1, imageString.length - 1));
        var fileString = imageString.charAt(0).concat(folderString, imageString.substr(1, imageString.length - 1));
        return sizeOf(".".concat(fileString));
    }
};