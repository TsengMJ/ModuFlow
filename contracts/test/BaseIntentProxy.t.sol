// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Ownable} from "@openzeppelin/access/Ownable.sol";
import {Test, console2} from "forge-std/Test.sol";
import {TestSmartNFT} from "@test/TestSmartNFT.sol";
import {TestSmartManager} from "@test/TestSmartManager.sol";
import {IIntentProxy} from "@intent-proxy/interfaces/IIntentProxy.sol";
import {BaseIntentProxy} from "@intent-proxy/BaseIntentProxy.sol";

contract BaseIntentProxyTest is Test {
    BaseIntentProxy public intentProxy;
    TestSmartManager public smartManager;
    TestSmartNFT public smartNFT;

    address public deployer = address(0x1234);

    function setUp() public {
        vm.startPrank(deployer);
        smartNFT = new TestSmartNFT();
        smartManager = new TestSmartManager();
        intentProxy = new BaseIntentProxy(address(smartManager));

        smartManager.setSmartNFTInfo(1, address(smartNFT));
    }

    function test_Deploy() public {
        assertEq(intentProxy.SMART_MANAGER(), address(smartManager));
    }

    function test_ExecuteIntent() public {
        IIntentProxy.Action[] memory actions = new IIntentProxy.Action[](2);
        actions[0] = IIntentProxy.Action(1, abi.encode(0x01));
        actions[1] = IIntentProxy.Action(1, abi.encode(0x02));

        assertEq(intentProxy.executeIntent(actions), true);
    }
}
