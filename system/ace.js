#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { Command } = require('commander');

const program = new Command();

program
    .name('generate-controller')
    .description('CLI tool to generate controller files')
    .version('1.0.0');

program
    .argument('<controllerName>', 'Name of the controller to generate')
    .action((controllerName) => {
        // Path template
        const templatePath = path.join(__dirname, 'controller.template.ts');

        // Path output
        const outputPath = path.join(__dirname, '..', 'controller', `${controllerName}.controller.ts`);

        // Baca template
        const template = fs.readFileSync(templatePath, 'utf-8');

        // Ganti placeholder dengan nama controller
        const content = template.replaceAll(/\{\{ name \}\}/g, controllerName);

        // Pastikan folder output ada
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });

        // Tulis file baru
        fs.writeFileSync(outputPath, content, 'utf-8');

        console.log(`Controller ${controllerName} berhasil dibuat di: ${outputPath}`);
        console.log(content)
    });

program.parse(process.argv);

