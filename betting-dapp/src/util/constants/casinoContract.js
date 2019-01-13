const address = '0x25A593b314119C32527aA0fEc482e9D3b44eE5c1 '
const ABI = [
  {
    'constant': false,
    'inputs': [],
    'name': 'kill',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'name': '_minBet',
        'type': 'uint256'
      },
      {
        'name': '_houseEdge',
        'type': 'uint256'
      }
    ],
    'payable': true,
    'stateMutability': 'payable',
    'type': 'constructor'
  },
  {
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'fallback'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'name': '_status',
        'type': 'bool'
      },
      {
        'indexed': false,
        'name': '_amount',
        'type': 'uint256'
      }
    ],
    'name': 'Won',
    'type': 'event'
  }
]

export {address, ABI}
