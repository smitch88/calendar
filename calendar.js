$().ready( function () {
	Calendar.init();
});

var Calendar = (function() {

	var init = function() {
		generateYear('January', 2014);
	}

	var generateYear = function(month, year) {
		
		//static vars
		var monthLengths = [
		Array(31), Array(29), Array(31), Array(30), 
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

		for (var x = thisMonth.length+1; x <= 31; x++) {
				thisMonth.push({'date': x, 'day': daysOfWeek[dayIndex]})
				currentDay++

				if (dayIndex < 6) {
					dayIndex++
				}

				else {
					dayIndex = 0;
				}
		}
		console.log(thisMonth)
	}

	return {
		'init': init
	}

})();