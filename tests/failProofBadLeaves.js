const HDWalletProvider = require("@truffle/hdwallet-provider");
const web3 = require("web3");
require('dotenv').config()
const NFT_CONTRACT_ABI = require('../abi.json')
const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs')
const { MerkleTree } = require('merkletreejs')
const keccak256 = require('keccak256')

async function main() {
    const configs = JSON.parse(fs.readFileSync('./configs/' + argv._ + '.json').toString())
    if (configs.owner_mnemonic !== undefined) {
        const provider = new HDWalletProvider(
            configs.owner_mnemonic,
            configs.provider
        );

        const web3Instance = new web3(provider);
        const nftContract = new web3Instance.eth.Contract(
            NFT_CONTRACT_ABI,
            configs.contract_address, { gasLimit: "500000", gasPrice: "100000000000" }
        );

        try {
            const storedRoot = await nftContract.methods.merkleRoot().call()
            console.log('Merkle root in contract is: ', storedRoot)
            console.log('Generating proof...')
            const badLeaves = ['0x692b340915Eb661CB3AD878Db4ca44B57Ea8Dc2a', '0x7ff1A4161380aE86B146a9e2708937086759DE49'].map(x => keccak256(x))
            const tree = new MerkleTree(badLeaves, keccak256, { sortPairs: true })
            const calculatedRoot = "0x" + tree.getRoot().toString('hex')
            console.log('Calculated merkle root is: ', calculatedRoot)
            const proof = tree.getHexProof(keccak256(configs.owner_address))
            console.log(proof)
            const result = await nftContract.methods.verifyProof(configs.owner_address, proof).call()
            console.log(result);
            process.exit();
        } catch (e) {
            console.log(e)
            process.exit();
        }
    } else {
        console.log('Please provide `owner_mnemonic` first.')
    }

}

if (argv._ !== undefined) {
    main();
} else {
    console.log('Provide a configs contract first.')
}