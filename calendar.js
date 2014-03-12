$().ready( function () {
	Calendar.init();
});

var Calendar = (function() {
	var months = ['January', 'February', 'March', 'April', 
					'May', 'June', 'July', 'August', 
					'September', 'October', 'November', 'December'
				];

	var today = new Date();
	var startingYear = today.getFullYear();
	var monthIndex = today.getMonth()
	var startingMonth = months[monthIndex];			

	var init = function() {
		//on page load the current calendar is shown
		generateYear(startingMonth, startingYear);
		getClicks();
	}

	var generateYear = function(month, year) {
		
		//static vars
		var monthLengths = [
		Array(31), Array(28), Array(31), Array(30), 
		Array(31), Array(30), Array(31), Array(31), 
		Array(30), Array(31), Array(30),Array(31)];

		var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		
		//array to be filled with dates/day names
		var thisMonth = [];

		//current info supplied by function call
		var dateInfo = new Date(month + ' 1, ' + year)
		var startMonth = dateInfo.getMonth()

		//length of the month determined by monthLenghts list
		var startMonthLenght = monthLengths[startMonth].length;

		var startDay = dateInfo.getDay()

		//these vars will be manipulated by for loops to fill thisMonth array
		var currentDay = 1;
		var dayIndex = 0;

		//generate first week of month
		for (var i = startDay; i <=6; i++) {
			thisMonth.push({'date': currentDay, 'day':daysOfWeek[i]})
			currentDay++
		}	
		for (var x = thisMonth.length+1; x <= startMonthLenght; x++) {
				thisMonth.push({'date': x, 'day': daysOfWeek[dayIndex]})
				currentDay++

				if (dayIndex < 6) {
					dayIndex++
				}

				else {
					dayIndex = 0;
				}
		}
		//startDay is used here to determine how many blank Divs are necessary
		//when displaying the calendar
		console.log(thisMonth)
		displayMonth(thisMonth, month, year, startDay)
	}

	var displayMonth = function(month, name, year, blankDivTotal) {
		//display Month Name
		$('.calendarHeader').text(name + " " + year)

		//accessing the calender div to insert the day divs
		var dayHolder = $('.dayHolder');
			dayHolder.empty();

		if (blankDivTotal != 7) {
			for (var x=0; x <=blankDivTotal-1; x++) {
				dayHolder.append('<div class="blankBox">')
			}
		}

		for (var i=0; i <= month.length-1; i++) {
			dayHolder.append('<div class="dayBox">'+ month[i].date+'</div>')
		}

	}

	var getClicks = function() {
		var arrowLeft = $('#arrowLeft');
		var arrowRight = $('#arrowRight');

		arrowLeft.on('click', function() {
			if (monthIndex > 0) {
				monthIndex--;	
			}

			else {
				monthIndex = 11
				startingYear--;
			}
			generateNewYear(startingYear)
		})

		arrowRight.on('click', function() {
			if (monthIndex < 11) {
				monthIndex++;	
			}

			else {
				monthIndex = 0
				startingYear++
			}
			generateNewYear(startingYear)
		})
	}

	var generateNewYear = function(startingYear) {
		var newMonth = months[monthIndex];	
		generateYear(newMonth, startingYear)
	}
	return {
		'init': init
	}

})();