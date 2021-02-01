var pagina = 1;

function carregar(){
  var endereco = 'https://api.unsplash.com/photos?orderby=lastest&per_page=24&page='
  var chaveAPI = '&client_id=dd4e1cb73ca3a1036d4e98d26f72a439141dc17039e1ae79b7bc2a23f3488578'
  var carregamento = endereco + pagina + chaveAPI;

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
  $('#container-images').empty();

  
  var arrayDeFotos = data;
  for (var i=0; i<arrayDeFotos.length; i++) {
    var foto = arrayDeFotos[i];
    criarFoto(foto);
  }
}

//falta adicionar a descriçao e formatar os tamanhos
function criarFoto(foto) {
  var i = document.createElement("i");
  i.className = "fas fa-download";


  // criar h5
  var h5 = document.createElement("h5");
  h5.className = "card-title";
  h5.innerText = foto.user.name;

  var divIcon = document.createElement("div");
  divIcon.className = "icon";
  divIcon.appendChild(i);

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
  divPrincipal.appendChild(divIcon);
  

  // adicionar div pai à pagina/DOM
  var container = document.getElementById("container-images");
  container.appendChild(divPrincipal);
}

function procurar() {
  var inputText = document.getElementById("inputText");
  if(inputText.value == "") {
    alert("campo vazio")
  }
  else {
    alert(inputText.value)
  }

}

function anterior() {
  if (pagina == 1) {
    document.getElementById("previous").disabled = true;
    document.getElementById("next").disabled = false;
    alert("ESTOU AQUI");
  }
    
  else {
    pagina--;
    carregar();
  }
}


function seguinte() {
  var fotos = data.total_photos;
 
  if (pagina == fotos) {
    document.getElementById("previous").disabled = false;
    document.getElementById("next").disabled = true;
    alert("ESTOU AQUI");
  }

  else {
    pagina++;
    carregar();
  }

}


function programarBotoesPaginacao() {
  var botaoAnterior = document.getElementById("previous");
  var botaoSeguinte = document.getElementById("next");

  botaoAnterior.addEventListener("click", anterior);
  botaoSeguinte.addEventListener("click", seguinte);
}

function programarCarregamentoPagina() {
  $(window).on("load", carregar);
}

function programarBotaoSearch() {
  $('#searchButton').on("click", procurar);
}

programarCarregamentoPagina();
programarBotaoSearch();
programarBotoesPaginacao();
