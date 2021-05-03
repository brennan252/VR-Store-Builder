var getImageDims = require("./utilities/getImageDims");

// change to async?
function sizePoster(plane) {
    var sizedPoster = getImageDims(plane.imgPoster, plane.imgFolder).then(posterImgInfo => {
        var result = plane;
        var multiplier = 0.54 / posterImgInfo.width;
        result.posterHeight = posterImgInfo.height * multiplier;
        result.posterWidth = posterImgInfo.width * multiplier;
        result.posterWidth = result.posterWidth.toString();
        result.posterHeight = result.posterHeight.toString();
        return result;
    });

    return sizedPoster;
};

module.exports = async function sizePosterImages(planes) {
    var results = [];

    for (var plane of planes) {
        var item = await sizePoster(plane);
        results.push(item);
    };

    return results;
};
