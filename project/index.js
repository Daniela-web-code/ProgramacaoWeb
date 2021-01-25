var endereco = 'https://api.unsplash.com/'
var chaveAPI = '&client_id=dd4e1cb73ca3a1036d4e98d26f72a439141dc17039e1ae79b7bc2a23f3488578'
var carregamento = endereco+ "photos?order_by=latest" + chaveAPI;


function carregar(){
	$.ajax({
	  	url : carregamento,
	  	type:"get",
	  	async: true,
       success : function(data, status, response) {
        adicionarFotos(data);
       }
   });    
  }
      
  
function adicionarFotos(data) {
     var arrayDeFotos = data;

     for (var i=0; i<arrayDeFotos.length; i++) {
      var foto = arrayDeFotos[i];
      criarFoto(foto);
}

function criarFoto(foto) {

  // criar h5
  var h5 = document.createElement("h5");
  h5.className = "card-title";
  h5.innerText = foto.user.name;

  // criar div filha
  var div = document.createElement("div");
  div.className = "card-body";
  div.appendChild(h5);
  
  // criar img
  var img = document.createElement("img");
  img.className = "card-img-top";
  var imgSrc = foto.urls.full;
  img.setAttribute("src", imgSrc);

  // criar div pai
  var divPrincipal = document.createElement("div");
  divPrincipal.className = "card col-3";
  divPrincipal.appendChild(img);
  divPrincipal.appendChild(div);

  // adicionar div pai à pagina/DOM
  var container = document.getElementById("contentorFilmes");
  container.appendChild(divPrincipal);
}


}

   function programarCarregamentoPagina() {
    $(window).on("load", carregar);
  }



programarCarregamentoPagina();
