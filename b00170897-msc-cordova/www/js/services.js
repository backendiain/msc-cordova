/* Where our services live - Google maps, weather reporting etc. */
app.service('wthrService', ['$window', '$http', '$q', '$cordovaGeolocation', function ($window, $http, $q, $cordovaGeolocation) {

  'use strict';

  this.getCurrentPosition = function () {
    var deferred = $q.defer();
    var pos;
    var posOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 20000
    };

    $cordovaGeolocation.getCurrentPosition(posOptions).then(function (pos) {
      deferred.resolve(pos);
    }, function (error) {
      alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
    });

    return deferred.promise;
  };

  /* promiseType parameter must be equal to '$http' or 'nativeJS' */
  this.getWeather = function (pos, promiseType) {
    var weatherData = {};
    var weatherReport = {};

    function siteListOnSuccess(data, pos) {
      var lat, lng, closest, closest_id, locations, loc_id, nearby, output = [],
        standpoint;

      lat = pos.coords.latitude;
      lng = pos.coords.longitude;

      /* find-locations.js parseJSON() method puts the Met Office monitoring locations list in the format it needs */
      if( typeof data === 'string' ) data = JSON.parse(data); // With the native Javascript method the data just comes back as a string so we convert it to an object
      locations = parseJSON(data); // Despite the similar name this doesn't do the same as the above native JSON.parse() method

      // where you are
      standpoint = new Location(null, "Your location", lat, lng);

      // just interested in the closest location in the list
      closest = $window.getNearest(standpoint, locations);
      //console.log(closest);
      closest_id = closest.location.id; // The Met Office site ID for the closest weather station used when querying the Met forecast service(s)

      var loading_msg = $window.document.getElementsByClassName('weather-loading-message');
      if (loading_msg != null) {
        for (var i = 0; i < loading_msg.length; i++) {
          loading_msg[i].innerHTML = 'Getting weather...';
        }
      }

      // or perhaps the 5 closest
      // nearby = getNNearest(standpoint, locations, 5);

      // console.log('closest station', closest);
      // console.log('nearby locations', nearby);

      // Let's assign the closest station's ID to our "loc_id" variable to use in our wthrService forecast service(s) query in services.js
      loc_id = closest_id;

      /* Our function for a successful request that parses and outputs our weather data */
      function getForecastOnSuccess(forecastData) {
        /* Return our weather data to the view */
        var wthrJSON = forecastData;
        weatherData.locData = {};
        weatherData.locData.currentDayReps = wthrJSON.SiteRep.DV.Location.Period[1]; // The hourly weather readings for the current day
        var latestRepKey = (typeof wthrJSON.SiteRep.DV.Location.Period[1].Rep.length == 'undefined') ? 1 : wthrJSON.SiteRep.DV.Location.Period[1].Rep.length; // The length of the weather reports array per 24 hour time minus one, e.g. 8PM/2000hrs = 19

        if (latestRepKey == 1) {
          weatherData.latestReport = wthrJSON.SiteRep.DV.Location.Period[1].Rep;
        }
        else {
          weatherData.latestReport = wthrJSON.SiteRep.DV.Location.Period[1].Rep[latestRepKey - 1];
        }

        weatherData.dataDate = wthrJSON.SiteRep.DV.dataDate; // The date the data requested is for
        weatherReport.dataDate = weatherData.dataDate;
        weatherData.Param = wthrJSON.SiteRep.Wx.Param; // Explanation for the parameters for each of the weather objects (hourly)
        //console.log(weatherData);

        /* Output our weather */
        weatherReport.temp = weatherData.latestReport.T + ' ' + weatherData.Param[1].units;


        /* Definitions from: http://www.metoffice.gov.uk/datapoint/support/documentation/code-definitions# */
        var weather_type_def = '';
        var weather_type_val = weatherData.latestReport.W;
        if (weather_type_val != 'NA') weather_type_val = Number(weather_type_val);

        switch (weather_type_val) {
          case 'NA':
            weather_type_def = 'Not available';
            break;

          case 0:
            weather_type_def = 'Clear night';
            break;

          case 1:
            weather_type_def = 'Sunny day';
            break;

          case 2:
            weather_type_def = 'Partly cloudy (night)';
            break;

          case 3:
            weather_type_def = 'Partly cloudy (day)';
            break;

          case 4:
            weather_type_def = 'Not used';
            break;

          case 5:
            weather_type_def = 'Mist';
            break;

          case 6:
            weather_type_def = 'Fog';
            break;

          case 7:
            weather_type_def = 'Cloudy';
            break;

          case 8:
            weather_type_def = 'Overcast';
            break;

          case 9:
            weather_type_def = 'Light rain shower (night)';
            break;

          case 10:
            weather_type_def = 'Light rain shower (day)';
            break;

          case 11:
            weather_type_def = 'Drizzle';
            break;

          case 12:
            weather_type_def = 'Light rain';
            break;

          case 13:
            weather_type_def = 'Heavy rain shower (night)';
            break;

          case 14:
            weather_type_def = 'Heavy rain shower (day)';
            break;

          case 15:
            weather_type_def = 'Heavy rain';
            break;

          case 16:
            weather_type_def = 'Sleet shower (night)';
            break;

          case 17:
            weather_type_def = 'Sleet shower (day)';
            break;

          case 18:
            weather_type_def = 'Sleet';
            break;

          case 19:
            weather_type_def = 'Hail shower (night)';
            break;

          case 20:
            weather_type_def = 'Hail shower (day)';
            break;

          case 21:
            weather_type_def = 'Hail';
            break;

          case 22:
            weather_type_def = 'Light snow shower (night)';
            break;

          case 23:
            weather_type_def = 'Light snow shower (day)';
            break;

          case 24:
            weather_type_def = 'Light snow';
            break;

          case 25:
            weather_type_def = 'Heavy snow shower (night)';
            break;

          case 26:
            weather_type_def = 'Heavy snow shower (day)';
            break;

          case 27:
            weather_type_def = 'Heavy snow';
            break;

          case 28:
            weather_type_def = 'Thunder shower (night)';
            break;

          case 29:
            weather_type_def = 'Thunder shower (day)';
                break;

              case 30:
                weather_type_def = 'Thunder';
                break;

              default:
                weather_type_def = 'Not available';
                break;
        }

        weatherReport.weather_type = weather_type_def;
        weatherReport.hum = weatherData.latestReport.H + weatherData.Param[9].units;
        weatherReport.wind = weatherData.latestReport.S + weatherData.Param[4].units + ' wind, ' + weatherData.latestReport.D;

        // We're done processing, let's take note!
        window.weather_timestamps.processingTime = performance.now();

        // return weatherData; <---- Raw report
        return weatherReport;
      };

      /* Our callback function to fire in case of an error */
      function getForecastOnError(error) {
        alert('Weather request error:\n' + error);
      };

      /* MET Office data point URL explained here: http://www.metoffice.gov.uk/datapoint/getting-started */
      var baseURL = 'http://datapoint.metoffice.gov.uk/public/data/val/wxobs/all/json/';
      var qry = loc_id + '?res=hourly';
      var key = '&key=3dd3210c-9aff-4547-9c28-9b590cc7d2c9';
      var forecast_req = baseURL + qry + key;

      /* Let's try and get our weather data! */
      var promise;

      function makeNativeForecastReq(method, url){
        return new Promise( function(resolve, reject){
          var forecast_xhr = new XMLHttpRequest();
          forecast_xhr.open(method, url);

          forecast_xhr.onload = function(){
            if(this.status >= 200 && this.status < 300){
              resolve(forecast_xhr.response);
            }
            else{
              reject({
                status: this.status,
                statusText: forecast_xhr.statusText
              });
            }
          };

          forecast_xhr.onerror = function(){
            reject({
              status: this.status,
              statusText: forecast_xhr.statusText
            });
          };

          forecast_xhr.send();
        });
      }

      /* Make our request */
      if(promiseType === '$http'){
        var promise = $http({ 
          method: 'GET', 
          url: forecast_req 
        }).then(
          function forecastReqSuccessCallback(forecast) {
            window.weather_timestamps.retrievalTime = performance.now();
            var forecast = getForecastOnSuccess(forecast.data);
            return forecast;
          }, 
          function forecastReqErrorCallback(forecast) {
            return getForecastOnError(forecast.status);
        });
      }
      else{
        /* Get forecast - fallback to native if the promiseType parameter isn't defined */
        promise = makeNativeForecastReq(
          'GET', forecast_req
        ).then( 
          function forecastReqSuccessCallback(forecast){
            window.weather_timestamps.retrievalTime = performance.now();
            var forecast = getForecastOnSuccess( JSON.parse(forecast) ); // Convert the returned string back to an object
            return forecast;
        }).catch(
          function (e){
            throw 'There has been an error getting the forecast data.';
          }
        );
      }

      return promise;
    }

    function siteListOnError(response) {
      alert('Met Office \"sitelist.json\" request error\n (Invalid Response) Status:' + response.status + ' Status Text: ' + response.statusText);
    }

    /* First we get our weather station site list provided by the MET Office and then either throw an error or continue to get a weather report */
    var req = '/lib/met-office/sitelist.json';

    if (ionic.Platform.isAndroid()) {
      req = '/android_asset/www/lib/met-office/sitelist.json';
    }

    /* We have to do things slightly differently to promisfy the native implementation */
    function makeNativeSitelistReq(method, url){
      return new Promise( function(resolve, reject){
        var sitelist_xhr = new XMLHttpRequest();
        sitelist_xhr.open(method, url);

        sitelist_xhr.onload = function(){
          if(this.status >= 200 && this.status < 300){
            resolve(sitelist_xhr.response);
          }
          else{
            reject({
              status: this.status,
              statusText: sitelist_xhr.statusText
            });
          }
        };

        sitelist_xhr.onerror = function(){
          reject({
            status: this.status,
            statusText: sitelist_xhr.statusText
          });
        };

        sitelist_xhr.send();
      });
    }

    var promise;

    /* Test promise chain - we can see the above two functions returning promises from one to the next, we should do the same with getForecastOnSuccess() and error */
    if(promiseType === '$http'){
      /* Get Site List */
      promise = $http({
        method: 'GET',
        url: req
      }).then( 
        function sitelistSuccessCallback(response){ 
          // Our sitelist request has loaded successfully, pass it on with our position to request a weather report from the closest weather station
          return siteListOnSuccess(response.data, pos) 
        }, 
        function sitelistErrorCallback(){ 
          // Our site list request failed, pass it on
          return siteListOnError(); 
      }).then(
        function(response){
          // Return to the controller, at this point we only need one response function
          return response; 
      });
    }
    else{
      /* Get Site List - fallback to native if the promiseType parameter isn't defined */
      promise = makeNativeSitelistReq(
        'GET', req
      ).then(
        function sitelistSuccessCallback(response){
          return siteListOnSuccess(response, pos);
        }
      ).catch(
        function(e){
          throw 'There has been an error getting the "sitelist.json" file.';
      }).then(
        function(response){
          return response;
        }
      );
    }

    return promise;
  };
}]);

