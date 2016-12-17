var exec = require('cordova/exec');

/*
exports.coolMethod = function(arg0, success, error) {
    exec(success, error, "cordova-plugin-trigger-benchmark", "coolMethod", [arg0]);
};
*/

var cordovaPerformanceBenchmark = {
	data: {},
	test: function(){ return 'Promise returned.'; },
	init: function(){
		console.log('cordovaPerformanceBenchmark is working.');

		return null;
	},
	ping: function(data, success, error){
		return null;
	},
	seq: function (total, len) {
		return null;
	},
	con: function (total, len) {
		return null;
	}
};

cordovaPerformanceBenchmark.init();
module.exports = cordovaPerformanceBenchmark;