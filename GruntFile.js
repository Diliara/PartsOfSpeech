'use strict';

/**
 * Grunt Module
 */
module.exports = function (grunt) {

    /**
     * Configuration
     */
    grunt.initConfig({

        /**
         * Get package meta data
         */
        pkg: grunt.file.readJSON('package.json'),

        /**
         * Sass
         */
        sass: {
            dev: {
                options: {
                    style: 'expanded'                },
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

        /**
         * Watch
         */
        watch: {
            options: {
                livereload: true
            },
            sass: {
                files: '/scss/{,*/}*.{scss,sass}',
                tasks: ['sass:dev']
            }
        }


    });

    /**
     * Load Grunt plugins
     */
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);


    /**
     * Default task
     * Run `grunt` on the command line
     */
    grunt.registerTask('default', [
        'sass:dev',
        'watch'
    ]);


};


