var endereco = 'https://api.unsplash.com/'
var chaveAPI = '&client_id=dd4e1cb73ca3a1036d4e98d26f72a439141dc17039e1ae79b7bc2a23f3488578'
var carregamento = endereco+ "photos?order_by=latest" + chaveAPI;


function carregar(){
	$.ajax({
	  	url : carregamento,
	  	type:"get",
	  	async: true,
       success : function(data, status, response) {
        adicionarFotos();
       }
   });    
  }
      
  
function adicionarFotos() {
     alert("Carreguei a pagina");
}

   function programarCarregamentoPagina() {
    $(window).on("load", carregar);
  }



programarCarregamentoPagina();
