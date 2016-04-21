module.exports = function(grunt) {
  var initConfig = {
    pkg: grunt.file.readJSON('package.json'),
    dirs: { /* just defining some properties */
      lib: './lib/',
      theme: '../',
      assets: 'assets/',
      js: 'js/',
      jsx: 'jsx/',
      css: 'css/',
      scss: 'scss/',
      img: 'img/'
    },
    svgstore: {
      icons: {
        files: {
          '<%= dirs.theme %><%= dirs.assets %><%= dirs.img %>art.svg': ['svg/use/*.svg']
        },
        options: {
          formatting : {
            indent_size : 2
          },
          prefix: 'icon-',
          cleanup: true,
          convertNameToId: function(name) {
            return name.replace(/^\w+\_/, '');
          }
        }
      }
    },
    sass:{
      dev: {
				options: {
					style: 'compressed',
					compass: false,
          sourcemap: false
				},
				files: {
					'<%= dirs.theme %><%= dirs.assets %><%= dirs.css %>main.css': '<%= dirs.scss %>main.scss'
				}
			}
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9']
      },
      main: {
        files: {
					'<%= dirs.theme %><%= dirs.assets %><%= dirs.css %>main.css': '<%= dirs.theme %><%= dirs.assets %><%= dirs.css %>main.css'
				}
      }
    },
    watch: { /* trigger tasks on save */
      options: {
          livereload: true
      },
      scss: {
          options: {
              livereload: false
          },
          files: '<%= dirs.scss %>**/*.scss',
          tasks: ['sass:dev', 'growl:sass']
      },
      jsx: {
          options: {
              livereload: false
          },
          files: '<%= dirs.jsx %>**/*.jsx',
          tasks: ['babel', 'growl:babel']
      }
    },
    growl: { /* optional growl notifications requires terminal-notifer: gem install terminal-notifier */
        sass: {
            message: "Sass files created.",
            title: "grunt"
        },
        build: {
            title: "grunt",
            message: "Build complete."
        },
        watch: {
            title: "grunt",
            message: "Watching. Grunt has its eye on you."
        },
        concat: {
            title: "grunt",
            message: "JavaScript concatenated."
        },
        uglify: {
            title: "grunt",
            message: "JavaScript minified."
        },
        babel: {
            title: "babel",
            message: "Babel Babel."
        }
    },
    babel: {
      options: {
        plugins: ['transform-react-jsx'],
        presets: ['es2015', 'react']
      },
      jsx: {
        files: [{
          expand: true,
          cwd: './jsx/', // Custom folder
          src: ['*.jsx'],
          dest: '<%= dirs.theme %><%= dirs.assets %><%= dirs.js %>', // Custom folder
          ext: '.js'
        }]
      }
    }
  };

  grunt.initConfig(initConfig);

  //grunt.loadNpmTasks('grunt-bower-task');
  //grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-growl');
  grunt.loadNpmTasks('grunt-babel');

  grunt.registerTask('default', ['growl:watch', 'watch']);
  grunt.registerTask('build',['svgstore','sass','autoprefixer','growl:build']);

};
