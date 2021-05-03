// Rotate To Parallel


module.exports = function rotateToParallel(planes, viewPoint) {
    var result = [];

    for (var plane of planes) {
        var location = plane.position.split(" ");

        // get x rotation
        var xRot = ((Math.atan2(viewPoint[1] - location[1], -1 * Math.abs(location[2]) - viewPoint[2]) * 180 / Math.PI) + 180) % 360;;

        //get y rotation
        var yRot = ((Math.atan2(location[0] - viewPoint[0], location[2] - viewPoint[2]) * 180 / Math.PI) + 180) % 360;

        // push rotation
        plane.rotation = xRot.toString().concat(" ", yRot.toString(), " 0");
        result.push(plane);
    };
    return result;
};
