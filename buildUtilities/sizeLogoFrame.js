module.exports = function sizeLogoFrame(logoDimensions) {
    var frameWidth = Number(logoDimensions.height) * 0.15;
    var h = Number(logoDimensions.height) + frameWidth;
    var w = Number(logoDimensions.width) + frameWidth;
    var result = {
        height: h.toString(),
        width: w.toString(), 
    };

    return result;
};
