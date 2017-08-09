class CSS {
	constructor() {
		this.sheet = document.createElement('style');
		this.sheet.type = 'text/css';
		document.body.appendChild(this.sheet);
	}

	addRule = (rule) => {
		this.sheet.innerHTML += rule;
	}
}

export default new CSS();
