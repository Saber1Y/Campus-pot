// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract CampusPots is ReentrancyGuard {
    using SafeERC20 for IERC20;

    struct Pot {
        address creator;
        address payoutAddress;
        address token;
        uint256 goalAmount;
        uint256 totalRaised;
        uint256 deadline;
        bool withdrawn;
        bool cancelled;
    }

    Pot[] private _pots;

    mapping(uint256 potId => mapping(address contributor => uint256 amount)) private _contributions;
    mapping(uint256 potId => address[]) private _contributorList;

    event PotCreated(uint256 indexed potId, address indexed creator, address indexed token, uint256 goalAmount, uint256 deadline, string metadataURI);
    event ContributionReceived(uint256 indexed potId, address indexed contributor, uint256 amount, string message);
    event PotWithdrawn(uint256 indexed potId, address indexed creator, uint256 amount, address indexed to);
    event PotCancelled(uint256 indexed potId, address indexed creator);

    error PotIsCancelled();

    function createPot(
        address payoutAddress,
        address token,
        uint256 goalAmount,
        uint256 deadline,
        string calldata metadataURI
    ) external returns (uint256 potId) {
        if (payoutAddress == address(0)) revert InvalidAddress();
        if (token == address(0)) revert InvalidAddress();
        if (goalAmount == 0) revert InvalidAmount();
        if (deadline <= block.timestamp) revert InvalidDeadline();

        potId = _pots.length;
        _pots.push(Pot({
            creator: msg.sender,
            payoutAddress: payoutAddress,
            token: token,
            goalAmount: goalAmount,
            totalRaised: 0,
            deadline: deadline,
            withdrawn: false,
            cancelled: false
        }));

        emit PotCreated(potId, msg.sender, token, goalAmount, deadline, metadataURI);
    }

    function contribute(uint256 potId, uint256 amount, string calldata message) external nonReentrant {
        Pot storage pot = _pots[potId];

        if (pot.cancelled) revert PotIsCancelled();
        if (pot.withdrawn) revert PotAlreadyWithdrawn();
        if (block.timestamp > pot.deadline) revert DeadlinePassed();
        if (amount == 0) revert InvalidAmount();

        IERC20(pot.token).safeTransferFrom(msg.sender, address(this), amount);

        pot.totalRaised += amount;
        if (_contributions[potId][msg.sender] == 0) {
            _contributorList[potId].push(msg.sender);
        }
        _contributions[potId][msg.sender] += amount;

        emit ContributionReceived(potId, msg.sender, amount, message);
    }

    function withdraw(uint256 potId) external nonReentrant {
        Pot storage pot = _pots[potId];

        if (msg.sender != pot.creator) revert NotAuthorized();
        if (pot.withdrawn) revert PotAlreadyWithdrawn();
        if (pot.totalRaised == 0) revert NothingToWithdraw();

        pot.withdrawn = true;
        uint256 amount = pot.totalRaised;

        IERC20(pot.token).safeTransfer(pot.payoutAddress, amount);

        emit PotWithdrawn(potId, msg.sender, amount, pot.payoutAddress);
    }

    function cancelPot(uint256 potId) external {
        Pot storage pot = _pots[potId];

        if (msg.sender != pot.creator) revert NotAuthorized();
        if (pot.withdrawn) revert PotAlreadyWithdrawn();
        if (pot.cancelled) revert PotAlreadyCancelled();

        pot.cancelled = true;

        emit PotCancelled(potId, msg.sender);
    }

    function getPot(uint256 potId) external view returns (Pot memory) {
        return _pots[potId];
    }

    function getContributors(uint256 potId) external view returns (address[] memory) {
        return _contributorList[potId];
    }

    function getContribution(uint256 potId, address contributor) external view returns (uint256) {
        return _contributions[potId][contributor];
    }

    function getPotCount() external view returns (uint256) {
        return _pots.length;
    }

    error InvalidAddress();
    error InvalidAmount();
    error InvalidDeadline();
    error PotAlreadyWithdrawn();
    error PotAlreadyCancelled();
    error DeadlinePassed();
    error NotAuthorized();
    error NothingToWithdraw();
}
