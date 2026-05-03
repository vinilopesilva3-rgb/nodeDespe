
const header=document.getElementById("header")

const hideNav=document.getElementById("voltar-nav")
const abrirNav=document.getElementById("abrir-nav")
hideNav.innerHTML='<img class="btn-FecharAbrir" src="icones/esquerdo.png">'

hideNav.addEventListener("click",()=>{
header.style.display="none";

hideNav.style.left="1rem"
hideNav.innerText=""

abrirNav.innerHTML='<img class="btn-FecharAbrir" src="icones/direito.png">'
abrirNav.style.left="1rem"

})

abrirNav.addEventListener("click",()=>{
header.style.display="block";
hideNav.style.left="14.5rem"

hideNav.innerHTML='<img class="btn-FecharAbrir" src="icones/esquerdo.png">'

abrirNav.innerText=""
abrirNav.style.left="1rem"
})





async function carregarDados() {
  const data=document.getElementById("data").value=new Date().toISOString().split('T')[0]
                      document.getElementById("maior-despesa").innerText="$0.00"

    const lista=document.getElementById('lista')
    lista.innerHTML=""

    const res= await fetch("http://127.0.1.1:4000/despesa")
    const dados=await res.json()
  

    const total=document.getElementById('total')
    total.innerHTML=""
 if(dados.length===0){
        lista.innerText="dd"
      }
       let maior=0
       
    dados.slice().reverse().forEach(u=>{

         let valorMaior=parseFloat(u.valor)

          if(valorMaior>maior){
            maior=valorMaior
           document.getElementById("maior-despesa").innerText="$"+maior.toFixed(2)
           document.getElementById('maior-categoria').innerText=u.categoria

          }

         
     
        const li=document.createElement('li')
        li.innerHTML=
        `
        <div class="card-section"  class="card">
        
        <div class="separar">
        <div class="content-categoria"><span>${u.categoria}</span></div>
        <div class="info"> 
        <span id="des" class="descricao">${u.descricao}</span>
        <span id="valor" >$${parseFloat(u.valor).toFixed(2)}</span>
        <span id="data" >${new Date(u.data).toLocaleDateString('pt-BR')}</span>
        </div> 
        <div id="content-btn-card">
        <button id="btn-excluir" onclick="excluirDespesa(${u.id})"><img id="imgExcluir" src="imagens/excluir.png"></button>
        <a id="btn-excluir" id="btn-editar" href="editarDespesa.html?id=${u.id}">  <button"><img id="imgExcluir" src="imagens/editar.png"></button></a>
        
        </div>
       
        </div>
        
        </div>
        `
    
          lista.appendChild(li)

})
   
            const totall=dados.reduce((acc,item)=>{
              return acc+parseFloat(item.valor)
            },0)

            if(totall=== 0){
              lista.innerText='Sem despesas'
            }    
total.innerText="$"+totall.toFixed(2)
         
}
  lista.innerHTML=" "
  document.getElementById('form').addEventListener('submit',function(e){
  e.preventDefault()

})

async function adicionar() {
  
const erro=document.getElementById("erro")

    const form=document.getElementById('form')
    const descricao=document.getElementById('descricao').value
    const valor=document.getElementById('valor').value
    let categoria=document.getElementById("categoria").value
    let data=document.getElementById('data').value
    if(!data){
      data = new Date().toISOString().split('T')[0]

    }

    if(!descricao || !valor || !data ){
      carregarDados()
     return erro.innerText="Prencher todos os campos"
       
    }else{
     erro.innerText=""
    }
  
 await fetch("http://127.0.1.1:4000/despesa",{
        method:'post',
        headers:{"content-type":"application/json"},
        body: JSON.stringify({descricao,valor,categoria,data})
    })
    

   form.reset()
  carregarDados()

   
}

async function excluirDespesa(id){
  await fetch(`http://127.0.1.1:4000/despesa/${id}`,
    { method:'DELETE' }) 
    
    carregarDados()

}
async function editarDespesa(id){
      
  
  await fetch(`http://127.0.1.1:4000/despesa/${id}`,
    { method:'PUT',
      headers:{"content-type":"application,json"},
      body:JSON.stringify({
        descricao,
        valor,
        categoria,
        data
      })
    }
  
  ) 
    

    
    carregarDados()

    }

carregarDados()