const { select, input, checkbox } = require('@inquirer/prompts')
const fs = require("fs").promises
let mensagem = "Bem vindo ao app de metas";

let meta = {
    value: '',
    checked: true
}

let metas = []

const carregarMetas = async () => {
    try{
        const dados = await fs.readFile("metas.json", 'utf-8')
        metas = JSON.parse(dados)
    }catch (erro){

    }
}

const salvarMetas = async () => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}

const cadastrarMeta = async () => {

    const meta = await input({message: 'Digite a meta: '})

    if(meta.length == 0){
        mensagem = "A meta não pode ser vazia."
        return
    }

    metas.push(
        {value: meta, checked: false}
    )
    mensagem = "Meta cadastrada com sucesso!"
    
}

const listarMetas = async () => {

    if(metas.length == 0){
        mensagem = "Não existem metas."
        return
    }

    const respostas = await checkbox({
        message: "Use o espaço para marcar ou desmarcar \nUse o Enter para finalizar essa etapa",
        choices: [...metas], // atribuindo todos os valores de metas para choices
        instructions: false
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0){
        mensagem = "Nenhuma meta foi selecionada."
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true 
    })

    mensagem = 'Meta(s) marcadas como concluída(s).'

}

const metasRealizadas = async () => {

    if(metas.length == 0){
        mensagem = "Não existem metas."
        return
    }

    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0){
        mensagem =  "Não existem metas realizadas! :("
        return
    }

    await select({
        message: realizadas.length + " Metas realizadas",
        choices: [...realizadas]
    })

}

const metasAbertas = async () => {

    if(metas.length == 0){
        mensagem = "Não existem metas."
        return
    }

    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })

    if(metas.length == 0){
        mensagem = "Não há metas cadastradas."
        return
    }

    if (abertas.length == 0){
        mensagem = "Parabéns! Você cumpriu todas as metas e não há metas abertas! :)"
        return
    }

    await select({
        message: abertas.length + " Metas abertas",
        choices: [...abertas]
    })
}

const deletarMetas = async () => {

    if(metas.length == 0){
        mensagem = "Não existem metas."
        return
    }

    const metasDesmarcadas = metas.map((meta) =>{
        return {value: meta.value, checked: false}
    })

    const itemsADeletar = await checkbox({
        message: "Selecione um item para deletar",
        choices: [...metasDesmarcadas],
        instructions: false
    })

    if(itemsADeletar.length == 0){
        mensagem = "Nenhum item para deletar."
        return
    }
    
    itemsADeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })

    mensagem = "Meta(s) deletada(s) com sucesso!"
    
}

const mostrarMensagem = () => {
    console.clear();
    
    if(mensagem != ""){
        console.log(mensagem + "\n")
        mensagem = ""
    }
}


const start = async () => {
    await carregarMetas()
    while(true){
        mostrarMensagem()
        await salvarMetas()

        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: 'cadastrar'
                },
                {
                    name: "Listar metas",
                    value: 'listar'
                },
                {
                    name: "Deletar meta",
                    value: 'deletar'
                },
                {
                    name: "Metas realizadas",
                    value: 'realizadas'
                },
                {
                    name: "Metas abertas",
                    value: 'abertas'
                },
                {
                    name: "Sair",
                    value: 'sair'
                }
            ]
        })

        switch(opcao){
            case 'cadastrar':
                await cadastrarMeta()
                break
            case 'listar':
                await listarMetas()
                break
            case 'deletar':
                await deletarMetas()
                break
            case 'realizadas':
                await metasRealizadas()
                break
            case 'abertas':
                await metasAbertas()
                break
            case 'sair':
                console.log("Até mais!")
                return
        }
    }
}

start()