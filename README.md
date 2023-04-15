# SafetyProxy
A simple Chrome extension to install on Chromebooks and set up. This extension is useful for network management and activity. This is also useful for **schools and enterprise companies who want to step up their gang.**

## `Setup` the extension
Download the Extension by getting the ZIP file from GitHub.

To install the extension making it ready for preparation, turn on Developer Mode at __chrome://extensions__ and click "Load unpacked" in the top menu. Select the unzipped folder that you got from this GitHub. The extension should now be loaded in for **testing**.

Go to your File Explorer and seek the unzipped folder. Open the unzipped folder and make sure it has a file called `"background.js"` and `"manifest.json"`. If you want to change extension generic properties, `manifest.json` is the place to go. If you want to manage proxy server settings, we will need to go to `background.js`.

## Editing Proxy server Settings
If you have not already, open `background.js` inside the unzipped folder. Here you can immediately see some configuration in the variable called `config`.

The `config["mode"]` parameter is automatically set to handle a PAC script. If you have a PAC script, paste yours in the `config["pacScript"]["data"]` parameter.

The `config["pacScript"]` parameter is optional and is changed accordingly depending on the `config["mode"]` parameter.

## Using a fixed proxy server
To use a fixed proxy server, replace the `config` variable with the code below:
```js
var config = {
  mode: "fixed_servers",
  rules: {
    //proxy server info can go here
    proxyForHttp: {
      scheme: "socks5", //your proxy server scheme (http, https, socks4, socks5)
      host: "1.1.1.14", // your proxy server ip or url (host)
      port: 80 // your proxy server port
    },
    bypassList: [
    // a list of urls with the scheme like "*.youtube.com" (ones you want to filter from the proxy and make a direct connection to them)
    ]
  }
};
```
