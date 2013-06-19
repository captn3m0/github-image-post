document.getElementById('file').addEventListener('change', function(e){
	var files=e.target.files;
	window.fileName=files[0].name;
	var reader = new FileReader();
	reader.readAsDataURL(files[0]);
	reader.onloadend=function(f){
		window.imageData=f.target.result.slice(22);
	};
});
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
			$('#repos').append("<option value='"+repos[i].name+"'>"+repos[i].name+"</option>").show();
		}
	});
	$('#submit2').click(function(){
		var repo = github.getRepo(username,$('#repos').val());
		var path="images/"+window.fileName;
		repo.read("master", path, function(err, contents){
			if(err){
				//Now we can upload safely
				repo.write('master',path, window.imageData, 'Uploaded an image.', 'base64',function(err) {
					if(!err)
						alert("File uploaded.");
					else
						alert(err);
					repo.write("master","README2.md","This is an experiment to test image uploads (in JS) using github API.","Updated README","utf-8",function(err){
						if(err)
							alert(err);
					})
				});
			}
			else{
				alert("File already exists with that name. Please rename and try again");
			}
		});
	})
});