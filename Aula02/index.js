const { select, input, checkbox } = require('@inquirer/prompts')

let meta = {
    value: '',
    checked: true
}

let metas = [
    {
        value: 'Tomar 3.5L de água por dia.',
        checked: false
    },
    {
        value: 'Ler 1hora por dia.',
        checked: false
    },
    {
        value: 'Treinar 2horas por dia.',
        checked: false
    },
]

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

    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0){
        console.log("Nenhuma meta foi selecionada.")
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true 
    })

    console.log('Meta(s) marcadas como concluída(s).')

}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0){
        console.log("Não existem metas realizadas! :(")
        return
    }

    await select({
        message: "Metas realizadas",
        choices: [...realizadas]
    })

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
                    name: "Metas realizadas",
                    value: 'realizadas'
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
                console.clear()
                break
            case 'listar':
                console.log("listando...")
                await listarMetas()
                console.clear()
                break
            case 'realizadas':
                await metasRealizadas()
                console.clear()
                break
            case 'sair':
                return
        }
    }
}

start()