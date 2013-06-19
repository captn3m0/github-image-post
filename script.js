document.getElementById('file').addEventListener('change', function(e){
	var files=e.target.files;
	var reader = new FileReader();
	reader.readAsBinaryString(files[0]);
	reader.onloadend=function(f){
		var binaryData=f.target.result;
	};
$('#submit').click(function(){
  var username=$('#username').val();
  var password=$('#password').val();
  //create a new Github object;
  var github = new Github({
	  username: username,
	  password: password,
	  auth: "basic"
	});
	var user = github.getUser();
	user.repos(function(err, repos) {
		for(i in repos){
			$('#repos').append("<option value='"+repos[i].full_name+"'>"+repos[i].name+"</option>");
		}
	});
});