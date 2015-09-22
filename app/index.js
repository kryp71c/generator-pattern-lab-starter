'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var exec = require('child_process').exec;

var answers = {};

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    //var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the remarkable ' + chalk.red('PatternLabStarter') + ' generator!' + '\nPlease be in the folder you want files in now.'
    ));

    var prompts = [
      //{
      //  type: 'confirm',
      //  name: 'extras',
      //  message: 'Would you like to install some extras too?',
      //  default: false
      //}
      //{
      //  type: 'confirm',
      //  name: 'installDeps',
      //  message: 'Want to install dependencies after?',
      //  default: true
      //}
    ];

    //this.prompt(prompts, function (props) {
    //  if (props.extras) {
    //    this.composeWith('pattern-lab-starter:extras');
    //  }
    //  done();
    //}.bind(this));
  },

  writing: function() {
    var installPath = '';
    if (this.options.themePath) {
      installPath = this.options.themePath;
    }
    var done = this.async();
    this.remote('phase2', 'pattern-lab-starter', 'master', function (err, remote) {
      remote.directory('.', installPath);
      done();
    }, true);
  },

  install: function () {
    this.installDependencies();
    this.log('Installing Ruby dependencies with `bundle install` ... ');
    this.spawnCommand('bundle', ['install']);
  },

  end: function() {
    //var done = this.async();
    //var that = this;

    this.log(yosay(
      'All done with main install! \nConsider installing extras with `yo pattern-lab-starter:extras'
    ));
  }
});
