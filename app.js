class WorkDate {
	constructor(date) {
		this.date = date;
	}
}

class App {
	constructor() {

	}

	addDays(date, days) {
		let result = new Date(date);
		result.setDate(result.getDate() + days)
		return result;
	}

	renderDay(day, workDay) {
		return `<div class="day;${workDay?'work-day':''}">${day}</div>`
	}

	renderWeek(html) {
		return `<div class="week">${html}</div>`
	}

	renderWeekNumber(weekNumber) {
		return `<div class="week-number">${weekNumber}</div>`
	}

	renderMonthTitle(month) {
		const months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 
		'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];

		return `<div class="month-title">${months[month]}</div>`
	}

	render() {
		let current = new Date('12 4 2023');
		let html = '';
		let week = '';
		let weekNumber = 1;
		let month = 0;
		let monthTitle = ''
		let counter = 0;
		for (let i = 0; i <= 365; i++) {			
			week = week + this.renderDay(current.getDate(), workDay) + ' ';

			if (current.getMonth() != month) {
				weekNumber = 1;
				month = current.getMonth()
				monthTitle = current.getMonth();
			}

			if (current.getDay() == 0) {
				week = this.renderWeekNumber(weekNumber) + week;
				if (weekNumber == 1) {
					week = week + this.renderMonthTitle(monthTitle);
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


window.onload = () => {
	//console.log('onload()');
	let app = new App();
	let appElement = document.querySelector('.app');
	appElement.innerHTML = app.render();
}