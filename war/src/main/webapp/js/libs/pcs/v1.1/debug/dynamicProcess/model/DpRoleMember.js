/**
 * Created by sheshash on 3/24/2017.
 */

define(function() {
    'use strict';
    return function(data) {

    	data.toString = data.id + data.memberName + data.memberType;

        return {
            data: data,
            toString: function() {
                return data.toString;
            },
            getId: function() {
                return data.id;
            },
            getMemberName: function() {
                return data.memberName;
            },
            getMemberType: function() {
                return data.memberType;
            }
        };
    };

});
