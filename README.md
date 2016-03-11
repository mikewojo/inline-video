# mobile-inline-video :ok_hand:

A tiny, dependency-free library to let you play inline video on mobile devices like iPhone without opening the native player.

## Usage

### Include the JS:
`<script type="text/javascript" src="mobile-inline-video.js"></script>`

### Make a new MIV (mobile inline video) object:
`var vid = MIV.new({src: 'http://www.w3schools.com/html/mov_bbb.mp4', id: 'test'});`

A new MIV object can have the following parameters:
- **src** - URL to the video
- _id_ (optional) - ID name to give the object if you want to reference it with MIV.get() later
- _width_ (optional) - Force a width on the video
- _height_ (optional) - Force a height on the video

### Append the object to your page:
```
//Append to body of page (default)
vid.appendTo();

//Append to an element with the "video" id
vid.appendTo(document.getElementById('video'));
```

### Play/start the video:

Please note, for iOS devices, this needs to be initiated from a click event.

```
document.getElementById('playButton').onclick = function() {
	vid.play();
	// or...
	// vid.start();
};
```

### Controlling the video:

```
//Play
document.getElementById('playButton').onclick = function() {
	vid.play();
};

//Pause
document.getElementById('pauseButton').onclick = function() {
	vid.pause();
};

//Seek to 4 seconds in
document.getElementById('seekButton').onclick = function() {
	vid.seek(4);
};
```

## Thanks

This library was adapted and expanded from a solution by [Kyle](http://stackoverflow.com/a/35758712). :+1:
