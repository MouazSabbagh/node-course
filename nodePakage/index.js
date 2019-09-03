const _ = require("underscore");
const result = _.contains([1, 2, 3], 3);
console.log(result);

// normally you have npm installed, if u are interesting in specific version,npm i -g @npm version
// for the project we need package.json, sudo npm init --yes
// to install specific package npm i name of the package
// to initializes your project in gitHup we run git init
// to ignore the files and the folder in the github repo we add file in the root folder .gitIgnore
// and we add to this file or the files and the folder we want to ignore it
//"mongoose": "^5.6.11",so what this main this number are the semantic version Semver,
//Major""it will change if they add new features break the api so the version will be 6.0.0".
//Minor""adding new features without breaking the api, and when this happen the Patch number will be Zero because there is no bug yet".
//Patch"for fixing bugs so the version will increment"
//^ is mean its ok for any version have the same major number for mongoose here 5.x
//~ the major and the minor have the same so 5.6.x
// if i am interesting in the exact version so no ^ no ~
// if u run npm list in the project it will show all the version of the package and the version of there dependence
// to see all the dependance version of my application i run the command npm list --depth = 0
// the fastest way to check the dependance and their dependance is to run => npm view then the name of the package dependencies .
// if i am interesting just in the dependencies i will run mongoose dependencies => npm view mongoose dependencies
// to see all the version of one package we run => npm view name Of the Package version
// to install the same version of a package i run nom i name of the package@the version number
// to check if some of your packages updated i run the command npm outdated
// to update our package i run npm update
// to update the package to the newest version i have to run this command first
//sudo npm i -g npm-check-updates
// dev dependencies should not go the production mood , we just need them for in the developing mood
//to save the package as dev dependencies i run npm i the (name of the package) --save-dev
// to install the last version of npm => sudo npm i -g npm or i add@ for specific version
//
