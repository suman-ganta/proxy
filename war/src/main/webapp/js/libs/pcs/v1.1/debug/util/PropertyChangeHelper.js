/**
 * Created by nisabhar on 2/6/18.
 */

define (['jquery'] , function ($) {
	'use strict';

	var _observe = function(composite, property, observable){
		var prop = property + '-changed';
		$(composite).on(prop, function(event)  {
			if(event.detail.updatedFrom === 'external'){
				observable(event.detail.value);
			}
		});
	};

	return {

		observe : _observe
	}
});
