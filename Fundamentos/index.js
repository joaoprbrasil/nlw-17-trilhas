// hello world
let mensagem = "joão pedro"
const pi = 3.14151619

{
    let mensagem = "olá mundo"
    console.log(mensagem);
}

console.log(mensagem);
console.log("hello world!");

// arrays
let arrays = ["palavra01", "palavra02"]

console.log(arrays[0] + " " + arrays[1])

// objetos
let meta = {
    value: 'ler um livro por mês',
    checked: true,
    log: (info) => {
        console.log(info)
    }
}

console.log(meta.value)
meta.log("Crime e Castigo")

let metas = [
    meta,
    {
        value: 'treinar todos os dias',
        checked: true 
    }
]

console.log(metas[1].value)

// function     // arrow function
const criarMeta = () => {}

function criarMeta02() {}