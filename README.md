# Merkle Proofs in Solidity

This repository is needed when you want to save gas in your contract by using merkle roots and merkle proof to verify conditions.
In the NFT-world is used by manage a large amount of whitelists without setting up manually.
A special thanks to [@levantainteractive](https://github.com/levantainteractive) for giving me the inputs needed to write this repository.

## Deploy the smart contract

To compile and deploy the smart contract you first need to create a configuration file by copying `configs/example.json` file.
Then install the dependencies with following command:
```
yarn
```

Now let's say you want to compile to ganache, so create the file `configs/ganache.json` with following properties:
```
{
    "network": "ganache",
    "contract_address": "THIS_FIELD_WILL_BE_AUTOMATICALLY_FIELD",
    "owner_mnemonic": "OWNER_MNEMONIC",
    "owner_address": "OWNER_ADDRESS",
    "provider": "http://localhost:7545"
}
```

When you've completed the configuration you can use following command to compile the contract:

```
npm run deploy ganache
```

If everything is correct you will see the `contract_address` parameter automatically filled by the deployer.

### Make tests

To run tests you can use what we've prepared for you buy one of following:

```bash
# This test will calculate the merkle root, writing it into the smart contract
npm run test:setroot ganache
# This test will test if the calculated proof works
npm run test:proof ganache
# This test will fail by passing bad leaves to generate the merkle root, for example if someone wants to add an address to the tree
npm run test:fail:badleaves ganache
# This test will fail by trying to create a wrong proof from correct merkle root
npm run test:fail:badadress ganache
```