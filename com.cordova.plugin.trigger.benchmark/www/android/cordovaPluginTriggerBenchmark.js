var exec = require('cordova/exec');

/*
exports.coolMethod = function(arg0, success, error) {
    exec(success, error, "cordova-plugin-trigger-benchmark", "coolMethod", [arg0]);
};
*/

var cordovaPerformanceBenchmark = {
	data: {},
	init: function(){
		console.log('cordovaPerformanceBenchmark is working.');

		this.data['10'] = '1234567890';
		this.data['100'] = '';
		for (i = 0; i < 10; i++) {
			this.data['100'] += this.data['10'];
		}
		this.data['1000'] = '';
		for (i = 0; i < 10; i++) {
			this.data['1000'] += this.data['100'];
		}
		this.data['10000'] = '';
		for (i = 0; i < 10; i++) {
			this.data['10000'] += this.data['1000'];
		}

	},
	ping: function(data, success, error){
		//window.cordova.exec( function(result){ console.log(result + 'this worked'); }(), function(){  }, "cordovaPerformanceBenchmark", "ping", [data]);
	
			window.cordova.exec(
				function(result){
					success();
				},
				function(){
					console.log('There was an error.');
				},
				"cordovaPluginTriggerBenchmark",
				"ping",
				[data]
			);
	},
	seq: function (total, len) {
		var that = cordovaPerformanceBenchmark;
		var count = 0;
		var start = new Date().getTime();
		var go = function() {
			count++;
			if (count <= total) {
				that.ping(that.data[len], go);
			} else {
				// ADD IN DOUBLE CLICK SAFEGUARD
				console.log(total + ' sequential requests with ' + len + ' bytes of data: ' + ((new Date().getTime() - start)/1000) + ' seconds.');
				//document.body.innerHTML += '<p>'+total+' sequential requests with '+len+' bytes of data: '+((new Date().getTime() - start)/1000)+' seconds</p>';
			}
		}
		go();
	},
	con: function (total, len) {
		var that = cordovaPerformanceBenchmark;
		var count = 0;
		var start = new Date().getTime();
		var response = function () {
			count++;
			if (count == total) {
				console.log(total + ' concurrent requests with ' + len + ' bytes of data: ' + ((new Date().getTime() - start)/1000) + ' seconds.');
				//document.body.innerHTML += '<p>'+total+' concurrent requests with '+len+' bytes of data: '+((new Date().getTime() - start)/1000)+' seconds</p>';
			}
		}
		for (i = 0; i < total; i++) {
			that.ping(that.data[len], response);
		}
	}
};

cordovaPerformanceBenchmark.init();
module.exports = cordovaPerformanceBenchmark;