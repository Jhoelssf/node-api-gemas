const Tarea = require('./tarea')

class Tareas {
    _listado = {}

    get listadoArr() {
        const listado = []
        Object.keys(this._listado).forEach((item) =>
            listado.push(this._listado[item])
        )
        return listado
    }

    constructor() {
        this._listado = {}
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc)
        this._listado[tarea.id] = tarea
    }

    loadTasksFromArray(tasks = []) {
        tasks.forEach((task) => {
            this._listado[task.id] = task
        })
    }

    printTaskFormat(list) {
        list.forEach((task, index) => {
            const idx = `${index + 1}`.green
            const status = task.completadoEn
            const ended = !!status ? `Completada`.green : `Pendiente`.red
            console.log(`${idx}. ${task.descripcion} :: ${ended}`)
        })
    }

    fullList() {
        this.printTaskFormat(this.listadoArr)
    }

    listCompletedPending(completed = true) {
        const endedList = this.listadoArr.filter(
            (task) => !!task.completadoEn === completed
        )
        this.printTaskFormat(endedList)
    }

    deleteTask(id) {
        delete this._listado[id]
        this.fullList()
    }
}

module.exports = Tareas
