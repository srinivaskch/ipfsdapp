App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    // Load pets.
    $.getJSON('../pets.json', function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i ++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.pet-breed').text(data[i].breed);
        petTemplate.find('.pet-age').text(data[i].age);
        petTemplate.find('.pet-location').text(data[i].location);
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

        petsRow.append(petTemplate.html());
      }
    });

    return await App.initWeb3();
  },

  initWeb3:  function() {
    // metamask and mist inject their own web3 instances, so just
    // set the provider if it exists
    if (typeof web3 !== "undefined") {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
      alert('web3.currentProvider value===' +web3.currentProvider.isMetaMask);
    } else {
      // set the provider you want from Web3.providers
      App.web3Provider = new web3.providers.HttpProvider("http://localhost:9545");
      web3 = new Web3(App.web3Provider);
      alert('web3---' +web3);
    }
    alert('App.initContract() callinf' +web3);
    return App.initContract();
  },

  initContract: function() {

    alert ('initContract');
    $.getJSON('Adoption.json', function (data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var AdoptionArtifact = data;
      App.contracts.Adoption = TruffleContract(AdoptionArtifact);
  // Set the provider for our contract.
  App.contracts.Adoption.setProvider(App.web3Provider);

  // Use our contract to retieve and mark the adopted pets.
  return App.markAdopted();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    alert('bindEvents');
    $(document).on('click', '.btn-adopt', App.handleAdopt);
    alert('bindEvents');
  },

  markAdopted: function(adopters, account) {
    var adoptionInstance;

    App.contracts.Adoption.deployed().then(function (instance) {
      adoptionInstance = instance;
  return adoptionInstance.getAdopters.call();
    }).then(function (adopters) {
      for (i = 0; i < adopters.length; i++) {
        if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-pet').eq(i).find('button').text('Adopted').attr('disabled', true);
        }
      }
    }).catch(function (err) {
      console.log(err.message);
    });

  },

  handleAdopt: function(event) {
    alert('handleAdopt');
    event.preventDefault();
    var petId = parseInt($(event.target).data('id'));
    alert('petIs...' +petId);
    var adoptionInstance;
    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }
  var account = accounts[0];
  alert('account...' +account);
  alert('App.contracts.Adoption.deployed()--' +App.contracts.Adoption.deployed());
  App.contracts.Adoption.deployed().then(function (instance) {
    alert('7777777777777777777777');
    adoptionInstance = instance;
    alert('adoptionInstance...' +adoptionInstance);
    return adoptionInstance.adopt(petId, { from: account });
  }).then(function (result) {
    return App.markAdopted();
  }).catch(function (err) {
    alert('err--' +err)
    console.log(err.message);
  });
    });


 }


};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
