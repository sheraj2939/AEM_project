$(document).ready(function () {
	var urlObj = getURLParams();
	if (urlObj.product) {
		let urlHl = '';
		if (urlObj.product.toUpperCase() == 'HL') {
			$('.banner-video-btn').removeClass('d-none');
			urlHl = $('[data-videourl]').attr('data-hl');
			$('[data-videourl]').attr('data-videourl', urlHl);
		}
		else if (urlObj.product.toUpperCase() == 'TWL') {
			$('.banner-video-btn').removeClass('d-none');
			urlHl = $('[data-videourl]').attr('data-twl');
			$('[data-videourl]').attr('data-videourl', urlHl);
		}
		else if (urlObj.product.toUpperCase() == 'BL') {
			$('.banner-video-btn').removeClass('d-none');
			urlHl = $('[data-videourl]').attr('data-bl');
			$('[data-videourl]').attr('data-videourl', urlHl);
		} else {
			urlHl = $('[data-videourl]').attr('data-videourl');
			$('[data-videourl]').attr('data-videourl', urlHl);
		}
	}
	$('.jsGetCampValue li a').click(function () {
		var getCampVal = $(this).text();
		$(this).parents('.new-dropdown-search').find('[data-multiselect]').text(getCampVal);
		$(this).parents('.new-dropdown-search').find('[data-multiselect]').removeClass('active');
		$(this).parents('.jsMultiDropdown').removeClass('show');
		$(this).parents('.new-dropdown-search').removeClass('show');
	})

	$('.new-dropdown-search [data-multiselect]').click(function () {
		$(this).parents('.new-dropdown-search').find('.jsSearchInput').val('');
		$(this).parents('.new-dropdown-search').find('.select-item').removeAttr('style');
	})

	$('.js-down').on('click', function (e) {
		e.preventDefault();
		var target = this.hash;
		var $target = $(target);
		$('html, body').stop().animate({
			'scrollTop': $target.offset().top - 55
		}, 100, 'swing', function () {
		});
	});
	$('#videoPlay').click(function(e){
		var video=$(this).data('videourl');
		$('#videoIframe').attr('src',video);
	})

	function getURLParams(url) {
		var queryParams = {};
		try {
			url = url ? url : window.location.search;
			url.split("?")[1].split("&").forEach(function (pair) {
				var key = pair.split("=")[0];
				var val = pair.split("=")[1];
				queryParams[key] = val;
			});
		}
		catch (err) { return "" }
		return queryParams;
	}

	var urlParams = getURLParams(location.href);

	var products = document.querySelectorAll('[data-product]');
	products.forEach(function (e) {
		if (urlParams.subsource && !urlParams.cid) {
			if ($(e).attr('data-product') == "PL") {
				var existingURL = $(e).attr('href');
				e.href = existingURL.split('#!')[0] + "?sourceName=" + urlParams.subsource + "#!";

			}
			else if ($(e).attr('data-product') == "BL") {
				var existingURL = $(e).attr('href');
				e.href = existingURL.split('#!')[0] + "?sourceName=" + urlParams.subsource + "#!";

			}
			else if ($(e).attr('data-product') == "HL") {
				var existingURL = $(e).attr('href');
				e.href = existingURL.split('#!')[0] + "?sub_source_1=" + urlParams.subsource + "#!";

			}
			else if ($(e).attr('data-product') == "LAP") {
				var existingURL = $(e).attr('href');
				e.href = existingURL.split('#!')[0] + "?subsource=" + urlParams.subsource + "#!";

			}
			else if ($(e).attr('data-product') == "LAS") {
				var existingURL = $(e).attr('href');
				e.href = existingURL.split('#!')[0] + "?sourceName=" + urlParams.subsource + "#!";

			}
			else if ($(e).attr('data-product') == "OP") {
				var existingURL = $(e).attr('href');
				e.href = existingURL + "?subsource=" + urlParams.subsource;
			}
		}
		else if (urlParams.cid && !urlParams.subsource) {
			if ($(e).attr('data-product') == "PL") {
				var existingURL = $(e).attr('href');
				e.href = existingURL.split('#!')[0] + "?cid=" + urlParams.cid + "#!";
			}
			if ($(e).attr('data-product') == "BL") {
				var existingURL = $(e).attr('href');
				e.href = existingURL.split('#!')[0] + "?cid=" + urlParams.cid + "#!";
			}
			else if ($(e).attr('data-product') == "HL") {
				var existingURL = $(e).attr('href');
				e.href = existingURL.split('#!')[0] + "?cid" + urlParams.cid + "#!";
			}
			else if ($(e).attr('data-product') == "LAP") {
				var existingURL = $(e).attr('href');
				e.href = existingURL.split('#!')[0] + "?cid=" + urlParams.cid + "#!";

			}
			else if ($(e).attr('data-product') == "LAS") {
				var existingURL = $(e).attr('href');
				e.href = existingURL.split('#!')[0] + "?cid=" + urlParams.cid + "#!";

			}
			else if ($(e).attr('data-product') == "OP") {
				var existingURL = $(e).attr('href');
				e.href = existingURL + "?cid=" + urlParams.cid;
			}
		}
		else if (urlParams.subsource && urlParams.cid) {
			if ($(e).attr('data-product') == "PL") {
				var existingURL = $(e).attr('href').split('#!')[0];
				e.href = existingURL + "?sourceName=" + urlParams.subsource + "&cid=" + urlParams.cid + "#!";
			}
			if ($(e).attr('data-product') == "BL") {
				var existingURL = $(e).attr('href').split('#!')[0];
				e.href = existingURL + "?sourceName=" + urlParams.subsource + "&cid=" + urlParams.cid + "#!";
			}
			else if ($(e).attr('data-product') == "HL") {
				var existingURL = $(e).attr('href').split('#!')[0];
				e.href = existingURL + "?sub_source_1=" + urlParams.subsource + "&cid=" + urlParams.cid + "#!";
			}
			else if ($(e).attr('data-product') == "LAP") {
				var existingURL = $(e).attr('href');
				e.href = existingURL + "?subsource=" + urlParams.subsource + "&cid=" + urlParams.cid + "#!";

			}
			else if ($(e).attr('data-product') == "LAS") {
				var existingURL = $(e).attr('href');
				e.href = existingURL + "?sourceName=" + urlParams.subsource + "&cid=" + urlParams.cid + "#!";

			}
			else if ($(e).attr('data-product') == "OP") {
				var existingURL = $(e).attr('href');
				e.href = existingURL + "?subsource=" + urlParams.subsource + "&cid=" + urlParams.cid;
			}
		}
	});

	function getURLParams(url) {
		var queryParams = {};
		try {
			url = url ? url : window.location.search;
			url.split("?")[1].split("&").forEach(function (pair) {
				var key = pair.split("=")[0];
				var val = pair.split("=")[1];
				queryParams[key] = val;
			});
		}
		catch (err) { return "" }
		return queryParams;
	}
});
