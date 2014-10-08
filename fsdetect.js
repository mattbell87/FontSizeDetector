/*
    FontSizeDetector
    ----------------
    A javascript module that detects when the font size has changed
    Matt Bell 2014
    License: GNU
*/

var FontSizeDetector = new (function()
{
    /* Public variables */
    this.refreshRate = 500; //ms for refresh interval

    /* Private variables */
    var detector = null;
    var lastValue = 0;
    var listeners = [];

    //Start detection
    this.construct = function()
    {
        detector = document.createElement('span');
        detector.innerHTML = '&nbsp;';
        document.body.appendChild(detector);
        lastValue = detector.offsetHeight;

        this.fsListen();
    }

    //Event handler
    this.changed = function( /*function*/ listener )
    {
        if (typeof listener == 'function')
            listeners.push(listener);
    }

    //Remove event handler
    this.unbind = function( /*function*/ listener )
    {
        if (typeof listener != 'undefined') //optional argument
        {
            //Find the listener and remove it
            for (i in listeners)
            {
                if (listener == listeners[i])
                {
                    listeners.splice(i, 1);
                    break;
                }
            }
        }
        else
        {
            //Remove all listeners
            listeners = [];
        }
    }

    //Call refresh on an interval
    this.fsListen = function()
    {
        this.refresh();
        setTimeout(function()
        {
            obj.fsListen();
        }, this.refreshRate);
    }

    //Check if detector is a different size
    this.refresh = function()
    {
        var value = detector.offsetHeight;
        if (value != this.lastValue)
        {
            //If it has changed called the listeners
            for (i in listeners)
            {
                var listener = listeners[i];
                listener({
                    oldValue: this.lastValue,
                    newValue: value
                });
            }
            this.lastValue = value;
        }
    }

    //add event utility
    var addEvent = function(opt)
    {
        var el = opt.element;

        if (el.addEventListener)                     // For all major browsers, except IE 8 and earlier
            el.addEventListener(opt.on, opt.action);
        else if (el.attachEvent)                  // For IE 8 and earlier versions
            el.attachEvent("on"+opt.on, opt.action);
    }

    /* Construct when the window loads */
    var obj = this;
    addEvent
    ({
        element: window,
        on: 'load',
        action: function(e)
        {
            obj.construct();
        }
    });
})();
