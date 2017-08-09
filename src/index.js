import RAF from './utils/RAF';
import CSS from './utils/CSS';

class InlineVideo {
	constructor({
		src = '',
		parent = document.body,
		width = 0,
		height = 0,
		debug = false,
		onPlay = function() {},
		onPause = function() {},
		onEnded = function() {}
	} = {}) {
		let userAgent = navigator.userAgent || navigator.vendor || window.opera;

		this.src = src;
		this.parent = typeof parent === 'string' ? document.querySelector(parent) : parent;
		this.width = width;
		this.height = height;
		this.debug = debug;
		this.onPlay = onPlay;
		this.onPause = onPause;
		this.onEnded = onEnded;
		this.audio = document.createElement('audio');
		this.video = document.createElement('video');
		this.states = {
			STARTING: 0,
			PREPPING: 1,
			READY: 2
		};
		this.state = this.states.STARTING;
		this.playing = false;
		this.raf = null;
		this.iOS = !!(/iPhone|iPod/.test(userAgent) && !window.MSStream);
		this.supportsInline = !!('playsInline' in this.video);
		this.useRAF = !!(this.iOS && !this.supportsInline);

		this.init();
	}

	init() {
		// audio and video events
		this.audio.addEventListener('canplay', this.prepAV.bind(this));
		this.video.addEventListener('canplay', this.prepAV.bind(this));

		// try loading video to get thumbnail and info
		this.audio.src = this.video.src = this.src;
		this.video.load();

		// append to parent
		this.parent.appendChild(this.video);

		// do we support inline play already?
		if (this.iOS && this.supportsInline && !this.useRAF) {
			this.log('[[ Using native inline player ]]');
			this.video.setAttribute('playsinline', true);
		}
		// otherwise, request animation frame
		if (this.useRAF) {
			this.log('[[ Added inline player support ]]');
			RAF.add(this.render.bind(this));
			this.audio.addEventListener('ended', this.ended.bind(this));
			this.addCSS();
		}	else {
			this.log('[[ Using regular HTML5 player ]]');
			// video ended event for both native inline and regular native players
			this.video.addEventListener('ended', this.ended.bind(this));
		}
	}

	addCSS() {
		// add class name to video
		this.video.classList.add('InlineVideo');

		// then rules that go with it
		CSS.addRule(`
			.InlineVideo::-webkit-media-controls-play-button,
			.InlineVideo::-webkit-media-controls-start-playback-button {
				pointer-events: none;
				opacity: 0;
			}
		`);
	}

	prepAV() {
		// don't do anything if it's already ready
		if (this.state === this.states.READY) {
			return false;
		}

		// otherwise
		this.state++;
		this.size();

		// ready now?
		if (this.state === this.states.READY && this.playing) {
			this.play();
		}

		return this;
	}

	size() {
		// update width and height to correct size
		this.width = typeof this.video.videoWidth === 'number' && this.width === 0 ? this.video.videoWidth : this.width;
		this.height = typeof this.video.videoHeight === 'number' && this.height === 0 ? this.video.videoHeight : this.height;

		// don't continue if zero sized
		if (this.width === 0 && this.height === 0) {
			return false;
		}

		// size
		this.video.setAttribute('width', this.width + 'px');
		this.video.setAttribute('height', this.height + 'px');

		return this;
	}

	render() {
		// sync unplaying video with playing audio
		this.video.currentTime = this.audio.currentTime;
	}

	load() {
		this.audio.load();
		this.size();

		return this;
	}

	play() {
		this.playing = true;
		this.video.classList.add('playing');

		this.onPlay();

		if (this.useRAF) {
			if (this.state === this.states.READY) {
				this.audio.play();
			} else {
				this.load();
			}
		} else {
			this.video.play();
		}

		return this;
	}

	pause() {
		this.onPause();

		if (this.useRAF) {
			if (this.state === this.states.READY) {
				this.audio.pause();
			}
		} else {
			this.video.pause();
		}

		this.playing = false;
		this.video.classList.remove('playing');

		return this;
	}

	ended() {
		this.video.classList.remove('playing');
		this.onEnded();
	}

	seek = (time = 0) => {
		if (this.video.duration > 0) {
			// time bounds
			time = typeof time === 'number' && time <= this.video.duration ? time : 0;

			// seek
			if (this.useRAF) {
				this.audio.currentTime = time;
			} else {
				this.video.currentTime = time;
			}
		}

		return this;
	}

	log = (message) => {
		if (this.debug) {
			console.log(message);
		}

		return this;
	}
}

export default InlineVideo;
