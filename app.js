class WorkDate {
	constructor(date) {
		this.date = date;
	}
}

class Calendar {
	constructor() {

	}

	addDays(date, days) {
		let result = new Date(date);
		result.setDate(result.getDate() + days)
		return result;
	}

	renderDay(day, workDay, udDay) {
		return `<div class="day ${workDay?'work-day':''} ${workDay&&udDay?'ud':''}">${day}</div>`
	}

	renderWeek(html) {
		return `<div class="week">${html}</div>`
	}

	renderWeekNumber(weekNumber) {
		return `<div class="week-number">${weekNumber}</div>`
	}

	renderMonthTitle(month, year) {
		const months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 
		'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];

		return `<div class="month-title">${months[month]} ${year}</div>`
	}

	render(smena, ud) {
		let current = new Date('12 4 2023');
		let html = '';
		let week = '';
		let weekNumber = 1;
		let month = 0;
		let monthTitle = ''
		let counter = smena + 1;
		for (let i = 0; i <= 365; i++) {			
			week = week + this.renderDay(current.getDate(), (counter % 4 == 0), (weekNumber % 2 == ud)) + ' ';

			if (current.getMonth() != month) {
				weekNumber = 1;
				month = current.getMonth()
				monthTitle = current.getMonth();
			}

			if (current.getDay() == 0) {
				week = this.renderWeekNumber(weekNumber) + week;
				if (weekNumber == 1) {
					week = week + this.renderMonthTitle(monthTitle, current.getYear());
				}
				html = html +this.renderWeek(week);
				week = ''
				weekNumber++;
			}
			current = this.addDays(current, 1);
			counter++;
		}
		return `<div>${html}</div>`
	}
}

class App {
	constructor() {
		this.calendar = new Calendar();
		this.smenaSelect = document.querySelector('.smena-select');
		this.udSelect = document.querySelector('.ud-select');

		this.smenaSelect.addEventListener("change", () => {
			this.render();
		});

		this.udSelect.addEventListener("change", () => {
			this.render();
		});
	}

	render() {
		let smena = this.smenaSelect.selectedIndex;
		let ud = this.udSelect.selectedIndex;
		let appElement = document.querySelector('.app');
		appElement.innerHTML = this.calendar.render(smena, ud);
	}
}

window.onload = () => {
	//console.log('onload()');
	let app = new App();
	app.render();
}