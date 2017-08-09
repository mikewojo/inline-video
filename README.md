# InlineVideo.js

- Play video inline on iOS Safari without opening the native player
- Uses native `playsinline` support for iOS 10 and up
- Falls back to regular HTML5 video for all other cases
- Doesn't need canvas

## How does it work?

For iOS devices below iOS 10 without native `playsinline` support, an audio element is created with the video's source, the audio is played, and `requestAnimationFrame` is used to sync the video's `currentTime` to the audio's. Even though the video itself isn't playing, when the `currentTime` is updated, the video's current frame is updated and it appears to be playing as normal in sync with the actually playing audio.

For iOS devices >= iOS 10, the `playsinline` attribute is added for native inline playback.

For all other cases, a regular HTML5 video player is used.

## Usage

You can...

**Import it:**<br>
`import InlineVideo from './InlineVideo';`

**Or include it as a script:**<br>
`<script type="text/javascript" src="InlineVideo.min.js"></script>`

...etc.

### Make an InlineVideo player:
```
let video = new InlineVideo({
	src: 'http://www.w3schools.com/html/mov_bbb.mp4', // url of video
	parent: '#video', // where to append the video
	debug: true // optionally show some console logs
});
```

### Options
- **src** - URL of the video
- **parent** - An element to append the video to. Can be a string or object.
- _width_ - Force video width
- _height_ - Force video height
- _debug_ - Show some console logs to see which player ends up being used
- _onPlay_ - Called when video is played
- _onPause_ - Called when video is paused
- _onEnded_ - Called when video has ended

### Methods
- `.play()` - Play the video
- `.pause()` - Pause the video
- `.seek(time)` - Seek to a specified time

## Thanks

This library was adapted and expanded from a solution by [Kyle](http://stackoverflow.com/a/35758712). :+1:
