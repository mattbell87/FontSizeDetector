# FontSizeDetector

This script is a JavaScript module that detects when the font size has changed. You can create a function to notify you every time the font is changed.

This is a self contained module, no external libraries are required to run it though it will run nicely beside one if you like!

## Usage Example

```javascript

FontSizeDetector.changed( function(e)
{
    //This code is run every time the font size has been changed
    console.log(e);
});

```

## What would this be used for?

If you've got a JavaScript file that detects and resizes accorinding to the screen size, you may also want to look at this. When a user changes their font size, be it through an older browser, a mobile browser or a plugin you may find that your script is breaking. I came across this when developing a carousel, everything worked fine until font size was changed!

## Isn't there something like this built in to the browser?

Nope, there's an onresize event for the Window however this does not get triggered when someone changes their font size. There may be plans to add this to future browsers.

## What if I want to unbind an event?

Sure, if you want to unbind an event that you've stored as a variable (eg. myFunction) just call this:

```javascript
FontSizeDetector.unbind( myFunction );
```

Or if you just want to unbind everything:

```javascript
FontSizeDetector.unbind();
```