// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/token/ERC20/IERC20.sol";
import "@smart-manager/interfaces/ISmartManager.sol";
import "./BaseSmartNFT.sol";

interface IPool {
    function getUserAccountData(
        address user
    )
        external
        view
        returns (
            uint256,
            uint256,
            uint256 avaliableBorrowsBase,
            uint256,
            uint256,
            uint256
        );

    function borrow(
        address asset,
        uint256 amount,
        uint256 interestRateMode,
        uint16 referralCode,
        address onBehalfOf
    ) external;

    function supply(
        address asset,
        uint256 amount,
        address onBehalfOf,
        uint16 referralCode
    ) external;
}

interface IUniswapV2Router02 {
    function swapExactTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);
}

interface IPrice {
    function getAssetPrice(address asset) external view returns (uint256);
}

contract RevolvingLendingSmartNFT is BaseSmartNFT {
    address constant AAVE_ADDR = 0xccEa5C65f6d4F465B71501418b88FBe4e7071283;
    address constant PRICE_ADDR = 0x4DaE2f0f4Db78115eF114F1Dfef426ef2A4fC318;
    address constant ROUTER02_ADDR = 0x3D70eFbf7E3b28a4fa6AB388f1Bf2cE2EF6C474B;
    address constant USDC_ADDR = 0xCaC7Ffa82c0f43EBB0FC11FCd32123EcA46626cf;


    constructor(
        address manager_,
        uint256 tokenId_
    ) BaseSmartNFT(manager_, tokenId_) {}

    struct ExecuteParam {
        uint256 count; // Number of recurring loans
        uint256 amountIn; // The number of tokens entered by the user
        address to; // lending address
        address inputAsset; // Input asset address
        address outputAsset; // Output asset address
    }

    function _execute(bytes memory data) internal override {
        ExecuteParam memory param;
        param = abi.decode(data, (ExecuteParam));

        uint256 outputAssetBalanceBefore = IERC20(param.outputAsset).balanceOf(
            address(this)
        );

        for (uint256 i = 0; i < param.count; i++) {
            if (i == 0) {
                IERC20(param.inputAsset).approve(ROUTER02_ADDR, param.amountIn);
                address[] memory path = new address[](2);
                path[0] = param.inputAsset;
                path[1] = param.outputAsset;
                IUniswapV2Router02(ROUTER02_ADDR).swapExactTokensForTokens(
                    param.amountIn,
                    0,
                    path,
                    address(this),
                    block.timestamp + 1000
                );
            } else {
                uint256 outputAssetBalanceCurrent = IERC20(param.outputAsset)
                    .balanceOf(address(this));
                uint256 outputAssetBalanceDiff = outputAssetBalanceCurrent -
                    outputAssetBalanceBefore;
                IERC20(param.outputAsset).approve(
                    AAVE_ADDR,
                    outputAssetBalanceDiff
                );
                IPool(AAVE_ADDR).supply(
                    param.outputAsset,
                    outputAssetBalanceDiff,
                    address(this),
                    0
                );

                uint256 borrowBase;
                (, , borrowBase, , , ) = IPool(AAVE_ADDR).getUserAccountData(
                    address(this)
                );
                require(borrowBase > 0, "NOT ENOUGH BORROW BASE");

                uint256 price = IPrice(PRICE_ADDR).getAssetPrice(USDC_ADDR);
                uint256 amount = (borrowBase * 8) / price / 10;
                require(amount > 0, "NOT ENOUGH BORROW");

                IPool(AAVE_ADDR).borrow(USDC_ADDR, amount, 2, 0, address(this));
                uint256 amountUSDC = amount;
                require(amountUSDC > 0, "NOT ENOUGH USDC");

                IERC20(USDC_ADDR).approve(ROUTER02_ADDR, amountUSDC);
                address[] memory path = new address[](2);
                path[0] = USDC_ADDR;
                path[1] = param.outputAsset;
                IUniswapV2Router02(ROUTER02_ADDR).swapExactTokensForTokens(
                    amountUSDC,
                    0,
                    path,
                    address(this),
                    block.timestamp + 1000
                );
            }
        }
    }
}
