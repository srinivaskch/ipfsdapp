var Election = artifacts.require("./Election.sol");

var electionInstance;

contract("Election", function(accounts){

  it("initializes with threecandidates",function() {
    return Election.deployed().then(function(instance) {
      return instance.candidatesCount();
    }).then(function(count){
      assert.equal(count,3);
    });
  });

  it("it initializes the candidates with the correct values", function() {
      return Election.deployed().then(function(instance) {
        electionInstance  = instance;
        return electionInstance.candidates(1);
      }).then(function(candidate) {
        assert.equal(candidate[0],1,"contains the correct id");
        assert.equal(candidate[1],"TDP","Contains correct name");
        assert.equal(candidate[2],"0","Contains correct votes count");
      });
   });
 });
