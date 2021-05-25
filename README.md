# VRStoreBuilder
Streamline Virtual Reality eCommerce Development.

## Adaption To Liquid Template
This builder was adapted to create a Shopify custom VR Display section. Code for the section is in the 'vr-display.liquid' file.

A sample Shopify theme using the 'vr-display.liquid' section can be viewed [here](https://vr-builder-test-store.myshopify.com). 
The password is 'virtual' and go to the 'Shop In Vr' section in the menu.

The 'theme.liquid' was editted to only include the header on the custom page for the vr-display section (instead of both the header and footer -- which all other pages include). Some css tweaks may be needed depending on the theme.

## About
The VRStoreBuilder provides the templateBuild() function which generates a static AFRAME website bundle for a VR webstore.

The templateBuild() function takes an equirectangular image and store information to create a VR shopping experience. Users can interact with buttons and displays imposed on the equirectangular image.

An example generated site can be viewed [HERE](https://infallible-brown-61ca35.netlify.app/): (NOTE: commerce functionality is not enabled in this demo).

## Usage
To setup a store using templateBuild(): 

    - Download this repository, its dependencies, and add a 'public' folder with your site's images and assets to the downloaded local copy.
    - Setup your API with current eCommerce platform.
    - Edit 'scriptTemplates/info-panel-template.txt' to:
        - GET orderCount on init() to display in the viewCartButton
        - POST currentItem on addToOrder() call
    - Prepare an array of objects for items (see '/buildUtitilities/data' for all the properties to include)
    - Call templateBuild() with all images, files, and links in their specified locations.   
    - Host 'public' folder on AWS, Netlify, Bluehost, etc.
    - Add button on main eCommerce linking to the VR site address

## Example
The Demo was generated with this file:
```
    var templateBuild = require('./templateBuild');
    var redWines = require('./buildUtilities/data/redWineSceneData');
    var whiteWines = require('./buildUtilities/data/whiteWineSceneData');

    function compileBundle() {
        // index build (red wine)
        templateBuild(
            items = redWines,
            img360 = "/images/VR-Store-Builder-Demo/redWineScene/redWine360.JPG",
            primaryColor = '#548844',
            logo = "/images/greenLogo.png",
            cartLink = "http://www.aframe.io/",
            storeLink = "http://www.aframe.io/",
            favIconPath = "/images/favicon.png",
            storeTitle = 'VR Store Builder Demo - Red Wines',
            templatePath = './views/index.pug',
            infoPanelJsPath = './public/javascripts/info-panel-index.js',
            indexHtmlPath = './public/index.html',
            linkScenePath = "Page1.html",
            portalImage = "/images/VR-Store-Builder-Demo/redWineScene/whiteWineLink.png",
            linkSceneTitle = "White Wines",
            linkPosition = "0.05 1.95 -1.25",
            portalFolder = "public/",
            logoFolder = "public/"
        ).then(() => { console.log("index build complete") });

        // page 1 build (white wine)
        templateBuild(
            items = whiteWines,
            img360 = "/images/VR-Store-Builder-Demo/redWineScene/whiteWine360.jpeg",
            primaryColor = '#548844',
            logo = "/images/greenLogo.png",
            cartLink = "http://www.aframe.io/",
            storeLink = "http://www.aframe.io/",
            favIconPath = "/images/favicon.png",
            storeTitle = 'VR Store Builder Demo - White Wines',
            templatePath = './views/index.pug',
            infoPanelJsPath = './public/javascripts/info-panel-page1.js',
            indexHtmlPath = './public/Page1.html',
            linkScenePath = "index.html",
            portalImage = "/images/VR-Store-Builder-Demo/whiteWineScene/redWineLink.png",
            linkSceneTitle = "Red Wines",
            linkPosition = "0.05 1.95 -1.25",
            portalFolder = "public/",
            logoFolder = "public/"
        ).then(() => { console.log("Page1 build complete") });
    }

    compileBundle();
```
The objects in items property should look like this: 
```
    'title': "RaymondReserveSelectionMerlo",
    'panelTitle': "Raymond Reserve Selection Merlo - Napa Valley 2018 ($8.99)",
    'description': "Opening with enticing aromas of roasted coffee, vanilla bean and black cherry, this is a structured and bold Merlot. A plush entry of cocoa, dried red fruit flavors and a touch of spice lead to a savory midpalate. This wine has a good velvety texture with fine-grained tannins and a long, rich finish.",
    'img': "/images/VR-Store-Builder-Demo/redWineScene/IMG_1116.jpg",
    'imgFolder': "public/",
    'itemLink': "https://www.cocobonwines.com/",
    "position": "-0.865 1.1 -1.6"
```

## Modifying
To modify a site beyond what is possible through templateBuild()'s properties, 'templateBuild.js', templatePath, 
and/or '/scriptTemplates/info-panel-template.txt' will need to be edited.

    - templateBuild() renders the site's html from the specified pug templatePath file, so edit most templating there.
    - templateBuild() reads the info-panel component code from './scriptTemplates/info-panel-template.txt' file, so edit most of the Javascript there.
   
## Improvements
- Allow greater customization directly through templateBuild().

- Consolidate templateBuild() properties into higher level objects.

- Create Admin UI to mark locations on equirectangular image, input items and assets, and generate a store.

- Add eCommerce integration into templateBuild()

- Expand Test Coverage

## Testing
### Template Build
Make sure the *goal.txt files are taken from the goal for templateBuild() (particularly if you expext changes to html 
or js output code.

Then, run: `npm run-script test-templateBuild` to make sure templateBuild generates html and javascript as expected.

### Expanding Coverage
Should add Unit Tests for 'buildUtilities' and the Aframe component(right now just one 'info-panel-*' component).

## Credits
The info-panel component is adapted from the AFRAME example:
https://aframe.io/examples/showcase/responsiveui/
https://github.com/aframevr/aframe/tree/master/examples/showcase/ui
