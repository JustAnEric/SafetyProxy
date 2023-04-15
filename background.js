console.log("Background script is running. Starting proxy on local network...")
var config = {
  mode: "pac_script",
  pacScript: {
    data: `
  function FindProxyForURL (url, host) {
    function shouldNotProxy(url, host, userWhitelist) {
      let lanIps = /(^(127|10)\.\d{1,3}\.\d{1,3}\.\d{1,3}$)|(^192\.168\.\d{1,3}\.\d{1,3}$)|(^172\.1[6-9]\.\d{1,3}\.\d{1,3}$)|(^172\.2[0-9]\.\d{1,3}.\d{1,3}$)|(^172\.3[0-1]\.\d{1,3}\.\d{1,3}$)/

      let whitelist = [
        //urls
      ].concat(userWhitelist)

      return [
        isPlainHostName(host),
        // if it is NOT an allowed protocol then go direct
        // TODO: how to test local protocols?
        ['http', 'ftp', 'ws'].every(protocol => !url.startsWith(protocol)),
        lanIps.test(host),
        whitelist.some(pattern => shExpMatch(url, pattern)),
      ].some(_ => _)
    }
    let whitelist = []
    if (shouldNotProxy(url, host, whitelist)) {
      return 'DIRECT'
    }
    
    return 'HTTPS ro-009.totallyacdn.com:443;HTTPS ro-011.totallyacdn.com:443;HTTPS ro-004.totallyacdn.com:443;HTTPS ro-007.totallyacdn.com:443;HTTPS ro-014.totallyacdn.com:443;HTTPS ro-013.totallyacdn.com:443;'
  }
    `
  }
};

chrome.proxy.settings.set(
  {value: config, scope: 'regular'},
  function() {}
);
