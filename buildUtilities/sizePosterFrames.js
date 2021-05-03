module.exports = function sizePosterFrames(planes, borderWidth) {
    var result = [];
    //FIX 
    // TODO Before using again!
    for (var plane of planes) {
        plane.frameWidth = 1;
        plane.frameHeight = 1;
        plane.frameWidth = plane.frameWidth.toString();
        plane.frameHeight = plane.frameHeight.toString();
        result.push(plane);
    };
    return result;
};