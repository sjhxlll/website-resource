$(".dza").click(function(){
	var dzan = $(this);
	var id = dzan.attr("rel"); //对应id
	$.ajax({
		type:"POST",
		url:"handle.php",
		data:"id="+id,
		cache:false, //不缓存此页面
		success:function(data){
			dzan.parent().find('.dianzan').text('赞'+data);
			dzan.fadeIn(300);
		}
	});
	var dzbtn = document.getElementById($(this).find('.glyphicon-thumbs-up').attr("id"));
	dzbtn.style.color = "#018EE8";
	return false;
	exit();
});