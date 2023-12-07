// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../IntentProxy/BaseIntentProxy.sol";
import "@openzeppelin/utils/Create2.sol";
import "@openzeppelin/token/ERC20/IERC20.sol";
import "forge-std/console.sol";

interface IFAUCET {
    function mint(address token, address to, uint256 amount) external;
}

contract IntentProxyFactory {

    address WBTC = 0x0EFD8Ad2231c0B9C4d63F892E0a0a59a626Ce88d;
    address AAVE = 0xfB4CeA030Fa61FC435E922CFDc4bF9C80456E19b;
    address LINK = 0x3A38c4d0444b5fFcc5323b2e86A21aBaaf5FbF26;
    address USDC = 0xCaC7Ffa82c0f43EBB0FC11FCd32123EcA46626cf;
    address USDT = 0xBDE7fbbb1DC89E74B73C54Ad911A1C9685caCD83;

    IFAUCET FAUCET = IFAUCET(0xBCcD21ae43139bEF545e72e20E78f039A3Ac1b96);

    address _smt;
    constructor(address smt) {
        _smt = smt;
    }

    function mint(uint256 salt) external returns(address) {
        console.log("msg.sender:", msg.sender);
        address addr =Create2.deploy(0, bytes32(salt),
            abi.encodePacked(type(BaseIntentProxy).creationCode, abi.encode(_smt)));
        BaseIntentProxy(addr).transferOwnership(msg.sender);
        address owner = BaseIntentProxy(addr).owner();
        console.log("owner:", owner);

        FAUCET.mint(WBTC, addr, 1e8);
        FAUCET.mint(AAVE, addr, 1e20);
        FAUCET.mint(LINK, addr, 1e21);
        FAUCET.mint(USDC, addr, 1e10);
        FAUCET.mint(USDT, addr, 1e10);

        return addr;
    }

}
