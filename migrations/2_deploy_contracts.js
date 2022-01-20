const Contract = artifacts.require("./Contract.sol");
const fs = require('fs')

module.exports = async(deployer, network) => {

    // OpenSea proxy registry addresses for rinkeby and mainnet.
    let proxyRegistryAddress = "";
    if (network === 'polygon') {
        proxyRegistryAddress = "0x58807baD0B376efc12F5AD86aAc70E78ed67deaE";
    } else if (network === 'mumbai') {
        proxyRegistryAddress = "0x58807baD0B376efc12F5AD86aAc70E78ed67deaE";
    } else {
        proxyRegistryAddress = "0x0000000000000000000000000000000000000000";
    }

    await deployer.deploy(Contract, proxyRegistryAddress);
    const contract = await Contract.deployed();

    let configs = JSON.parse(fs.readFileSync('./configs/' + network + '.json').toString())
    console.log('Saving address in config file..')
    configs.contract_address = contract.address
    fs.writeFileSync('./configs/' + network + '.json', JSON.stringify(configs, null, 4))
    console.log('--')

};