import chalk from "chalk";
import { Wallet, ethers } from "ethers";
import { appendFileSync } from 'fs'
import moment from 'moment'
import readlineSync from 'readline-sync'

function createWalletEvm() {
    const wallet = ethers.Wallet.createRandom();
    const privateKey = wallet.privateKey;
    const publicKey = wallet.publicKey;
    const mnemonicKey = wallet.mnemonic.phrase;

    return { privateKey, publicKey, mnemonicKey };
}

// Main function using async IIFE 
(async () => {
    try {
        // Get the total number of wallets to create from user input
        const totalWallet = readlineSync.question(
            chalk.grey('Input how much the wallet you want create: ')
        );

        let count = 1;

        // if the user entered a valid number greater than 1, set the count
        if (totalWallet > 1) {
            count = totalWallet
        }

        while (count > 0) {
            const createWalletResult = createWalletEvm();
            const theWallet = new Wallet(createWalletResult.privateKey);

            if (theWallet) {
                appendFileSync(
                    './result.txt',
                    `Address: ${theWallet.address} | Private Key: ${createWalletResult.privateKey} | Mnemonic Pharse: ${createWalletResult.mnemonicKey}\n`
                );

                console.log(
                    chalk.green(
                        `[${moment().format('HH:mm:ss')}] => Wallet created...! Your address: ${theWallet.address}`
                    )
                );
            }

            count--;
        }

        setTimeout(() => {
            console.log(
                chalk.green(
                    'All wallets have been created. Check result.txt to check your results (public key, private key, mnemonic pharse).'
                )
            );
        }, 3000);
        return;
    } catch (error) {
        console.log(
            chalk.red(
                `Your program encountered an error! Message: ${error}`
            )
        );
    }
})();