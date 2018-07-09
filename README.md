# ERC20 Token Airdrop

### source code
```javascript
pragma solidity ^0.4.24;

import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";


contract Airdrop is Ownable {
  /**
   * @dev do Airdrop to address
   * @param _tokenAddr address the erc20 token address
   * @param dests address[] addresses to airdrop
   * @param values uint256[] value(in ether) to airdrop
   */
  function doAirdrop(address _tokenAddr, address[] dests, uint256[] values) onlyOwner public
    returns (uint256) {
    uint256 i = 0;
    while (i < dests.length) {
      ERC20(_tokenAddr).transferFrom(msg.sender, dests[i], values[i] * (10 ** 18));
      i += 1;
    }
    return(i);
  }


```
### usage

```js
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

```

```sh
# test

npm run test

```
