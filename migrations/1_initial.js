var Migrations = artifacts.require("./Migrations.sol");
var Erc20token) = artifacts.require("./Erc20token.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Erc20token);
};