app.service('lazyScriptLoaderService', ['$q', function ($q){
  this.script = function(url){

    /* If we've been given more than one script path then we can use $q.all() */
    if(Array.isArray(url)){
      var self = this, p_array = [];

      url.forEach( function(item){
        p_array.push(self.script(item));
      });

      return $q.all(p_array);
    }

    /* Our promise method that will deal with our script promise(s) */
    var promise = $q( function (resolve, reject){
      var r = false,
      t = document.getElementsByTagName("script")[0],
      s = document.createElement("script");

      //s.type = "text/javascript";
      s.src = url;
      s.async = "true";
      s.onload = s.onreadystatechange = function(){
        if(!r && (!this.readyState || this.readyState == "complete")){
          r = true;
          resolve(this);
        }
      };

      s.onerror = s.onabort = reject;
      t.parentNode.insertBefore(s, t);
    });

    return promise;
  }

}]);

app.service('cordovaTriggerTestService', ['$q', function ($q, $window, $scope){
  this.seq = function(total, len){
    var promise = $q( function (resolve, reject){
      if(typeof window.cordova.plugins.cordovaPluginTriggerBenchmark === 'object'){
        resolve(window.cordova.plugins.cordovaPluginTriggerBenchmark.seq(total, len));
      }
      else{
        reject('The "com.cordova.plugin.trigger.benchmark" is undefined.');
      }
    });

    return promise;
  },
  this.con = function(total, len){
    var promise = $q( function (resolve, reject){
      if(typeof window.cordova.plugins.cordovaPluginTriggerBenchmark === 'object'){
        resolve(window.cordova.plugins.cordovaPluginTriggerBenchmark.con(total, len));
      }
      else{
        reject('The "com.cordova.plugin.trigger.benchmark" is undefined.');
      }
    });

    return promise;
  }
}]);

