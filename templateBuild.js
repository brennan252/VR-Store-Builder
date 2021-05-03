'use strict';
var pug = require('pug');
var fs = require('fs');
var rotateToParallel = require('./buildUtilities/rotateToParallel');
var sizeInfoPanelImages = require('./buildUtilities/sizeInfoPanelImages');
var trimStrings = require('./buildUtilities/trimStrings');
var sizeLogo = require('./buildUtilities/sizeLogo');


// Build Bundle
// add defaults
module.exports = async function templateBundle(
    items, img360, primaryColor, logo, cartLink,
    storeLink, favIconPath, storeTitle, templatePath,
    infoPanelJsPath, indexHtmlPath, linkScenePath,
    portalImage, linkSceneTitle, linkPosition, portalFolder = "public/",
    logoFolder = "public/"
) {

    // Compile the html source code
    var compiledFunction = pug.compileFile(templatePath);
    var content = " ";

    // read info-panel template text data
    // Using readFileSync to Avoid Async buffer issues reading empty string for data 
    try {
        const data = fs.readFileSync('./scriptTemplates/info-panel-template.txt', 'utf8')
        content = content.concat(data);
    } catch (err) {
        console.error(err);
    }

    // get pptimal logo and portal dimensions
    var logoDimensions = await sizeLogo(logo, logoFolder);
    var portalDimensions = await sizeLogo(portalImage, portalFolder);

    // size pictures to backgrounds, trim 
    // descriptions and titles and rotate pictures to 
    // face the viewer
    // ORDER MATTERS
    items = await sizeInfoPanelImages(items);
    items = trimStrings(items);
    items = rotateToParallel(items, [0, 1.6, 0]);

    // create String to add to info-panel-template.txt file
    var itemsString = "var items = {";
    items.map((item) => {
        itemsString = itemsString.concat(item.title, "Button", ": { title: \"", item.panelTitle,
            "\", itemSite: \"", item.itemLink,
            "\", imgEl: document.querySelector('#", item.title, "MovieImage'), description: \"",
            item.description, "\"}, ");
    });

    // add to the info panel template string
    itemsString = itemsString.concat("};  this.movieInfo = items; }, });");

    var jsOut = content.concat(itemsString);


    // write to javascript bundle 
    await fs.writeFile(infoPanelJsPath, jsOut, err => {
        if (err) {
            console.error(err)
            return
        }
        //file written successfully
    });
    var linkInfo = [{
        'position': linkPosition,
        'rotation': "0 0 0",
    }];

    linkInfo = rotateToParallel(linkInfo, [0, 1.6, 0]);
    var infoPanelPublicPath = infoPanelJsPath.replace("/public", "");

    // create string of html file from template
    var htmlOut = compiledFunction({
        title: storeTitle,
        imageLink: img360,
        menuItems: items,
        brandLogo: logo,
        logoDims: logoDimensions,
        brandPrimaryColor: primaryColor,
        userCartLink: cartLink,
        storePageLink: storeLink,
        faviconString: favIconPath,
        linkRotation: linkInfo[0].rotation,
        linkPosition: linkInfo[0].position,
        linkPath: linkScenePath,
        portalImageLink: portalImage,
        portalDims: portalDimensions,
        linkTitle: linkSceneTitle,
        jsPath: infoPanelPublicPath,
    });

    // write string to bundle index file
    await fs.writeFile(indexHtmlPath, htmlOut, err => {
        if (err) {
            console.error(err)
            return
        }
        //file written successfully
    });
};