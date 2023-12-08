// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test, console2} from "forge-std/Test.sol";
import "../src/Test/IntentProxyFactory.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract IntentProxyFactoryTest is Test {

    address USDC = 0xCaC7Ffa82c0f43EBB0FC11FCd32123EcA46626cf;
    function setUp() public {
    }

    function test_New() public  {

        console.log("begin msg.sender:", msg.sender, address(this));
        vm.prank(msg.sender);
        IntentProxyFactory intentFactory = new IntentProxyFactory(0x0A86c5b7621d11BB6Da3e8C95b6F842a2bF27C95);
        console2.log("address:", address(intentFactory));

        vm.prank(msg.sender);
        address proxy = intentFactory.mint(uint256(1));

        uint256 a = ERC20(USDC).balanceOf(proxy);
        console2.log("address:", a);

    }


}
