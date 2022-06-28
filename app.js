require('colors')
const {
    inquiererMenu,
    pausaInquirer,
    leerInput,
    showListTasks,
    confirm,
    showMultiplesItems,
} = require('./helpers/inquierer')
require('colors')
const { saveDB, readDB } = require('./helpers/saveFile')
const Tarea = require('./models/tarea')
const Tareas = require('./models/tareas')
console.clear()

const main = async () => {
    try {
        let opt = ''
        const tareas = new Tareas()
        const tareasDB = readDB()

        if (tareasDB) {
            tareas.loadTasksFromArray(tareasDB)
        }
        do {
            opt = await inquiererMenu()
            switch (opt) {
                case 1:
                    const desc = await leerInput('Descripción: ')
                    tareas.crearTarea(desc)
                    break
                case 2:
                    tareas.fullList()
                    break
                case 3:
                    tareas.listCompletedPending()
                    break
                case 4:
                    tareas.listCompletedPending(false)
                    break
                case 5:
                    const ids = await showMultiplesItems(tareas.listadoArr)
                    tareas.toggleTaskEnded(ids)
                    break
                case 6:
                    let optDelete = await showListTasks(tareas.listadoArr)
                    const confirmResp = await confirm('¿Estas seguro?')
                    if (confirmResp && confirmResp !== '0')
                        tareas.deleteTask(optDelete)
                    break
            }

            saveDB(tareas.listadoArr)

            await pausaInquirer()
        } while (opt !== 0)
    } catch (error) {
        console.log(error)
    }
}

main()
