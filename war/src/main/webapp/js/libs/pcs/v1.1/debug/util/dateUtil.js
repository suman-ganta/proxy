/**
 * Created by nisabhar on 11/7/17.
 */

define(['knockout', 'ojs/ojcore', 'jquery','ojs/ojdatetimepicker'], function(ko, oj, $) {
	'use strict';


	/**
	 * ,method to convert time in string
	 * @param millisecs
	 * @returns {string}
	 */
	var _getTimeDurationTxt = function (millisecs) {

		if (!millisecs){
			return '';
		}

		var durationTxt = '';
		// get total seconds between the times
		var delta = Math.abs(millisecs) / 1000;

		// calculate (and subtract) whole days
		var days = Math.floor(delta / 86400);
		delta -= days * 86400;
		durationTxt = days > 0 ? durationTxt + days + 'd ' : durationTxt;

		// calculate (and subtract) whole hours
		var hours = Math.floor(delta / 3600) % 24;
		delta -= hours * 3600;
		durationTxt = hours > 0 ? durationTxt + hours + 'h ' : durationTxt;

		// calculate (and subtract) whole minutes
		var minutes = Math.floor(delta / 60) % 60;
		delta -= minutes * 60;
		durationTxt = minutes > 0 ? durationTxt + minutes + 'm' : durationTxt;

		if (durationTxt === ''){
			var seconds = Math.floor(delta);
			durationTxt = seconds + 's';
		}

		return durationTxt;
	};

	/**
	 * Convert the given utc date to user timezone
	 * @param utcDate
	 */
	var _getDateInUserTimezone = function(utcDate){
		if(!utcDate){
			return null;
		}

		var date;
		if (typeof utcDate === 'string' || typeof utcDate === 'number'){
			//string format or longTime format
			date = new Date(utcDate)
		}else if(utcDate instanceof Date){
			date = utcDate;
		}else{
			return utcDate;
		}

		var convertedDate = oj.IntlConverterUtils.dateToLocalIso(date);

		return convertedDate;
	};


	/**
	 * convert the requested date in the given pattern, do not change the timezone
	 * @param requestedDate
	 * @param datePattern
	 * @returns {string}
	 */
	var _getFormattedDate =  function (requestedDate, datePattern) {
		if(!requestedDate || requestedDate === ''){
			return '';
		}
		var pattern = datePattern ? datePattern : 'MMM dd yyyy, hh:mm a';
		var dateOptions = {
			pattern: pattern
		};
		var dateConverter = oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter(dateOptions);

		return dateConverter.format(requestedDate);
	};


	/**
	* method to convert
	* @param userDate
	* @returns {Date}
	*/
	var _getDateStingInUTCTimezone= function(userDate){

		var date;
		if (typeof userDate === 'string' || typeof userDate === 'number'){
			//string format or longTime format
			date = new Date(userDate)
		}else if(userDate instanceof Date){
			date = userDate;
		}else{
			return userDate.toString();
		}

		date =date.toISOString();

		return date;
	};


	/**
	 * custom handlers to convert date pattern
	 * @type {{update: update}}
	 */
	ko.bindingHandlers.pcsFormatDate = {
		update: function(element, valueAccessor, allBindings) {
			var valueUnwrapped = ko.unwrap(valueAccessor());

			if (!valueUnwrapped) {
				return;
			}

			var formattedValue = _getFormattedDate (valueUnwrapped, allBindings().datePattern);

			ko.bindingHandlers.text.update(element, function() {
				return formattedValue;
			});
		}
	};


	return {

		getTimeDurationTxt : _getTimeDurationTxt,

		getDateInUserTimezone: _getDateInUserTimezone,

		getFormattedDate : _getFormattedDate,

		getDateStingInUTCTimezone: _getDateStingInUTCTimezone
	};
});
