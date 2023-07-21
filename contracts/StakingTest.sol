// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract StakingTest is Ownable {
    using SafeERC20 for IERC20;

    IERC20 public immutable rewardsToken;
    IERC20 public immutable stakingToken;

    constructor(
        address _stakingToken
    ) {
        require(
            _stakingToken != address(0),
            "StakingVault: staking token address cannot be 0"
        );
        stakingToken = IERC20(_stakingToken);
        rewardsToken = IERC20(_stakingToken);
    }

    function stake(
        uint256 _amount
    ) public {
        require(_amount > 0, "StakingVault: amount must be greater than 0");

        stakingToken.safeTransferFrom(msg.sender, address(this), _amount);
    }

    function withdraw(
        uint256 _amount
    ) public {
        require(_amount > 0, "StakingVault: amount must be greater than 0");
        
        stakingToken.approve(address(this), _amount);
        stakingToken.safeTransferFrom(address(this), msg.sender, _amount);
    }
}
