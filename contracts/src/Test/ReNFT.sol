// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../SmartManager/BaseSmartManager.sol";

contract ReNFT {
    address _owner;
    BaseSmartManager _smartManager;

    constructor(address smartManager, address owner) {
        _owner = owner;
        _smartManager = BaseSmartManager(smartManager);
    }

    function mint(address smartNFT, address to, uint256 amount) public {
        uint256 tokenId = _smartManager.smartNFTTokenIdOf(smartNFT);
        _smartManager.safeTransferFrom(
            _owner,
            address(to),
            tokenId,
            1,
            ""
        );
        //_mint(to, amount);
    }
}
