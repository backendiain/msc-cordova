package com.cordova.plugin.trigger.benchmark;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.apache.cordova.PluginResult.Status;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * This class echoes a string called from JavaScript.
 */
public class cordovaPluginTriggerBenchmark extends CordovaPlugin{
    @Override
    public boolean execute(String action, JSONArray data, CallbackContext callbackContext) throws JSONException {

        if(action.equals("ping")){
            this.pingResult(data, callbackContext);
        }

        return true;
    }

    private void echo(String message, CallbackContext callbackContext) {
        if (message != null && message.length() > 0) {
            callbackContext.success(message);
        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }
    }

    private void pingResult(JSONArray data, CallbackContext callbackContext){
        //System.out.println(data.getClass().getSimpleName());

        if(data != null && data.length() > 0){            
            PluginResult result = new PluginResult(PluginResult.Status.OK, data);
            result.setKeepCallback(true);
            callbackContext.sendPluginResult(result);
        }
        else{
            PluginResult result = new PluginResult(PluginResult.Status.ERROR);
            result.setKeepCallback(true);
            callbackContext.sendPluginResult(result);
        }
    }
}
