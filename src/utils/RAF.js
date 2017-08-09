class RAF {
	setup = false;
	listeners = [];
	lastTime = 0;
	timer = {
		fps: 60,
		before: Date.now(),
		now: 0
	};

	constructor() {
		// start immediately
		this.prepare();
	}

	prepare() {
		let vendors = ['ms', 'moz', 'webkit', 'o'];

		for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
			window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
		}

		if (!window.requestAnimationFrame) {
			window.requestAnimationFrame = (callback, element) => {
				var currTime = new Date().getTime();
				var timeToCall = Math.max(0, 16 - (currTime - this.lastTime));
				var id = window.setTimeout(function() {
					callback(currTime + timeToCall);
				}, timeToCall);

				this.lastTime = currTime + timeToCall;
				return id;
			};
		}

		if (!window.cancelAnimationFrame) {
			window.cancelAnimationFrame = (id) => {
				clearTimeout(id);
			};
		}

		this.setup = true;
		this.onLoop();
	}

	onLoop() {
		// fps check
		this.timer.now = Date.now();
		let elapsed = this.timer.now - this.timer.before;

		if (elapsed > 1000 / this.timer.fps) {
			for (let x = 0; x < this.listeners.length; x++) {
				this.listeners[x]();
			};
		}

		this.timer.before = this.timer.now - (elapsed % (1000 / this.timer.fps));

		window.requestAnimationFrame(this.onLoop.bind(this));
	}

	add(fn) {
		this.listeners.push(fn);
	}

	remove(fn) {
		let cur = this.listeners.indexOf(fn);

		this.listeners.splice(cur, 1);
	}
}

export default new RAF();
