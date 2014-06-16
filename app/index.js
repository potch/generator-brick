'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var BrickGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Brick generator!'));

    var prompts = [{
      name: 'brickname',
      message: 'How would you like to call your brick?',
    },{
      name: 'tagname',
      message: 'What will be the html-tag of your brick?',
    },{
      name: 'github',
      message: 'What is your github username?',
    }];

    this.prompt(prompts, function (props) {
      this.brickname = props.brickname;
      this.tagname = props.tagname;
      this.github = props.github;

      done();
    }.bind(this));
  },

  app: function () {

    this.mkdir('src');
    this.copy('src/element.html','src/element.html');
    this.copy('src/element.js','src/element.js');
    this.copy('src/element.styl','src/element.styl');

    this.mkdir('test');
    this.copy('test/browser.js','test/browser.js');

    this.copy('gulpfile.js', 'gulpfile.js');
    this.copy('karma.conf.js', 'karma.conf.js');

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');

    this.copy('index.html', 'index.html');

    this.copy('readme.md', 'readme.md');

  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');
  }
});

module.exports = BrickGenerator;