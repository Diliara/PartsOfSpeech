'use strict';

module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dev: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'css/app.css': 'scss/app.scss'
                }
            },
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'css/app.css': 'scss/app.scss'
                }
            }
        },
        watch: {

            css: {
                files: 'scss/*.scss',
                tasks: ['sass:dev']
            }
        }
    });

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    /* Default task. Run `grunt` on the command line */
    grunt.registerTask('default', [
        'sass:dev',
        'watch'
    ]);


};


