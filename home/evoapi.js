
var url = "https://evo-integracao.w12app.com.br/api/v1/members/",
credentials = btoa("raiaracademia:4EB76A8B-D8F3-450E-ADFC-08BAECACDFE7");

var first = true;

var profsHTML = [];
async function GetSugg(nProf){
  var tam50 = true
  document.querySelector("#listAlunos").innerHTML = ''
  document.querySelector("#MA").innerHTML = "Carregando..."
  for(let j = 0; tam50; j+=50){
  console.log("working")
  var res = await axios.get(url,{
    params:{
      name:"",
      skip:j,
      status:1
    },
    headers:{
      "Authorization": `Basic ${credentials}` 
    }
  })
  var html = ""
  if(res.data.length!= 50){
    tam50 = false
  }
  for(let i = 0; i<res.data.length;i++){
    var anonasc = 2023;
    if(res.data[i].birthDate != null){
      anonasc = parseInt(res.data[i].birthDate.slice(0,4));
    }
    if(anonasc>2010){ 
      if(res.data[i].idEmployeeInstructor == nProf){
        console.log(res.data[i].idEmployeeInstructor)
        document.querySelector("#MA").innerHTML = "Alunos de " + res.data[i].nameEmployeeInstructor
    var photoUrl = res.data[i].photoUrl
    if(res.data[i].photoUrl==null){
      var photoUrl = "user-exemplo.jpeg"
    }
    var sugNome = res.data[i].firstName+" "+res.data[i].lastName
    console.log(sugNome, res.data[i].idMember);
    html += `<div id="alunoBox">
    <img id='imagemAluno' src="${photoUrl}" alt="foto aluno">
    <div id="dadosAl">
    <li id="nomeAl">${sugNome}</li>
    <div>
      <p id="infAl">Id: ${res.data[i].idMember} | ${GetLastAcess(res.data[i])} | Nível: Lambari</p>
      </div>
      <button id="AvaBtn" onclick="DisplayAv('${sugNome}', ${res.data[i].idMember})">Nova avaliação</button>
      </div>
    </div>`
  }}}
  document.querySelector('ul').innerHTML += html
  }
  first = false;
}


var profIdInput = document.querySelector("#profIdInput");
var BuscarIBtn = document.querySelector("#BuscarIBtn");
BuscarIBtn.addEventListener("click", () => {
  console.log(parseInt(profIdInput.value));
  GetSugg(parseInt(profIdInput.value));
  document.querySelector("#MA").style.display = "block" 
  document.querySelector("#SelProf").style.display = "none"
})


function GetLastAcess(data){
  var hora, stringDia;
  var dayName = new Array ("Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"); 
  if(data.lastAccessDate == null){
    stringDia = "Não Identificado"
  }
  else{
    var now = new Date(data.lastAccessDate.slice(0,4), data.lastAccessDate.slice(5,7) - 1, data.lastAccessDate.slice(8,10));
    hora =  data.lastAccessDate.slice(11,16);
    stringDia = `${data.lastAccessDate.slice(8,10)}/${data.lastAccessDate.slice(5,7)} ${dayName[now.getDay()]} - ${hora}`
  }
  return stringDia;
}