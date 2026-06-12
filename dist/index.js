import inquirer from 'inquirer';
import degit from 'degit';
import os from 'os';
import path from 'path';
import { presetsVue } from './presetsVue.js';
import { presetsAngular } from './presetsAngular.js';
import { presetsReact } from './presetsReact.js';
async function escolherFramework() {
    const menu = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Nome do projeto'
        },
        {
            type: 'select',
            name: 'framework',
            message: 'Qual framework voce deseja',
            choices: [
                { name: 'Angular', value: 'angular' },
                { name: 'React', value: 'react' },
                { name: 'VueJs', value: 'vue' },
                { name: 'Cancelar', value: 'Cancelar' }
            ],
            loop: false
        },
    ]);
    switch (menu.framework) {
        case 'angular':
            presetsAngular(menu.title);
            break;
        case 'react':
            presetsReact(menu.title);
            break;
        case 'vue':
            presetsVue(menu.title);
            break;
        default:
            break;
    }
}
export async function criarProjeto(framework, title) {
    try {
        const pathGithub = `https://github.com/FabioJLimaJ/Presets/${framework}`;
        if (await fetch(`https://api.github.com/repos/FabioJLimaJ/Presets/contents/${framework}`).then(res => res.ok)) {
            const homeUsuario = os.homedir();
            const pathDesktop = path.join(homeUsuario, 'Desktop', title);
            const emitter = degit(pathGithub, {
                cache: false,
                force: true,
            });
            await emitter.clone(pathDesktop);
            console.log("Projeto criado com sucesso");
        }
        else {
            console.log("Preset não encontrado");
        }
    }
    catch (error) {
        console.log("Erro ao criar o  projeto");
    }
}
escolherFramework();
//# sourceMappingURL=index.js.map