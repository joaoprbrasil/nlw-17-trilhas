const { select, input, checkbox } = require('@inquirer/prompts')
const fs = require("fs").promises
let mensagem = ""

let livro = {
    value: '',
    autor: '',
    year: 0,
    checked: false
}

let livros = []

const carregarLivros = async () => {
    try{
        const dados = await fs.readFile("livros copy.json", 'utf-8')
        livros = JSON.parse(dados)
    }catch (erro){

    }
}

const listarLivros = async () => {

    const respostas = await checkbox({
        message: "Use o Enter para finalizar essa etapa",
        choices: [...livros], // atribuindo todos os valores de metas para choices
        instructions: false
    })

}

const start = async () => {

    carregarLivros()
    while(true){
        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Listar todos os livros",
                    value: 'listar'
                },
                {
                    name: "Livros lidos",
                    value: 'lidos'
                },
                {
                    name: "Lista de desejos",
                    value: 'desejos'
                },
                {
                    name: "Adicionar um novo livro",
                    value: 'adicionar'
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
            case 'lidos':

                break
            case 'desejos':

                break
            case 'adicionar':

                break
            case 'sair':
                console.log("Até mais!")
                return
        }
    }
}

start()