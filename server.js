const express=require('express')
const cors = require('cors')
const {Pool}=require('pg');
const { connectionString } = require('pg/lib/defaults');
const app=express();
app.use(express.json(),cors())

const pool= new Pool({
    connectionString:process.env.DATABASE_url,
    ssl:{
      rejectUnauthorized:false
    }
})


app.get('/despesa',async(req,res)=>{
    const result = await pool.query("SELECT * FROM despesas ORDER by id ASC");
    res.json(result.rows)
})
app.get('/despesa/:id',async(req,res)=>{
  const { id } = req.params;

  const result = await pool.query(
    "SELECT * FROM despesas WHERE id = $1",
    [id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ mensagem: "Despesa não encontrada" });
  }

  res.json(result.rows[0]);
})
app.post('/despesa',async(req,res)=>{
    const {descricao,valor,categoria,data}=req.body
    const result= await pool.query(
        "INSERT INTO despesas(descricao,valor,categoria, data) VALUES ($1, $2, $3, $4)RETURNING *",
        [descricao,valor,categoria,data]
    );
   
    res.status(201).json(result.rows[0])
})
app.delete('/despesa/:id',async(req,res)=>{
    const {id}=req.params;
    await pool.query("DELETE FROM despesas WHERE id = $1", [id]);

  res.json("deletado");
  

})
app.put('/despesa/:id',async (req,res)=>{
       
  const { id } = req.params;
  const { descricao, valor,categoria, data } = req.body;

  const result = await pool.query(
    "UPDATE despesas SET descricao=$1, valor=$2,categoria=$3, data=$4 WHERE id=$5 RETURNING *",
    [descricao, valor,categoria, data, id]
  );

  res.json(result.rows[0]);
}


)





app.listen(4000,()=>{
    console.log("tudo ok na porta 4000")
})