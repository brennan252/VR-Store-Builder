var fs = require('fs');
var templateBuild = require('../../templateBuild');
var defaultItems = require('../../buildUtilities/data/demoData');
var assert = require('assert');

describe('VR StoreBuilder templateBuild() test', function () {

    before(
        async function () {
            this.timeout(5000); // extend timeout

            // runs once before the first test in this block
            await templateBuild(
                defaultItems,
                "/images/VR-Store-Builder-Demo/redWineScene/redWine360.JPG",
                '#ECBCD4',
                "/images/greenLogo.png",
                "http://www.google.com/",
                "http://www.google.com/",
                "/images/favicon.png",
                'VR Store Builder Demo - Red Wines',
                './views/index.pug',
                './tests/templateBuild/mockedPublic/javascripts/info-panel-index.txt',
                './tests/templateBuild/mockedPublic/index.txt',
                "Page1.html",
                "/images/VR-Store-Builder-Demo/redWineScene/whiteWineLink.png",
                "White Wines",
                "0.05 1.95 -1.25",
                "",
                "",
            );

        }

    );

    after(
        async function () {
            this.timeout(5000); // extend timeout

            // runs once after the last test in this block
            // write string "EMPTY" to index and javascripts/info-panel
            var emptyFileString = "EMPTY";

            await fs.writeFile('./tests/templateBuild/mockedPublic/index.txt', emptyFileString, err => {
                if (err) {
                    console.error(err)
                    return
                }
                //file written successfully
            });

            await fs.writeFile('./tests/templateBuild/mockedPublic/javascripts/info-panel-index.txt', emptyFileString, err => {
                if (err) {
                    console.error(err)
                    return
                }
            //file written successfully
        });

    });

    beforeEach(function () {
        // runs before each test in this block
    });

    afterEach(function () {
        // runs after each test in this block
    });

    // test cases
    /*
    describe('templateBuild() Renders index.html correctly', function (done) {
        done();
    });
    */

    describe('write index html file correctly', function () {
        it('html output matches expectation', async function () {
            this.timeout(5000); // extend timeout

            var htmlGoal = " ";
            var htmlOut = " ";

            // read info-panel template text data
            await fs.readFile('./tests/templateBuild/referenceShots/htmlGoal.txt', 'utf8', (err, data) => {
                if (err) {
                    console.error(err)
                    return
                } else if (data) {
                    htmlGoal = data;
                }
            });

            await fs.readFile('./tests/templateBuild/mockedPublic/index.txt', 'utf8', (err, data) => {
                if (err) {
                    console.error(err)
                    return
                } else if (data) {
                    htmlOut = data;
                }
            });

            assert.equal(htmlGoal, htmlOut);
        });
        it('Javascript output matches expectation', async function () {
            this.timeout(5000); // extend timeout

            var jsGoal = " ";
            var jsOut = " ";

            // read info-panel template text data
            await fs.readFile('./tests/templateBuild/referenceShots/jsGoal.txt', 'utf8', (err, data) => {
                if (err) {
                    console.error(err)
                    return
                } else if (data) {
                    jsGoal = data;
                }
            });

            await fs.readFile('./tests/templateBuild/mockedPublic/javascripts/info-panel-index.txt', 'utf8', (err, data) => {
                if (err) {
                    console.error(err)
                    return
                } else if (data) {
                    jsOut = data;
                }
            });

            assert.equal(jsGoal, jsOut);
        });
    });
});