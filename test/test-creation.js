(function() {
  'use strict';
  var helpers, path;

  path = require('path');

  helpers = require('yeoman-generator').test;

  require('chai').should();

  describe('jps-site generator', function() {
    var mockFiles, mockQa;
    mockQa = {
      siteTitle: 'My Test Site',
      siteDesc: 'A modern site build to test.',
      featureTitle: 'Mocha Tests',
      featureBody: 'A modern site created by a Yeoman generator.',
      featureImage: 'images/feature.png'
    };
    mockFiles = ['.bowerrc', '.editorconfig', '.gitattributes', '.gitignore', '.jshintrc', '.travis.yml', 'bower.json', 'config.json', 'Gruntfile.js', 'package.json', 'app/images/feature.png', 'app/scripts/main.js', 'app/styles/main.css', 'app/index.html'];
    beforeEach(function(done) {
      return helpers.testDirectory(path.join(__dirname, 'temp'), (function(err) {
        if (err) {
          return done(err);
        }
        this.app = helpers.createGenerator('jps-site:app', ['../../app']);
        return done();
      }).bind(this));
    });
    it('creates expected files', function(done) {
      helpers.mockPrompt(this.app, mockQa);
      this.app.options['skip-install'] = true;
      return this.app.run({}, function() {
        helpers.assertFile(mockFiles);
        return done();
      });
    });
    return it('should have created the correct index.html file', function(done) {});
  });

}).call(this);
