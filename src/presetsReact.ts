import inquirer from 'inquirer';
import { criarProjeto } from './index.js';

export async function presetsReact(titulo: string) {

    const menu = await inquirer.prompt([
        {
            type: 'select',
            name: 'preset',
            message: 'Escolha o preset',
            choices: [
                { name: 'HelloWorld', value: 'helloworld' },
                { name: 'JsonPlaceholder', value: 'jsonplaceholder' },
                { name: 'Tailwind', value: 'tailwind' },
            ]
        }
    ]);

    switch (menu.preset) {
        case 'helloworld':
            criarProjeto('presets-react/hello-world', titulo);
            break;
        case 'jsonplaceholder':
            criarProjeto('presets-react/jsonplaceholder', titulo);
            break;
        case 'tailwind':
            criarProjeto('presets-react/tailwind', titulo);

            break;
        default:
            break;
    }
}