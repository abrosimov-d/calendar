class App {
	constructor() {

	}

	addDay(date) {
		let result = new Date(date);
		result.setDate(result.getDate() + 1)
		return result;
	}

	render() {
		let current = new Date();
		let html = ''
		for (let i = 0; i <= 365; i++) {
			html = html + current.getDate() + ' ';
			if (current.getDay() == 0)
				html = html + '<br>';
			current = this.addDay(current)
		}
		return `<div>${html}</div>`
	}
}


window.onload = () => {
	//console.log('onload()');
	let app = new App();
	let appElement = document.querySelector('.app');
	appElement.innerHTML = app.render();
}