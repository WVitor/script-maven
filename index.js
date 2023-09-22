const readline = require("readline").createInterface({input: process.stdin, output: process.stdout});
const { execSync } = require('child_process');
const fs = require('fs');

execSync('sudo whoami');
readline.question(`Entre com o caminho: ${process.env.HOME}`,(dir)=>{
    let new_dir = dir.trim()
    if(!new_dir.startsWith("/")) new_dir = "/".concat(new_dir)
    if(!new_dir.endsWith("/")) new_dir = new_dir.concat("/")
    const workspace = process.env.HOME.concat(new_dir)
    console.log("\n_____________Iniciando processo de build_____________\n")
    if(workspace.endsWith('pom.xml') || fs.existsSync(workspace.concat('pom.xml'))) Shell(workspace)
    else for(let path of fs.readdirSync(workspace).filter((filter => !filter.includes("ws-boot") && filter))) Shell(workspace.concat(path, "/fontes/", path, "/" ))
    readline.close()
})

function Shell(dir_path){
    if ((dir_path.endsWith('pom.xml') && fs.existsSync(dir_path)) || fs.existsSync(dir_path.concat('/pom.xml'))) {
        let  dir = dir_path.endsWith('pom.xml') ? dir_path.slice(0, -7) : dir_path
        execSync('mvn clean install', {cwd: dir})
        execSync("sudo cp ".concat(dir, `target/*.war`, ` /opt/wars`))
        console.log("__________________Processo completo__________________")
        console.log("  ".concat(dir_path, "\n"))
    }
}