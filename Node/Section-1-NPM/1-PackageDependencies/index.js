// Using the npm package => underscore 
const _ = require('underscore')
console.log(_.contains([1, 2, 4], 1))

// The node_modules folder contains the dependencies to be used with installed packages

// Dependencies are installed in package.json file, so if we lose the node_modules folder we can restore it/dependencies by running => npm i or npm install