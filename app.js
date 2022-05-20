require('colors')
const {
    inquiererMenu,
    pausaInquirer,
    leerInput,
} = require('./helpers/inquierer')
const Tarea = require('./models/tarea')
const Tareas = require('./models/tareas')
console.clear()

const main = async () => {
    try {
        let opt = ''
        const tareas = new Tareas()

        do {
            opt = await inquiererMenu()
            switch (opt) {
                case 1:
                    const desc = await leerInput('Descripción: ')
                    tareas.crearTarea(desc)
                    break
                case 2:
                    console.log(tareas._listado)
                    break
            }
            await pausaInquirer()
        } while (opt !== 0)
    } catch (error) {
        console.log(error)
    }
}

main()
