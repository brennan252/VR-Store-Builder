module.exports = function trimStrings(planes) {
    var result = [];

    for (var plane of planes) {
        // title
        if (plane.panelTitle.length > 44) {
            plane.panelTitle = plane.panelTitle.substr(0, 43).concat("...");
        }
        if (plane.description.length > 185) {
            if (plane.description.charAt(184) === " ") {
                plane.description = plane.description.substr(0, 224).concat("...");
            } else {
                plane.description = plane.description.substr(0, 225).concat("...");
            }

        }
        result.push(plane);
    }

    return result;
};