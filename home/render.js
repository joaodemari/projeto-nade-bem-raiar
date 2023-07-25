var relatorioAcompanhamento1 = [
    { area: "Adaptação ao Meio Líquido", n1: "Esta inseguro no meio líquido", n2: "Possui pequena insegurança, hesitante em realizar as atividades", n3: "Está adaptado(a) ao meio líquido" },
    { area: "Entrada na água", n1: "Entra na piscina com o auxílio do professor", n2: "Entra na piscina sem o auxílio do professor", n3: "Salta na piscina de diferentes formas" },
    { area: "Respiração", n1: "Faz 'bolinhas' pela boca", n2: "Faz 'bolinhas' pelo nariz - Realiza respiração aquática", n3: "Combina deslocamentos com respiração aquática" },
    { area: "Imersão", n1: "Não faz imersões - não coloca o rosto na água", n2: "Pequenas imersões - coloca o rosto em baixo d'água", n3: "Grande imersão - senta e toca a mão no fundo da piscina" },
    { area: "Flutuação Frente/Costas", n1: "Flutuação com ajuda (bóias e professor)", n2: "Flutuação com ajuda somente das bóias (frente - costas - grupado)", n3: "Flutuação sem ajuda (frente - costas - grupado)" },
    { area: "Braços", n1: "Início dos primeiros movimentos curtos de braço (cachorrinho)", n2: "Puxa a água em movimentos mais alongados", n3: "Início da recuperação do braço por fora d’água" },
    { area: "Pernas", n1: "Primeiros batimentos de pernas (Movimento de bicicleta)", n2: "Iniciação ao batimento de pernas (frente e costas)", n3: "Batimento com pernas retas (frente e costas)" },
    { area: "Deslocamento", n1: "Deslocamentos curtos com bóia e/ou professor", n2: "Desloca-se livremente com bóia", n3: "Desloca-se sem bóia (Atravessa a piscina sem bóias)" }
  ];
  
  var novaAvaliacao = document.querySelector("#novaAvaliacao");
  var areaTitulo = document.querySelector("#areaTitulo");
  var areas = document.querySelector("#areas");
  const template = document.querySelector("#areaTemplate");
  novaAvaliacao.style.display = "none"
  function getAlunos(){
  areas.innerHTML = "";
  for(let i=0; i<relatorioAcompanhamento1.length; i++){
    const div = template.content.cloneNode(true);
    div.querySelector("#areaTitulo").textContent = relatorioAcompanhamento1[i].area;
    cont=1
    for(value in relatorioAcompanhamento1[i]){
        console.log(value)
        if(value != "area"){
        var input = document.createElement("input");
        input.setAttribute("type","radio");
        input.setAttribute("name", `area ${i+1}`);
        input.setAttribute("value", cont)
        var label = document.createElement("label");
        label.innerText = `${cont}. ` + relatorioAcompanhamento1[i][value];
        div.appendChild(input);
        div.appendChild(label);
        div.appendChild(document.createElement("br"))
        cont++;
    }
    }
    console.log(relatorioAcompanhamento1[i].area)
    areas.appendChild(div);
  };
}



async function butAvaliar(){
  novaAvaliacao.style.display = "none"
  console.log("avaliando")

  var Notas = []
  var Passou = true
  for(let i=0; i<relatorioAcompanhamento1.length; i++){
    var nota = document.getElementsByName(`area ${i+1}`);
    for (var radio of nota){
      if (radio.checked) {    
        Notas[i] = parseInt(radio.value);
      }
      if(radio.value!=3){
        Passou = false
      }
      }       
  }
  const res = await axios.post('http://localhost:8000/',{
    nomeAluno:document.querySelector("#nomeAlAv").textContent, 
    idAluno:parseInt(document.querySelector("#idAlAv").textContent),
    Nivel:parseInt(document.querySelector("#nivelAlAv").textContent),
    Notas,
    Passou
    }
    )
  console.log(res);
}
var nomeAlAv = document.querySelector('#nomeAlAv');
var idAlAv = document.querySelector("#idAlAv");
function DisplayAv(nome, id){
  novaAvaliacao.style.display = "block"
  nomeAlAv.innerText = nome
  idAlAv.innerText = id
  getAlunos();
}