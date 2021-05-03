var getImageDims = require("./utilities/getImageDims");

// change to async?
module.exports = function sizeLogo(image, logoFolder) {
    var result = {
        height: NaN,
        width: NaN,
    };
    var logoDimensions = getImageDims(image, logoFolder).then(imgInfo => {
        var multiplier = 0.45 / imgInfo.height;
        result.height = imgInfo.height * multiplier;
        result.width = imgInfo.width * multiplier;
        result.width = result.width.toString();
        result.height = result.height.toString();
        return result;
    });

    return logoDimensions;
};