app.service('iTunesSearchService', ['$http', function ($http){

  this.results = [],
 
  /* API Docs Here: https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/#searchexamples */
  this.getResults = function (req, promiseType) {

    /* We have to do things slightly differently to promisfy the native implementation */
    function makeiTunesSearchReq(method, url){
      return new Promise( function(resolve, reject){
        var itunes_xhr = new XMLHttpRequest();
        itunes_xhr.open(method, url);

        itunes_xhr.onload = function(){
          if(this.status >= 200 && this.status < 300){
            resolve(itunes_xhr.response);
          }
          else{
            reject({
              status: this.status,
              statusText: itunes_xhr.statusText
            });
          }
        };

        itunes_xhr.onerror = function(){
          reject({
            status: this.status,
            statusText: itunes_xhr.statusText
          });
        };

        itunes_xhr.send();
      });
    }

    var promise = false;

    /* NOTE:
     * Our request is expected as: "https://itunes.apple.com/search?term=jack+johnson" if in production, 
     * OR "/search?term=jack+johnson" in development with our node server.js file running and NOT ionic for proxy support.
     * SO BE SURE TO PASS THAT WHEN CALLING THIS SERVICE!
     */
    var reqUrl = req;

    if(promiseType === '$http'){
      /* Get Site List */
      return promise = $http({
        method: 'GET',
        url: reqUrl
      }).then(
        function iTunesSearchSuccessCallback(response){
          console.log('angular', response);
          return response.data;
        },
        function iTunesSearchErrorCallback(){
          console.error('There has been an error returning results for your iTunes search query.');
        }
      );
    }
    else{
      /* iTunes Request - fallback to native if the promiseType parameter isn't defined */
      return promise = makeiTunesSearchReq(
        'GET', reqUrl
      ).then(
        function iTunesSearchSuccessCallback(response){
          console.log('native', JSON.parse(response));
          return JSON.parse(response);
        }
      ).catch(
        function(e){
          throw 'There has been an error returning results for your iTunes search query.';
      });
    }

    /* If we've caught nothing return false */
    return promise;
  }
}]);