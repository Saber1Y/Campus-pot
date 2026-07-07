// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {CampusPots} from "../src/CampusPots.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MockUSDC is IERC20 {
    string public name = "MockUSDC";
    string public symbol = "mUSDC";
    uint8 public decimals = 6;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    function mint(address to, uint256 amount) external {
        balanceOf[to] += amount;
        totalSupply += amount;
        emit Transfer(address(0), to, amount);
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        allowance[from][msg.sender] -= amount;
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        emit Transfer(from, to, amount);
        return true;
    }
}

contract CampusPotsTest is Test {
    CampusPots public pots;
    MockUSDC public usdc;

    address alice = makeAddr("alice");
    address bob = makeAddr("bob");

    uint256 constant GOAL = 100_000_000; // 100 USDC (6 decimals)
    uint256 constant DEADLINE = 1_000_000_000;
    string constant METADATA = "ipfs://test";
    string constant EMPTY_MESSAGE = "";

    function setUp() public {
        pots = new CampusPots();
        usdc = new MockUSDC();

        usdc.mint(bob, 1_000_000_000);
    }

    function test_CreatePot() public {
        vm.prank(alice);
        uint256 potId = pots.createPot(alice, address(usdc), GOAL, DEADLINE, METADATA);

        CampusPots.Pot memory pot = pots.getPot(potId);
        assertEq(pot.creator, alice);
        assertEq(pot.payoutAddress, alice);
        assertEq(pot.token, address(usdc));
        assertEq(pot.goalAmount, GOAL);
        assertEq(pot.totalRaised, 0);
        assertEq(pot.deadline, DEADLINE);
        assertFalse(pot.withdrawn);
        assertFalse(pot.cancelled);
    }

    function test_CreatePotRevertsWhenPayoutZero() public {
        vm.prank(alice);
        vm.expectRevert(CampusPots.InvalidAddress.selector);
        pots.createPot(address(0), address(usdc), GOAL, DEADLINE, METADATA);
    }

    function test_CreatePotRevertsWhenTokenZero() public {
        vm.prank(alice);
        vm.expectRevert(CampusPots.InvalidAddress.selector);
        pots.createPot(alice, address(0), GOAL, DEADLINE, METADATA);
    }

    function test_CreatePotRevertsWhenGoalZero() public {
        vm.prank(alice);
        vm.expectRevert(CampusPots.InvalidAmount.selector);
        pots.createPot(alice, address(usdc), 0, DEADLINE, METADATA);
    }

    function test_Contribute() public {
        vm.prank(alice);
        uint256 potId = pots.createPot(alice, address(usdc), GOAL, DEADLINE, METADATA);

        uint256 amount = 10_000_000; // 10 USDC

        vm.prank(bob);
        usdc.approve(address(pots), amount);

        vm.prank(bob);
        pots.contribute(potId, amount, "good luck!");

        CampusPots.Pot memory pot = pots.getPot(potId);
        assertEq(pot.totalRaised, amount);

        assertEq(pots.getContribution(potId, bob), amount);

        address[] memory contributors = pots.getContributors(potId);
        assertEq(contributors.length, 1);
        assertEq(contributors[0], bob);
    }

    function test_ContributeMultiple() public {
        vm.prank(alice);
        uint256 potId = pots.createPot(alice, address(usdc), GOAL, DEADLINE, METADATA);

        address charlie = makeAddr("charlie");
        usdc.mint(charlie, 1_000_000_000);

        uint256 bobAmount = 10_000_000;
        uint256 charlieAmount = 20_000_000;

        vm.prank(bob);
        usdc.approve(address(pots), bobAmount);
        vm.prank(bob);
        pots.contribute(potId, bobAmount, "bob here");

        vm.prank(charlie);
        usdc.approve(address(pots), charlieAmount);
        vm.prank(charlie);
        pots.contribute(potId, charlieAmount, "charlie here");

        CampusPots.Pot memory pot = pots.getPot(potId);
        assertEq(pot.totalRaised, bobAmount + charlieAmount);

        address[] memory contributors = pots.getContributors(potId);
        assertEq(contributors.length, 2);
    }

    function test_Withdraw() public {
        vm.prank(alice);
        uint256 potId = pots.createPot(alice, address(usdc), GOAL, DEADLINE, METADATA);

        uint256 amount = 10_000_000;

        vm.prank(bob);
        usdc.approve(address(pots), amount);
        vm.prank(bob);
        pots.contribute(potId, amount, "");

        uint256 aliceBalanceBefore = usdc.balanceOf(alice);

        vm.prank(alice);
        pots.withdraw(potId);

        CampusPots.Pot memory pot = pots.getPot(potId);
        assertTrue(pot.withdrawn);

        uint256 aliceBalanceAfter = usdc.balanceOf(alice);
        assertEq(aliceBalanceAfter - aliceBalanceBefore, amount);
    }

    function test_CancelPot() public {
        vm.prank(alice);
        uint256 potId = pots.createPot(alice, address(usdc), GOAL, DEADLINE, METADATA);

        vm.prank(alice);
        pots.cancelPot(potId);

        CampusPots.Pot memory pot = pots.getPot(potId);
        assertTrue(pot.cancelled);
    }

    function test_CancelPotRevertsWhenNotCreator() public {
        vm.prank(alice);
        uint256 potId = pots.createPot(alice, address(usdc), GOAL, DEADLINE, METADATA);

        vm.prank(bob);
        vm.expectRevert(CampusPots.NotAuthorized.selector);
        pots.cancelPot(potId);
    }

    function test_WithdrawRevertsWhenNotCreator() public {
        vm.prank(alice);
        uint256 potId = pots.createPot(alice, address(usdc), GOAL, DEADLINE, METADATA);

        vm.prank(bob);
        vm.expectRevert(CampusPots.NotAuthorized.selector);
        pots.withdraw(potId);
    }

    function test_ContributeRevertsAfterDeadline() public {
        vm.prank(alice);
        uint256 potId = pots.createPot(alice, address(usdc), GOAL, block.timestamp + 1 days, METADATA);

        vm.warp(block.timestamp + 2 days);

        uint256 amount = 10_000_000;

        vm.prank(bob);
        usdc.approve(address(pots), amount);
        vm.prank(bob);
        vm.expectRevert(CampusPots.DeadlinePassed.selector);
        pots.contribute(potId, amount, "");
    }

    function test_ContributeRevertsWhenCancelled() public {
        vm.prank(alice);
        uint256 potId = pots.createPot(alice, address(usdc), GOAL, DEADLINE, METADATA);

        vm.prank(alice);
        pots.cancelPot(potId);

        uint256 amount = 10_000_000;

        vm.prank(bob);
        usdc.approve(address(pots), amount);
        vm.prank(bob);
        vm.expectRevert(CampusPots.PotIsCancelled.selector);
        pots.contribute(potId, amount, "");
    }

    function test_ContributeRevertsWhenWithdrawn() public {
        vm.prank(alice);
        uint256 potId = pots.createPot(alice, address(usdc), GOAL, DEADLINE, METADATA);

        uint256 amount = 10_000_000;

        vm.prank(bob);
        usdc.approve(address(pots), amount);
        vm.prank(bob);
        pots.contribute(potId, amount, "");

        vm.prank(alice);
        pots.withdraw(potId);

        vm.prank(bob);
        usdc.approve(address(pots), amount);
        vm.prank(bob);
        vm.expectRevert(CampusPots.PotAlreadyWithdrawn.selector);
        pots.contribute(potId, amount, "");
    }

    function test_GetPotCount() public {
        vm.prank(alice);
        pots.createPot(alice, address(usdc), GOAL, DEADLINE, METADATA);

        vm.prank(alice);
        pots.createPot(alice, address(usdc), GOAL, DEADLINE, METADATA);

        assertEq(pots.getPotCount(), 2);
    }
}
