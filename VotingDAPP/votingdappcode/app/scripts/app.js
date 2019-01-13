// Import the page's CSS. Webpack will know what to do with it.
import '../styles/app.css'
// Import libraries we need.
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'
// Import our contract artifacts and turn them into usable abstractions.
import VotingArtifacts from '../../build/contracts/CastYourVote.json'

var Voting = contract(VotingArtifacts)
alert('hi')

var candidateList = ['User1']

window.onload = function () {
  window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
  Voting.setProvider(web3.currentProvider)
  console.log('reload')
  Voting.deployed().then(function (votes) {
    for (var i = 0; i < candidateList.length; i++) {
      votes.resetVotes({ from:web3.eth.accounts[0] })
    }
  })
}
