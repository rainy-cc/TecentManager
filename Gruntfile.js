//包装函数
module.exports = function(grunt){

    grunt.initConfig ({
        //获取文件配置信息
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options:{
                stripBanners: true,
                banner: '/*! <%= pkg.name %><%= pkg.version %> \n' + 'author:xc'+ '*/\n'
            },
            dist: {
				files: [
					{
						src: 'js/index.js',
               			dest: 'dest/index.min.js'
					},
					{
						src: 'js/mac.js',
               			dest: 'dest/mac.min.js'
					},
					{
						src: 'js/mobile.js',
               			dest: 'dest/mobile.min.js'
					}
				]
                
            }
        },
		
		cssmin: {
			dist:{
				files: [
					{
						src: 'css/index.css',
               			dest: 'css/index.min.css'
					},
					{
						src: 'css/mac.css',
               			dest: 'css/mac.min.css'
					},
					{
						src: 'css/mobile.css',
               			dest: 'css/mobile.min.css'
					},
					{
						src: 'css/global.css',
               			dest: 'css/global.min.css'
					}
				]
			}
		
		}

    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', ['uglify', 'cssmin']);
};
