###Conway's Game of Life

This is a minimal [Game of Life](http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) project using test driven approach with Node.js, Mocha, Expect.js, and Grunt task automation.

####Prerequisites

- [Node.js](http://nodejs.org/)
- for developing: [Grunt](http://gruntjs.com/getting-started)

####Usage

First you have to require gol.js:

```js
var gol = require('../src/gol.js');
```

Then you need an object (in the below example called `beingsMap`) that represents the starting situation (the seed of the world). The object must contain the following properties:
- The `map` array must be a matrix, where the number `1` means an alive being, and number `0` means an empty cell
- You have to give the `width` and `height` of the matrix, too:

```js
var beingsMap = {
    map: [
        0,  0,  0,  0,  0,
        0,  0,  1,  0,  0,
        0,  0,  1,  0,  0,
        0,  0,  1,  0,  0,
        0,  0,  0,  0,  0,
        0,  0,  0,  0,  0
      ],
    width: 5,
    height: 6
  };
```

If You have to instantiate a `Word` object, and load the map to the world with `world.loadBeingsMap()` method:

```js
var world = new gol.World();
world.loadBeingsMap(beingsMap);
```

The `world` object has a `beings` array, that contains all the alive beings. To get the coordinates of a `being`, you can use its `getX()` and `getY()` methods.

After loading the map to the world, you can calculate the next generation:

```js
var world = gol.nextGen(world);
```

####Demo

To run demo type `node src/display.js` in the project library.

####Developing

#####Installation

Clone the project, then run `npm install`.

#####Grunt tasks

We have the following tasks:
- jshint to lint .js files
- mochacli to run tests

When developing, run:

- `grunt watch` results in running grunt tasks automatically when a file is changed in the watched directory.

- `grunt test:dev` to lint your code and run your tests. The task stops if there's any failing test. The same happens if you run `grunt` without any arguments.

- `grunt test:all` to lint your code and run the test suite with all the tests, no matter if there's a failing one.

#####Used packages

- Grunt.js for task automaton
  - `grunt-contrib-jshint` for linting
  - `grunt-newer` for running Grunt tasks on newer files only
  - `grunt-contrib-watch`
  - `grunt-mocha-cli` (Mocha testing framework for Grunt)
- Expect.js as an assertion framework

#####EditorConfig

EditorConfig is used to maintain consistent coding styles. There is an `.editorconfig` file in the project root directory, that defines the main styles.

You have [EditorConfig plugins](http://editorconfig.org/) for lots of editors.

As opening a file, EditorConfig plugins look for a file named `.editorconfig` in the directory of the opened file and in every parent directory. A search for `.editorconfig` files will stop if the root filepath is reached or an `.editorconfig` file with `root=true` is found.
