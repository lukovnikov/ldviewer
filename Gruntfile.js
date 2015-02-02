module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);
  
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),    
       // Empties folders to start fresh
       clean: {
           dist: {
                files: [{
                    dot: true,
                    src: [
                        'dist/{,*/}*'
                        ]
                }]
           }
        },
        
        copy: {
          img: {
            expand: true,
            cwd:    'src',
            src:    'img/*',
            dest:   'dist/'
          },
          html: {
            expand: true,
            cwd:    'src',
            src:    'index.html',
            dest:   'dist/'
          }
        },
        concat: {
            css: {
                src: [
                    'src/**/*.css'
                ],
                dest: 'dist/ldv.css'
            },
            js: {
                src: [
                    'js/*.js'
                ],
                dest: 'dist/ldv.js'
            },
			scss: {
				src: [
					'src/ldv.scss',
					'src/**/*.scss'
				],
				dest: 'dist/ldv.scss'
			},
			srcjs: {
				src: [
					'src/ldv.js',
					'src/controller.js',
					'src/pretty/**/*.js',
					'src/services/**/*.js',
					'src/taf/**/*.js',
					'src/tools/**/*.js',
					'src/triple-table/**/*.js',
					'src/ui/**/*.js',
					'dist/tpls/*.js'
				],
				dest: 'dist/ldv.js'
			},
			config: {
				src: ['src/dist/config.js'],
				dest: 'dist/cfg.js'
			},
			actions: {
				src: ['src/dist/actions/*.js'],
				dest: 'dist/actions.js'
			}
        },
        cssmin: {
            css: {
                src: 'dist/ldv.css',
                dest: 'dist/ldv.css'
            }
        },
        ngmin: {
			dist: {
				files: {
					'dist/ldv.js': ['dist/ldv.js']
				}
			}
        },
        uglify: {
            js: {
                files: {
                    'dist/ldv.js': ['dist/ldv.js']
                }
            },
			config: {
				src:	'dist/cfg.js',
				dest:	'dist/cfg.js'
			},
			actions: {
				src:	'dist/actions.js',
				dest:	'dist/actions.js'
			}
        },
		html2js: {
			options: {
				module:	function(obj, target) {return "ldv.templates."+target;}
			},
			pretty: {
				src: 	'src/pretty/**/*.html',
				dest:	'dist/tpls/pretty.js'
			},
			ui:		{
				src:	'src/ui/**/*.html',
				dest:	'dist/tpls/ui.js'
			},
			tripletable: {
				src:	'src/triple-table/**/*.html',
				dest:	'dist/tpls/tripletable.js'
			},
			main: {
				src:	'src/tpl/*.html',
				dest:	'dist/tpls/main.js'
			}
		},
		sass: {
			dist: {
				src:	'dist/ldv.scss',
				dest:	'dist/ldv.css'
			}
		},
        watch: {
          files: ['src/*', 'src/*/*'],
          tasks: ['buildSrc']
        },
        
        
    wiredep: {
      app: {
        src: ['src/index.html'],
        ignorePath:  /\.\.\//
      }
    },
    
    useminPrepare: {
      html: 'src/index.html'
    },

    usemin: {
      html: ['dist/index.html']
    },
    
       // The actual grunt server settings
    connect: {
      options: {
        port: 9005,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static("src")
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static("src")
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: 'dist'
        }
      }
    },
        
        
    });
    
  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build','connect:dist:keepalive']);
    }

    grunt.task.run([
      'connect:livereload'
    ]);
  });
    
    grunt.registerTask('default', ['build']);
	grunt.registerTask('build', 
		[
		'clean:dist', 
		'copy:img', 
		'buildConfig', 
		'buildActions', 
		'buildSrc', 
		'buildCss',
		'wiredep',
		'useminPrepare',
		'concat:generated',
		'uglify:generated',
		'copy:html',
		'usemin'
		]);
	
	//grunt.registerTask('buildSass', ['concat:scss', 'sass', 'cssmin']);
	grunt.registerTask('buildConfig', ['concat:config', 'uglify:config']);
	grunt.registerTask('buildActions', ['concat:actions', 'uglify:actions']);
	grunt.registerTask('buildSrc', ['html2js', 'concat:srcjs', 'ngmin:dist'/*, 'uglify:js'*/]);
	grunt.registerTask('buildCss', ['concat:css','cssmin']);
};
