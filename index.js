// blockchain
const steem_interface = require('steem-interface')
const { onBlock, onOperation } = require('./controllers')

steem_interface.init(require('./config/blockchain'));
steem_interface.stream({   on_op: onOperation, on_block: onBlock  });