const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs')
const child_process = require('child_process')

async function deploy() {
    try {
        const configs = JSON.parse(fs.readFileSync('./configs/' + argv._ + '.json').toString())

        if (
            configs.network !== undefined &&
            configs.owner_mnemonic !== undefined &&
            configs.owner_address !== undefined &&
            configs.provider !== undefined &&
            configs.contract_name !== undefined &&
            configs.polygonscan_key !== undefined
        ) {

            console.log('Verifying contract..')
            child_process.execSync('sudo PROVIDER="' + configs.provider + '" MNEMONIC="' + configs.owner_mnemonic + '" POLYGONSCAN_KEY="' + configs.polygonscan_key + '" OWNER="' + configs.owner_address + '" truffle run verify ' + configs.contract_name + ' --network ' + configs.network + ' --reset', { stdio: 'inherit' })

            console.log('All done, exiting!')
            process.exit();
        } else {
            console.log('Config file missing.')
        }
    } catch (e) {
        console.log(e.message)
        process.exit()
    }
}

if (argv._ !== undefined) {
    deploy();
} else {
    console.log('Provide a config first.')
}