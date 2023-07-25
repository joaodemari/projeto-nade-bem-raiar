// import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from 'cors';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());  

app.get('/', async (req, res) =>{
  const list = await prisma.Avaliacao.findMany()
  res.json(list)
});

app.post('/', async (req, res) =>{
    const {nomeAluno, idAluno, Nivel, Notas, Passou} = req.body
    const user = await prisma.Avaliacao.create({
        data: {nomeAluno, idAluno, Nivel, Notas, Passou}
      })
    res.json(user)
});

app.delete('/', async (req, res) => {
  const {id} = req.body
  const delAval = await prisma.Avaliacao.delete({
    where:{
        id
      }
  })
  res.json(delAval)
});

app.listen(port, () => {
    console.log(`Listening on ${port}`);
  });