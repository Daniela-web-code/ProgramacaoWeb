let paginaAtual = 1;
let totalPaginas = 1;
var enderecoInicial = 'https://api.unsplash.com/photos?orderby=lastest';
var enderecoProcura = 'https://api.unsplash.com/search/photos?query=';
var chaveAPI = '&per_page=24&client_id=JEaif-1am7vWMlyOPLxudsimoffeja7ddH8WM8xmt1w';
var pagina = '&page='
var enderecoTotal;
let trigger;




function carregar() 
{ 
  enderecoTotal = enderecoInicial +  chaveAPI;

  $.ajax(
  {
    url : enderecoTotal,
    type:"get",
    async: true,
    success : function(data, status, response) 
    {    
      adicionarFotos(data); 
      inativarPrevious();
      inativarNext(); 
    }
  });    
}


function procurar() 
{
  paginaAtual = 1;
  var inputText = document.getElementById("inputText");
  if(inputText.value == "") 
  { 
    var modal = $('#modal_list');
    modal.modal('show');
  }

  else
  { 
    var enderecoprocura = 'https://api.unsplash.com/search/photos?query=';
    var pagina = '&page='
    var chaveAPI = '&per_page=24&client_id=KKu0hH-tHt0kR5wLLl28sJpsyzYj8bZEOMtexV1L4Jc';
    var enderecoProcuraCompleto = enderecoprocura + inputText.value + pagina + paginaAtual + chaveAPI;
    $.ajax(
      {
        url : enderecoProcuraCompleto,
        type:"get",
        async: true,
        success : function(data, status, response) {
          if(data.results == 0) 
          {
            $('#container-images').empty();
              mostrarPagina0Results();
          }else
          {
            totalPaginas = data.total_pages;
            adicionarFotosProcura(data);   
            inativarPrevious();
            inativarNext();
          }   
      }
    });
    
  }
  
}

function nextPage() 
{
  var enderecoProcuraCompleto = enderecoProcura + inputText.value + pagina + paginaAtual + chaveAPI;
  $.ajax(
    {
      url : enderecoProcuraCompleto  ,
      type:"get",
      async: true,
      success : function(data, status, response)
        {
          if(data.results == 0) 
          {
            $('#container-images').empty();
              mostrarPagina0Results();
          }else
          {
            totalPaginas = data.total_pages;
            adicionarFotosProcura(data);   
          }   
        }
    });
}

function previousPage() 
{


      var enderecoProcuraCompleto = enderecoProcura + inputText.value + pagina + paginaAtual + chaveAPI;
      $.ajax(
        {
              url : enderecoProcuraCompleto  ,
              type:"get",
              async: true,
              success : function(data, status, response) {
                if(data.results == 0) 
                {
                  $('#container-images').empty();
                    mostrarPagina0Results();
                }else
                {
                  totalPaginas = data.total_pages;
                  adicionarFotosProcura(data);   
                }   
            }
          });
}



function mostrarPagina0Results() { // mostrar um 0 results, falta completar

  // alert("0 Results");
  var h5 = document.createElement("h5");
  h5.className = "card-title";
  h5.innerText = "Nothing to show here :/";

  var img = document.createElement("img");
  img.className = "card-img-top";
  var imgSrc = "https://www.psdgraphics.com/file/2016/metal-number-0.png";
  img.setAttribute("src", imgSrc);

  var h5_2 = document.createElement("h5");
  h5_2.className = "card-title";
  h5_2.innerText = "results";

  var divPrincipal = document.createElement("div");
  divPrincipal.className = "card col-3 ";
  divPrincipal.id = "foto";	
  divPrincipal.appendChild(h5);
  divPrincipal.appendChild(img);
  divPrincipal.appendChild(h5_2);

  // adicionar div pai à pagina/DOM
  var container = document.getElementById("container-images");
  container.appendChild(divPrincipal);

}  
  
function adicionarFotos(data) {
  $('#container-images').empty();

  var arrayDeFotos = data;
  for (var i=0; i<arrayDeFotos.length; i++) {
    var foto = arrayDeFotos[i];
    criarFoto(foto);
  }
}


function adicionarFotosProcura(data) {
  $('#container-images').empty();

  var arrayDeFotos = data;
  for (var i=0; i<arrayDeFotos.results.length; i++) {
    var foto = arrayDeFotos.results[i];
    criarFoto(foto);
  }
}


//falta adicionar a descriçao e formatar os tamanhos
function criarFoto(foto) {
  // criar icon
  var i = document.createElement("i");
  i.className = "fas fa-download";

  // criar download
  var a = document.createElement("a");
  a.className = "download";
  a.setAttribute("href", foto.urls.regular);
  a.target = "_blank";
  a.appendChild(i);

  // criar h5
  var h5 = document.createElement("h5");
  h5.className = "card-title";
  h5.innerText = foto.user.name;

  var descricao = document.createElement("p");
  descricao.className = "card-text";
  descricao.innerText = foto.description;

  // criar div icon
  var divIcon = document.createElement("div");
  divIcon.className = "download";
  divIcon.appendChild(a);

  // criar div filha
  var div = document.createElement("div");
  div.className = "card-body";
  div.appendChild(h5);
  if(foto.description !== null) 
    {
    div.appendChild(descricao);
  }
  

  // criar img
  var img = document.createElement("img");
  img.className = "card-img-top";
  var imgSrc = foto.urls.raw + "&fit=crop&w=500&h=500";
  img.setAttribute("src", imgSrc);

  // criar div pai
  var divPrincipal = document.createElement("div");
  divPrincipal.className = "card col-lg-3 col-md-4 col-sm-6 col-xs-12";
  divPrincipal.appendChild(img);
  divPrincipal.appendChild(div);
  divPrincipal.appendChild(divIcon);

  // adicionar div pai à pagina/DOM
  var container = document.getElementById("container-images");
  container.appendChild(divPrincipal);
}

function fecharModal() {
  var modal = $('#modal_list');
  modal.modal('hide'); 
}

function anterior(faseCarregamento) {//o parametro serve para diferenciar da pagina incial para procuras. para a pagina inicial quero usar o método carregar(), para pesquisas o procurar() | difere o url.
  paginaAtual --;
  //console.log(paginaAtual);
  previousPage();
  inativarPrevious();
  inativarNext();
}

function seguinte(faseCarregamento) { //o parametro serve para diferenciar da pagina incial para procuras. para a pagina inicial quero usar o método carregar(), para pesquisas o procurar() | difere o url.
  paginaAtual++;
  //console.log(paginaAtual);
  nextPage();
  inativarPrevious();
  inativarNext();
}

function inativarPrevious() {
  if (paginaAtual == 1) {
  $('#previous').attr("disabled", true);
  }
  else {
    $('#previous').removeAttr("disabled");
  }
}

function inativarNext() {
  if (paginaAtual == totalPaginas) {
  $('#next').attr("disabled", true);
  }
  else {
    $('#next').removeAttr("disabled");
  }
}


function programarBotaoClosemodal() {
  var botaoCloseModal = document.getElementById("botaoCloseModal");
  botaoCloseModal.addEventListener("click", fecharModal);
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
/*
function programarBotaoPrevious() {
  $('#previous').on("click", previousPage);
}
function programarBotaoNext() {
  $('#next').on("click", nextPage);
}
*/

programarCarregamentoPagina();
/*
programarBotaoNext();
programarBotaoPrevious();
*/
programarBotaoClosemodal();
programarBotoesPaginacao();
programarBotaoSearch();