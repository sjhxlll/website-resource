$(document).ready(function() {
		//获取选择文件名并显示
		var fileType = '';
		$( '.inputfile' ).each( function() {
	    var $input = $( this ),
	        $label = $input.next( 'label' ),
	        labelVal = $label.html();

	    $input.on( 'change', function( e ) {
	        var fileName = '';
	        if( this.files && this.files.length > 1 )
	            fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
	        else if( e.target.value )
	            fileName = e.target.value.split( '\\' ).pop();
	        	fileType = fileName.split( '.' ).pop(); //获取文件类型
	        if( fileName )
	            $label.html( fileName );
	        else
	            $label.html( labelVal );
	    });
	});

		$('#btn-byText').click(function() {
			var str = $('#text').val();
			if (str != "") {
				$('#p1').css('display', 'block');
				var arr = str.split('\n');
				$.each(arr, function(index, val) {
					//判断字符串第一位是否为数字
					 if ( !isNaN( val[0] ) ) {
					 	//是数字,切掉！
					 	arr[index] = val.substring(1, val.length);
					 };
				});
				$.post('../res/php/saveByText.php', {arr: arr}, function(data, textStatus, xhr) {
					//$('#test').html(data);
					//console.log(data);
					$('#p1').css('display', 'none');
$('#text').val("");
					var notification = document.querySelector('.mdl-js-snackbar');
						notification.MaterialSnackbar.showSnackbar(
						  {
						    message: '导入成功！'
						  }
						);
				});
			} else {
				var notification = document.querySelector('.mdl-js-snackbar');
						notification.MaterialSnackbar.showSnackbar(
						  {
						    message: '请输入！'
						  }
						);
			};

		});

		$('#btn-byTxtFile').click(function() {
			if (fileType != "" && fileType == "txt") {
				$('#p2').css('display', 'block');
				var formData = new FormData();
				formData.append('file', $('#file')[0].files[0]);
				$.ajax({
				    url: '../res/php/saveByFile.php',
				    type: 'POST',
				    cache: false,
				    data: formData,
				    processData: false,
				    contentType: false
				}).done(function(res) {
					$('#p2').css('display', 'none');
					//console.log(res);
					$('#test').html(res);
					var notification = document.querySelector('.mdl-js-snackbar');
					notification.MaterialSnackbar.showSnackbar(
					  {
					    message: '文件上传并处理成功！'
					  }
					);
				}).fail(function(res) {
					var notification = document.querySelector('.mdl-js-snackbar');
					notification.MaterialSnackbar.showSnackbar(
					  {
					    message: '文件上传失败！'
					  }
					);
				});
			} else {
				var notification = document.querySelector('.mdl-js-snackbar');
					notification.MaterialSnackbar.showSnackbar(
					  {
					    message: '请选择文件或txt文件类型！'
					  }
					);
			};
		});
});