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
                name: '1. Crear tarea',
            },
            {
                value: 2,
                name: '2. Listar tarea',
            },
            {
                value: 3,
                name: '3. Listar tareas completadas',
            },
            {
                value: 4,
                name: '4. Listar tareas pendientes',
            },
            {
                value: 5,
                name: '5. Completar tarea(s)',
            },
            {
                value: 6,
                name: '6. Borrar tarea',
            },
            {
                value: 0,
                name: '0. Salir',
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

module.exports = {
    inquiererMenu,
    pausaInquirer,
    leerInput,
}
