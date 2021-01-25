function procura() {
  $.ajax({
    url : 'https://api.unsplash.com/photos?per_page=24&page=2&order_by=latest&client_id=dd4e1cb73ca3a1036d4e98d26f72a439141dc17039e1ae79b7bc2a23f3488578',
    type : "get",
    async: true,
    success : function(data, status, response) {
      adicionarFilmes(data);
    }
  });

function carregar(){
	$.ajax({
	  	url : https:'//api.unsplash.com/photos?order_by=latest',
	  	type:"get",
	  	async: true,
       success : function(data, status, response) {
       
       }
   });    
	  	

