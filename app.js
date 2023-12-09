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

		return `<div class="month-title">${months[month].substring(0, 4)}'${year.substring(2, 4)}</div>`
	}

	render(smena, ud) {
		let current = new Date('12 4 2023');
		let html = '';
		let week = '';
		let weekNumber = 1;
		let month = 0;
		let monthTitle = ''
		let counter = smena + 1;
		let udCounter = 0;
		let summaryHTML = ''
		for (let i = 0; i <= 1000; i++) {			
			if (current.getMonth() != month) {
				weekNumber = 1;
				month = current.getMonth()
				monthTitle = current.getMonth();
			}

			let workDay = counter % 4 == 0;
			let udDay = (weekNumber % 2 == ud);
			if (workDay && udDay)
				udCounter++;
			week = week + this.renderDay(current.getDate(), workDay, udDay) + ' ';
			if (current.getDay() == 0) {
				week = this.renderWeekNumber(weekNumber) + week;
				if (weekNumber == 1) {
					week = week + this.renderMonthTitle(monthTitle, String(current.getFullYear()));
				}
				html = html +this.renderWeek(week);
				week = ''
				weekNumber++;
			}

			current = this.addDays(current, 1);
			counter++;
		}

		summaryHTML = `<div class="summary">${udCounter} дней на УД</div>`

		return `<div>${summaryHTML}${html}</div>`
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
		let calendarElement = document.querySelector('.calendar');
		calendarElement.innerHTML = this.calendar.render(smena, ud);
	}
}

window.onload = () => {
	let app = new App();
	app.render();
}