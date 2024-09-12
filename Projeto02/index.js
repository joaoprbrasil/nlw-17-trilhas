const { select, input, checkbox } = require('@inquirer/prompts')
const fs = require("fs").promises
let mensagem = ""

let livro = {
    nome: '',
    autor: '',
    year: 0,
    checked: false
}

let livros = []

const carregarLivros = async () => {
    try{
        const dados = await fs.readFile("livros.json", 'utf-8')
        livros = JSON.parse(dados)
    }catch (erro){

    }
}

const listarLivros = async () => {

}

const start = async () => {

    carregarLivros()

    const opcao = await select({
        message: "Menu >",
        choices: [
            {
                name: "Listar todos os livros",
                value: 'listar'
            },
            {
                name: "Sair",
                value: 'sair'
            }
        ]
    })

    switch(opcao){
        case 'listar':
            await listarLivros()
            break
        case 'sair':
            console.log("Até mais!")
            return
    }

}

start()