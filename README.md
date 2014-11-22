###Conway's Game of Life

This is a minimal [Game of Life](http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) project using test driven approach with Node.js, Mocha, Expect.js, and Grunt task automation.

####Prerequisities

- [Node.js](http://nodejs.org/)
- for developing: [Grunt](http://gruntjs.com/getting-started)

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
