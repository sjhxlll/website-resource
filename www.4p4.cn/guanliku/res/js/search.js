$(document).ready(function() {
	$('#loading').css('display', 'block');
	// $.get('res/php/ranDisplay.php',
	// 	function(data){
	// 		//$('main').html(data);
	// 		$('#loading').css('display', 'none');
	// 		$('main').html("");
	// 		var ranPost = eval("(" + data + ")");
	// 		output(ranPost);
	// 		$('.ranPost').css('float', 'none');
	// 		$('<div>').addClass('mdl-card__actions mdl-card--border btns').appendTo('.ranPost');
	// 		$('<button>').addClass('mdl-button mdl-js-button mdl-button--primary').attr('id', 'change').html("换一个").css({
	// 			display: 'block',
	// 			margin: '0 auto'
	// 		}).appendTo('.btns');
	// });

	// $.ajax({
	// 	url: 'res/php/ranDisplay.php',
	// 	type: 'GET',
	// 	dataType: 'josn',
	// 	//data: {param1: 'value1'},
	// 	success:function(data) {
	// 		var josn = data;
	// 		output(data);
	// 		$('.ranPost').css('float', 'none');
	// 		$('<div>').addClass('mdl-card__actions mdl-card--border btns').appendTo('.ranPost');
	// 		$('<button>').addClass('mdl-button mdl-js-button mdl-button--primary').attr('id', 'change').html("换一个").css({
	// 			display: 'block',
	// 			margin: '0 auto'
	// 		}).appendTo('.btns');
	// 	},
	// });

	$.ajax({
		url: 'res/php/ranDisplay.php',
		type: 'GET',
		dataType: 'json',
		data: {},
	})
	.complete(function(data) {
		// console.log(data);
		var josn = data.responseText;
		output(josn);
		$('#loading').css('display', 'none');
		$('.ranPost').css('float', 'none');
		$('<div>').addClass('mdl-card__actions mdl-card--border btns').appendTo('.ranPost');
		$('<button>').addClass('mdl-button mdl-js-button mdl-button--primary').attr('id', 'change').html("换一个").css({
			display: 'block',
			margin: '0 auto'
		}).appendTo('.btns');
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		//console.log("complete");
	});

	$.ajax({
		url: 'res/php/total.php',
		type: 'GET',
		dataType: 'html',
		data: {},
	})
	.done(function(data) {
		$("#count").text('已收录：'+data+'条惯例');
		console.log("success");
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});



	$('main').on('click', '#change', function(event) {
		$('#loading').css('display', 'block');
		event.preventDefault();
		$.ajax({
			url: 'res/php/ranDisplay.php',
			type: 'GET',
			dataType: 'json',
			data: {},
		})
		.complete(function(data) {
			//console.log(data);
			$('main').html("");
			var josn = data.responseText;
			output(josn);
			$('#loading').css('display', 'none');
			$('.ranPost').css('float', 'none');
			$('<div>').addClass('mdl-card__actions mdl-card--border btns').appendTo('.ranPost');
			$('<button>').addClass('mdl-button mdl-js-button mdl-button--primary').attr('id', 'change').html("换一个").css({
				display: 'block',
				margin: '0 auto'
			}).appendTo('.btns');
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			//console.log("complete");
		});
		// $.get('res/php/ranDisplay.php',
		// function(data){
		// 	//$('main').html(data);
		// 	$('#loading').css('display', 'none');
		// 	$('main').html("");
		// 	var ranPost = eval("(" + data + ")");
		// 	output(ranPost);
		// 	$('.ranPost').css('float', 'none');
		// 	$('<div>').addClass('mdl-card__actions mdl-card--border btns').appendTo('.ranPost');
		// 	$('<button>').addClass('mdl-button mdl-js-button mdl-button--primary').attr('id', 'change').html("换一个").css({
		// 		display: 'block',
		// 		margin: '0 auto'
		// 	}).appendTo('.btns');
		// });
	});

	$('#keywords').keyup(function(event) {
		if(event.keyCode ==13){
			var text = $('#keywords').val();
			var text_arr = "";
			//alert(text);
			if (text != "") {
				$('#loading').css('display', 'block');
				$('main').html("");

				$.ajax({
					url: 'res/php/search.php',
					type: 'POST',
					dataType: 'json',
					data: {text: text},
				})
				.complete(function(data) {
					// console.log(data);
					$('main').html("");
					var json = data.responseText;
					outputWaterfall(json);
					$('#loading').css('display', 'none');
				})
				.fail(function() {
					console.log("error");
				})
				.always(function() {
					//console.log("complete");
				});

				// $.post('res/php/search.php', {text: text}, function(data, textStatus, xhr) {
				// 	text_arr = eval("(" + data + ")");
				// 	$('#loading').css('display', 'none');
				// 	outputWaterfall(text_arr);
				// 	//output(text_arr);
				// 	//console.log(text_arr);
				// });

			} else {
				var notification = document.querySelector('.mdl-js-snackbar');
							notification.MaterialSnackbar.showSnackbar(
							  {
							    message: '请输入关键词！'
							  }
							);
			};
		}
	});

	$('#submit').click(function() {
		var text = $('#keywords').val();
		var text_arr = "";
		//alert(text);
		if (text != "") {
			$('#loading').css('display', 'block');
			$('main').html("");

			$.ajax({
					url: 'res/php/search.php',
					type: 'POST',
					dataType: 'json',
					data: {text: text},
				})
				.complete(function(data) {
					// console.log(data);
					$('main').html("");
					var json = data.responseText;
					outputWaterfall(json);
					$('#loading').css('display', 'none');
				})
				.fail(function() {
					console.log("error");
				})
				.always(function() {
					//console.log("complete");
				});
			// $.post('res/php/search.php', {text: text}, function(data, textStatus, xhr) {
			// 	text_arr = eval("(" + data + ")");
			// 	$('#loading').css('display', 'none');
			// 	outputWaterfall(text_arr);
			// 	//output(text_arr);
			// 	//console.log(text_arr);
			// });
		} else {
			var notification = document.querySelector('.mdl-js-snackbar');
						notification.MaterialSnackbar.showSnackbar(
						  {
						    message: '请输入关键词！'
						  }
						);
		};
	});

	function outputWaterfall(allPost) {
		var allPost = eval("(" + allPost + ")");
		$('<div>').attr('id', 'left').appendTo('main');
		$('<div>').attr('id', 'mid').appendTo('main');
		$('<div>').attr('id', 'right').appendTo('main');
		var count = 0;
		if (allPost == null) {
			$('main').html('<p style="text-align:center">没有找到你所要的内容，请换个关键词试试！</p>');
			return 0;
		}
		$.each(allPost, function(index, val) {
			if (count == 0) {
				count = 1;
				eachPost(index, val, "#left", "Post");
			} else if(count == 1) {
				count = 2;
				eachPost(index, val, "#mid", "Post");
			} else {
				count = 0;
				eachPost(index, val, "#right", "Post");
			}
			//eachPost(index, val, "main");
		});
	}

	function output(allPost) {
		var allPost = eval("(" + allPost + ")");
		$.each(allPost, function(index, val) {
			eachPost(index, val, "main", "ranPost");
		});
	}

	function eachPost(index, val, box, cl) {
		var i = 0;
		$('<div>').addClass('mdl-card mdl-shadow--2dp '+cl).attr('id', index).appendTo(box);
		var arr = val.toString().split('\|');
		if (arr.length > 1) {
			$.each(arr, function(i1, v1) {
				if (i == 0) {
					$('<div>').addClass('mdl-card__title mdl-card--border').html(v1).appendTo('#'+index);
					$('<div>').addClass('mdl-card__supporting-text').attr('id', "post"+index).appendTo('#'+index);
					i++;
				} else {
					$('<p>').html(v1).appendTo('#post'+index);
				}
			});
		} else {
			$('<div>').addClass('mdl-card__supporting-text').html(val).appendTo('#'+index);
		}
	}
});
