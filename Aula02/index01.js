const { select } = require('@inquirer/prompts')


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
                break
            case 'listar':
                console.log("listando...")
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