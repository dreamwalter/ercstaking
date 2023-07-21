import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { DUMMY_TOKEN, DUMMY_TOKEN_ADDRESS, provider } from "../web3";

const getBalanceAndClaimed = async account => {
    const dummyToken = DUMMY_TOKEN.connect(provider);
    const balance = await dummyToken.balanceOf(account);
    return [ethers.utils.formatUnits(balance, 0)];
};

const addDummyTokenToMetaMask = async () => {
    if (!window.ethereum) {
        return false;
    }
    try {
        await window.ethereum.request({
            method: "wallet_watchAsset",
            params: {
                type: "ERC20",
                options: {
                    address: DUMMY_TOKEN_ADDRESS,
                    symbol: "$CFC",
                    decimals: 0,
                },
            },
        });
    } catch (error) {
        console.error(error);
    }
};

const DummyToken = ({ account }) => {
    const [balance, setBalance] = useState("");

    useEffect(() => {
        getBalanceAndClaimed(account, provider)
            .then(([balance]) => {
                setBalance(balance);
            })
            .catch(console.error);
    }, [provider, account]);

    if (!balance) {
        return (
            <div>
                <h2>$CFC Token</h2>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div>
            <h2>$CFC Token</h2>
            <p>
                <strong>$CFC Token balance:</strong> {balance} $CFC
            </p>
            <button onClick={addDummyTokenToMetaMask}>Add to MetaMask</button>
        </div>
    );
};

export default DummyToken;
