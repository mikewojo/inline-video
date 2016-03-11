/*!
 * mobile-inline-video.js - Play inline videos on mobile devices
 * https://github.com/mikewojo/mobile-inline-video
 */

var MIV = (function() {
	var items = {};

	//Make a new inline video
	this.new = function(options) {
		var options,
			src = options && typeof options.src == 'string' ? options.src : null,
			id = options && typeof options.id == 'string' ? options.id : 'video' + rand(1111111, 9999999),
			w = options && typeof options.width == 'number' ? options.width : 0,
			h = options && typeof options.height == 'number' ? options.height : 0;

		if(src == null)
			return console.log('Cannot add video, not a valid src');

		var vid = new Inline(src, w, h);
		items[id] = vid;
		return vid;
	}

	//Get a previously added video
	this.get = function(id) {
		if(typeof items[id] == 'object')
			return items[id];
		else
			return false;
	}

	//The video class
	function Inline(src, w, h) {
		var src, raf,
			w = typeof w == 'number' ? w : 0,
			h = typeof h == 'number' ? h : 0,
			audio = document.createElement('audio'),
			video = document.createElement('video'),
			canvas = document.createElement('canvas'),
			context = typeof canvas.getContext == 'function' ? canvas.getContext('2d') : null,
			ready = 0;

		function init() {
			audio.addEventListener('canplaythrough', start);
			video.addEventListener('canplaythrough', start);
			context.font = '25px sans-serif';
			context.textAlign = 'center';
			context.fillStyle = 'rgba(0, 0, 0, .5)';
		}

		function setDims() {
			w = typeof video.videoWidth == 'number' && w == 0 ? video.videoWidth : w;
			h = typeof video.videoHeight == 'number' && h == 0 ? video.videoHeight : h;
			if(w == 0 && h == 0)
				return false;
			canvas.setAttribute('width', w + 'px');
			canvas.setAttribute('height', h + 'px');
			canvas.style.width = w + 'px';
			canvas.style.height = h + 'px';
			context.fillText('Loading...', w / 2, h / 2);
		}

		function update() {
			video.currentTime = audio.currentTime;
			context.drawImage(video, 0, 0, w, h);
			raf = requestAnimationFrame(update);
		}

		function start() {
			if(ready == 2)
				return false;
			ready++;
			setDims();
			if(ready == 2) {
				update();
				audio.play();
			}
		}

		this.start = function() {
			if(ready == 2) {
				audio.play();
				return update();
			}
			audio.src = video.src = src;
			audio.load();
			video.load();
			setDims();
		}

		this.play = this.start;

		this.pause = function() {
			if(ready == 2) {
				audio.pause();
				update();
			}
		}

		this.seek = function(time) {
			if(ready == 2) {
				var time = typeof time == 'number' && time <= video.duration ? time : 0;
				audio.play();
				audio.currentTime = time;
				update();
			}
		}

		this.appendTo = function(el) {
			var el = typeof el == 'object' ? el : document.body;
			el.appendChild(canvas);
		}

		init();
	}

	//Generate a random number
	function rand(e, t) {
    return e == t ? e : Math.floor(Math.random() * (t - e + 1)) + e;
	}

	return this;
})();
