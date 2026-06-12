import inquirer from 'inquirer';
import { criarProjeto } from './index.js';
export async function presetsVue(titulo) {
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
            criarProjeto('presets-vue/hello-world', titulo);
            break;
        case 'jsonplaceholder':
            criarProjeto('presets-vue/jsonplaceholder', titulo);
            break;
        case 'tailwind':
            criarProjeto('presets-vue/tailwind', titulo);
            break;
        default:
            break;
    }
}
//# sourceMappingURL=presetsVue.js.map