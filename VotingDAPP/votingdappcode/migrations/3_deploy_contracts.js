var CastYourVote = artifacts.require('./CastYourVote.sol')
var StringUtils = artifacts.require('./StringUtils.sol')

module.exports = function (deployer) {
  deployer.deploy(CastYourVote, 'Congress')
  deployer.link(StringUtils, CastYourVote)
  deployer.deploy(StringUtils)
}
