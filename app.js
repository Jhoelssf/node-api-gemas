require('colors')
const { inquiererMenu, pausaInquirer } = require('./helpers/inquierer')
const Tarea = require('./models/tarea')
const Tareas = require('./models/tareas')
console.clear()

const main = async() => {

    let opt = ''

    try {
        do {
            // opt = await inquiererMenu()
            // console.log({opt})
            // if (opt) {
                const tareas = new Tareas()
                console.log(tareas)
                const tarea = new Tarea('Comprar comida')
                console.log(tarea)
                await pausaInquirer()
            // }
        } while(opt)
    } catch (e) {
        console.log(e);
    }
}

main()