const Bidding = artifacts.require("Bidding");
const owner = '0x38DfecFdA20A4dBDF41cEeA467E3144A6d99BF98'

module.exports = function(deployer) {
	deployer.deploy(Bidding,owner);
};