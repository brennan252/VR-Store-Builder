var getImageDims = require("./utilities/getImageDims");

// TODO
// check to see if image will need to set limit at height of at width... 
// NOT Just height

function sizeInfoPanelImage(plane) {
    var sizedImage = getImageDims(plane.img, plane.imgFolder).then(imgInfo => {
        var result = plane;
        var multiplier = 0.81 / imgInfo.height;
        result.imgHeight = imgInfo.height * multiplier;
        result.imgWidth = imgInfo.width * multiplier;
        result.imgWidth = plane.imgWidth.toString();
        result.imgHeight = plane.imgHeight.toString();
        return result;
    });

    return sizedImage;
};

// Size Images

module.exports = async function sizeInfoPanelImages(planes) {
    var results = [];

    for (var plane of planes) {
        var item = await sizeInfoPanelImage(plane);
        results.push(item);
    };

    return results;
};