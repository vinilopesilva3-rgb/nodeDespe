    const params = new URLSearchParams(window.location.search)
    const id = params.get('id')

window.onload = async () => {


    try {
        const res = await fetch(`http://127.0.1.1:4000/despesa/${id}`)

        const d = await res.json()


        document.getElementById("descricaoEditar").value = d.descricao
        document.getElementById("valorEditar").value = d.valor
        document.getElementById("categoria").value = d.categoria


        document.getElementById("dataEditar").value =new Date(d.data).toISOString().split('T')[0]  


    } catch (erro) {
        alert("ERRO: " + erro)
        console.log(erro)
    }
}
async function editar(){        
    const erro=document.getElementById("erro")

    const data= document.getElementById("dataEditar").value

       const descricao= document.getElementById("descricaoEditar").value
       const valorEditar=document.getElementById("valorEditar").value
              const categoria=document.getElementById("categoria").value

              if(!descricao || !valorEditar || !data ){
     return erro.innerText="Prencher todos os campos"
       
    }else{
     erro.innerText=""
    }


         await fetch(`http://127.0.1.1:4000/despesa/${id}`,{
            method:"PUT",
            headers:{"content-type":"application/json"},
            body:JSON.stringify({descricao,valor:valorEditar,categoria,data})
            
        })

    window.location.href = "index.html"
}