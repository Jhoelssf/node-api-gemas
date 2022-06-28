const inquirer = require('inquirer')
require('colors')

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.blue} Crear tarea`,
            },
            {
                value: 2,
                name: `${'2.'.blue} Listar tarea`,
            },
            {
                value: 3,
                name: `${'3.'.blue} Listar tareas completadas`,
            },
            {
                value: 4,
                name: `${'4.'.blue} Listar tareas pendientes`,
            },
            {
                value: 5,
                name: `${'5.'.blue} Completar tarea(s)`,
            },
            {
                value: 6,
                name: `${'6.'.blue} Borrar tarea`,
            },
            {
                value: 0,
                name: `${'0.'.blue} Salir`,
            },
        ],
    },
]

const preguntaPausa = [
    {
        type: 'input',
        name: 'opcion',
        message: `Presione la tecla ${'ENTER'.green} para continuar`,
    },
]

const pausaInquirer = async () => {
    const { opcion } = await inquirer.prompt(preguntaPausa)
    return opcion
}

const inquiererMenu = async () => {
    console.clear()
    console.log('======================')
    console.log('Seleccione una opción')
    console.log('======================')

    const { opcion } = await inquirer.prompt(preguntas)
    return opcion
}

const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor'
                }
                return true
            },
        },
    ]
    const { desc } = await inquirer.prompt(question)
    return desc
}

const showListTasks = async (listTasks) => {
    const choices = listTasks.map((task, index) => {
        const idx = `${index + 1}`.green
        const status = task.completadoEn
        const ended = !!status ? `Completada`.green : `Pendiente`.red
        return {
            value: task.id,
            name: `${idx}. ${task.descripcion} :: ${ended}`,
        }
    })
    choices.unshift({
        value: '0',
        name: '0. Cancelar',
    })
    const tasksList = [
        {
            type: 'list',
            name: 'selectedId',
            message: 'Seleccione una tarea para borrar?',
            choices,
        },
    ]
    const { selectedId } = await inquirer.prompt(tasksList)
    return selectedId
}

const confirm = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message,
        },
    ]
    const { ok } = await inquirer.prompt(question)
    return ok
}

const showMultiplesItems = async (listTasks) => {
    const choices = listTasks.map((task, index) => {
        const idx = `${index + 1}`.green
        const status = task.completadoEn
        const ended = !!status ? `Completada`.green : `Pendiente`.red
        return {
            value: task.id,
            name: `${idx}. ${task.descripcion} :: ${ended}`,
            checked: status ? true : false,
        }
    })
    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices,
        },
    ]
    const { ids } = await inquirer.prompt(question)
    return ids
}

module.exports = {
    inquiererMenu,
    pausaInquirer,
    leerInput,
    showListTasks,
    confirm,
    showMultiplesItems,
}
