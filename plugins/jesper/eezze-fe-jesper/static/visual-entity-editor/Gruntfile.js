const path = require('path');

module.exports = function (grunt) {
    initGruntConfig(grunt);
    loadNpmTasks(grunt);

    grunt.registerTask("compileJS", [
    		"copy:js",
        "concat",
        "babel:js",
        "clean:tmp"
    ]);

    var css = [
        "sass:theme"
    ];

    css.push("clean:tmp");

    grunt.registerTask("compileCSS", css);

    grunt.registerTask("compressIMG", [
        "copy:img",
    ]);

    grunt.registerTask("dev", [
        "compileJS",
        "compileCSS",
        "compressIMG"
    ]);

    grunt.registerTask("build", [
        "clean",
        "copy",
        "concat",
        "babel",
        "uglify",
        "sass:theme",
        "cssmin",
        "clean:tmp"
    ]);
};

const inTempDir = arr => arr.map(x => 'dist/tmp/' + x);

function initGruntConfig(grunt) {
    grunt.initConfig({
        clean: {
            js: ["dist/**/*.js"],
            precss: ["dist/css/*.css"],
            tmp: ["dist/tmp"]
        },

        babel: {
            options: {
                presets: [
                		'@babel/preset-react',
                		['@babel/preset-env', { 
	                        "targets": {
	                            "chrome": "58",
	                            "ie": "11"
	                        }
	                    }
                    ]
                  ]
            },
            js: {
                files: [
                    { expand: true, flatten: false, cwd: 'dist/js/', dest: 'dist/js/', src: ['**/*.js'] }
                ]
            }
        },

        uglify: {
            js: {
                files: [
                    { expand: true, flatten: false, cwd: 'dist/js/', dest: 'dist/js', src: ['**/*.js'] }
                ]
            }
        },

        copy: {
            js: {
                files: [
                    { expand: true, flatten: false, cwd: 'assets/js/', dest: 'dist/tmp/js', src: ['**/*.js'] }
                ]
            },
            img: {
                files: [
                    { expand: true, cwd: 'assets/img/', src: ['**/*'], dest: 'dist/img' },
                ]
            }
        },

        concat: {
            globalJS: {
                src: ['dist/tmp/js/vendors/**/*.js', 'dist/tmp/js/*.js'],
                dest: 'dist/js/global.js',
                nonull: true,
                separator: ';'
            }
        },

        sass: {
            theme: {
                options: {
                    implementation: require('node-sass'),
										importer: customImporter
                },
                files: [
									{ dest: 'dist/css/main.css', src: 'assets/css/main.scss' }
                ]
            }
        },

        cssmin: {
            all: {
            		files: [
            			{ src: 'dist/css/main.css', dest: 'dist/css/main.css' }
            		]
            }
        },

        watch: {
            js: {
                files: ["assets/js/**/*.js"],
                tasks: ["compileJS"]
            },
            scss: {
                files: ["assets/css/**/*.scss","assets/css/**/*.css"],
                tasks: ["compileCSS"]
            },
            img: {
                files: ["assets/img/**/*"],
                tasks: ["compressIMG"]
            }
        }
    });
}

function loadNpmTasks(grunt) {
  // Generic
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-hash");

  // Javascript
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-babel");

  // Css
  grunt.loadNpmTasks("grunt-sass");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
}


function convertToSlug(Text)
{
    return Text
        .toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'')
        ;
}

function customImporter(url, prev, done) {
 		if (url.substring(0, 9) === '/plugins/') {
	    url = path.resolve(__dirname + "/../../" + url.substr(1));
	  } else if (url.substring(0, 5) === '/css/') {
	    url = path.resolve(__dirname + "/assets/" + url.substr(1));
	  } else if(url[0] === '~') {
	    url = path.resolve(__dirname + "/node_modules/" + url.substr(1));
	  } else if(url[0] === '/') {
	  	url = path.resolve(__dirname + "/" + url.substr(1));
	  }
	  return { file: url };
}