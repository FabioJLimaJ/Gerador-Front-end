import inquirer from 'inquirer';
import degit from 'degit';
import os from 'os';
import path from 'path';

import { presetsVue } from './presetsVue.js';
import { presetsAngular } from './presetsAngular.js';
import { presetsReact } from './presetsReact.js';
import ora from 'ora';


const BANNER = `
    ______                 __       ______           __
   / ____/________  ____  / /_     / ____/___  ____ / /
  / /_  / ___/ __ \\/ __ \\/ __/    / __/ / __ \\/ __  / / 
 / __/ / /  / /_/ / / / / /_     / /___/ / / / /_/ /_/  
/_/   /_/   \\____/_/ /_/\\__/    /_____/_/ /_/\\__,_(_)   
                                                        
 -----------------------------------------------------
`;

async function escolherFramework() {

    console.clear();
    console.log(BANNER);

    const menu = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Nome do projeto'
        },
        {
            type: 'select',
            name: 'framework',
            message: 'Qual framework você deseja?',
            choices: [
                { name: 'Angular', value: 'angular' },
                { name: 'React', value: 'react' },
                { name: 'Vue', value: 'vue' },
                { name: 'cancelar', value: 'Cancelar' }
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

export async function criarProjeto(framework: string, title: string) {
    const spinner = ora({
            text: `Buscando o preset`,
            color: 'cyan'
        }).start();
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
            spinner.succeed("Projeto criado com sucesso");
        } else {
            spinner.fail("Preset não encontrado");
            
        }
    } catch (error) {
        console.log("Erro ao criar o  projeto");
    }
}

escolherFramework();
