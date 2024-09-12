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
        const dados = await fs.readFile("livros.json", 'utf-8')
        livros = JSON.parse(dados)
    }catch (erro){

    }
}

const salvarLivros = async () => {
    await fs.writeFile("livros.json", JSON.stringify(livros, null, 2))
}

const listarLivros = async () => {

    const resposta = await checkbox({
        message: "Use o Enter para finalizar essa etapa",
        choices: [...livros], // atribuindo todos os valores de metas para choices
        instructions: false
    })

}

const livrosLivrosStatus = async (flag) => {

    const query = livros.filter((livro) => {
        return livro.checked == flag
    })

    if(!flag && query.length == 0) {
        mensagem = "Não há livros na lista de desejos."
        return
    }

    await select({
        message: query.length + " Metas abertas",
        choices: [...query]
    })

};

const adicionarLivro = async () => {
    const nome = await input({message: 'Digite o nome do livro: '})
    const autor = await input({message: 'Digite o autor do livro: '})
    const ano = await input({message: 'Digite o nome do livro: '})

    if(nome.length == 0 || autor.length == 0 || ano.length == 0){
        mensagem = "Nenhum campo pode ser vazio."
        return
    }

    livros.push(
        {
            value: nome,
            autor: autor,
            year: ano,
            checked: false
        }
    )
    mensagem = "Livro adicionado com sucesso!"

}

const mostrarMensagem = () => {
    console.clear();

    if(mensagem != ""){
        console.log(mensagem + "\n")
        mensagem = ""
    }
}


const start = async () => {
    await carregarLivros()
    while(true){
        mostrarMensagem()
        await salvarLivros()
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
                await livrosLivrosStatus(true)
                break
            case 'desejos':
                await livrosLivrosStatus(false)
                break
            case 'adicionar':
                await adicionarLivro()
                break
            case 'sair':
                console.log("Até mais!")
                return
        }
    }
}

start()