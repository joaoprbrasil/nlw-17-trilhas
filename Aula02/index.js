const { select, input, checkbox } = require('@inquirer/prompts')

let meta = {
    value: '',
    checked: true
}

let metas = []

const cadastrarMeta = async () => {
    const meta = await input({message: 'Digite a meta: '})

    if(meta.length == 0){
        console.log("A meta não pode ser vazia.")
        return
    }

    metas.push(
        {value: meta, checked: false}
    )
    console.log("Meta", meta, "Cadastrada.")
    
}

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use o espaço para marcar ou desmarcar \nUse o Enter para finalizar essa etapa",
        choices: [...metas], // atribuindo todos os valores de metas para choices
        instructions: false
    })

    if(respostas.length == 0){
        console.log("Nenhuma meta foi selecionada.")
        return
    }

    metas.forEach((m) => {
        m.checked = false
    })

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true 
    })

    console.log('Meta(s) marcadas como concluída(s).')

}


const start = async () => {
    while(true){

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
                    name: "Excluir meta",
                    value: 'excluir'
                },
                {
                    name: "Sair",
                    value: 'sair'
                }
            ]
        })

        switch(opcao){
            case 'cadastrar':
                console.log("cadastrando...")
                await cadastrarMeta()
                break
            case 'listar':
                console.log("listando...")
                await listarMetas()
                break
            case 'excluir':
                console.log("excluindo...")
                break
            case 'sair':
                return
        }
    }
}

start()