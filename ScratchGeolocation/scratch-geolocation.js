(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};
    
    function usingHTTPS()
    {
        if (location.protocol.includes('https'))
        {
            return true;
        }

        return false;
    }

    function verifyVal(val, subs='0')
    {
        if ([null, undefined, ''].includes(val))
        {
            val = subs;
        }

        return val;
    }
  
    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        if (navigator.geolocation)
        {
            if (usingHTTPS())
            {
                return {status: 2, msg: 'Ready'};
            }
            else
            {
                return {status: 1, msg: 'Not using HTTPS'};
            }
        }
        else
        {
            return {status: 0, msg: 'Geolocation not supported'};
        }
    };

    last_acc     = '';
    last_alt_acc = '';

    ext.get_lat = function(callback)
    {
        navigator.geolocation.getCurrentPosition(function(pos)
        {
            let str = verifyVal(pos.coords.latitude);

            last_acc = pos.coords.accuracy;

            callback(str);
        });
    };

    ext.get_lon = function(callback)
    {
        navigator.geolocation.getCurrentPosition(function(pos)
        {
            let str = verifyVal(pos.coords.longitude);

            last_acc = pos.coords.accuracy;

            callback(str);
        });
    };

    ext.get_alt = function(callback)
    {
        navigator.geolocation.getCurrentPosition(function(pos)
        {
            let str = verifyVal(pos.coords.altitude);

            last_alt_acc = pos.coords.altitudeAccuracy;

            callback(str);
        });
    };

    ext.get_acc = function()
    {
        return verifyVal(last_acc);
    };

    ext.get_alt_acc = function()
    {
        return verifyVal(last_alt_acc);
    };

    ext.get_speed = function(callback)
    {
        navigator.geolocation.getCurrentPosition(function(pos)
        {
            let str = verifyVal(pos.coords.speed);

            last_acc = pos.coords.accuracy;

            callback(str);
        });
    };

    ext.get_h = function(callback)
    {
        navigator.geolocation.getCurrentPosition(function(pos)
        {
            let str = verifyVal(pos.coords.heading);

            last_acc = pos.coords.accuracy;

            callback(str);
        });
    };
  
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name
            ['R', 'Get current latitude', 'get_lat'],
            ['R', 'Get current longitude', 'get_lon'],
            ['R', 'Get current altitude', 'get_alt'],
            ['R', 'Get current speed', 'get_speed'],
            ['R', 'Get current heading', 'get_h'],
            ['r', 'Get accuracy', 'get_acc'],
            ['r', 'Get altitude accuracy', 'get_alt_acc'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Scratch geolocation', descriptor, ext);
  })({});