const SBCoin = artifacts.require('SBCoin');
const Airdrop = artifacts.require('Airdrop');
const BigNumber = web3.BigNumber;
require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

contract('Airdrop', function (accounts) {
  before(async function () {
    this.sbCoin = await SBCoin.new({ from: accounts[0] });
    this.airdrop = await Airdrop.new({ from: accounts[0] });
    this.airdropAmount = 666
    this.mockdata = {
      addresses: accounts,
      tokenAmounts: Array(10).fill(this.airdropAmount.toString()),
    }
  });

  describe('Airdrop basic test', function () {
    it('should airdrop to addresses', async function () {
      await this.sbCoin.approve(this.airdrop.address, 1e27);
      await this.airdrop.doAirdrop(
        this.sbCoin.address,
        this.mockdata.addresses,
        this.mockdata.tokenAmounts
      );
      const balance = (await this.sbCoin.balanceOf(accounts[1])).toNumber();
      await balance.should.be.equal(parseInt(await web3.toWei(this.airdropAmount)));
    });
  });
});
