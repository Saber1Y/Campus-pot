// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {CampusPots} from "../src/CampusPots.sol";

contract DeployCampusPots is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);

        console.log("Deployer:", deployer);
        console.log("Balance:", deployer.balance);

        vm.startBroadcast(deployerPrivateKey);

        CampusPots pots = new CampusPots();

        vm.stopBroadcast();

        console.log("CampusPots deployed at:", address(pots));
    }
}
