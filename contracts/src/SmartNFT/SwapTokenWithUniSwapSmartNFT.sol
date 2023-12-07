// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/token/ERC20/IERC20.sol";
import "@smart-manager/interfaces/ISmartManager.sol";
import "./interfaces/ISmartNFT.sol";
import "./BaseSmartNFT.sol";

interface IUniswapV2Router03 {
    function swapExactTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);
}

contract SwapTokenWithUniSwapSmartNFT is BaseSmartNFT {
    address public constant ROUTER02_ADDR =
        0x3D70eFbf7E3b28a4fa6AB388f1Bf2cE2EF6C474B;

    struct ExecuteParam {
        uint256 amountIn; // The number of tokens entered by the user
        address to; // Collection address
        address[] path; // [WBTC, USDT] -> WBTC to USDT
        uint256 deadline; // Collection deadline, unit seconds
    }

    constructor(
        address manager_,
        uint256 tokenId_
    ) BaseSmartNFT(manager_, tokenId_) {}

    function _execute(bytes memory data) internal override {
        ExecuteParam memory param;

        param = abi.decode(data, (ExecuteParam));

        IERC20(param.path[0]).approve(ROUTER02_ADDR, param.amountIn);
        IUniswapV2Router03(ROUTER02_ADDR).swapExactTokensForTokens(
            param.amountIn,
            0,
            param.path,
            param.to,
            param.deadline
        );
    }
}
