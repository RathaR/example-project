$(function() {
	function reloadPage(){
		var url = window.location.href;
		var search = window.location.search;
		if(filter.length) {
			if(search) {
				window.location.href = url.substr(0, url.indexOf('?')) + '?filter=' + filter.join(',');
			} else {
				window.location.href += '?filter=' + filter.join(',');
			}
		} else {
			if(search) {
				window.location.href = url.substr(0, url.indexOf('?'));
			} else {
				window.location.reload();
			}
		}
	}

	var filter = [];

	var checkboxes = $('.filter input[type=checkbox]');

	checkboxes.each(function() {
		var checkbox = $(this);
		var manufacturer = checkbox.val();
		if(filter.indexOf(manufacturer) > -1) {
			checkbox.prop('checked', true);
		}
	});

	checkboxes.click(function () {

		var that = $(this);

		if (that.is(":checked")) {

			filter.push(that.val());
		}

		if(!that.is(":checked")) {

			if(filter.indexOf(that.val()) != -1){

				var index = filter.indexOf(that.val());

				filter.splice(index, 1);
			}
		}

	});

	$('.filter-btn').on('click', function (event) {
		event.preventDefault();
		var that = $(this);
		if(that.is('.apply')) {
			reloadPage(filter);
		}
		if(that.is('.clear')) {
			reloadPage();
		}
	})
});