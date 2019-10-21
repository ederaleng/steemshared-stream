const messages = require('./messages')
const tokens = require('./tokens');

async function onBlock(block){
    // console.log(block)
}
async function onOperation(op, block_num, block_id, previous_block_id, transaction_id, block_time){
    if(op[0]=='custom_json' && op[0].id==='ss_message'){
        console.log(op[1])
        messages(op, block_num, block_id, previous_block_id, transaction_id, block_time)
    }
    if(op[0]=='custom_json' /*&& op[0].id==='ss_auth'*/){
        tokens(op, block_num, block_id, previous_block_id, transaction_id, block_time)
    }
}


module.exports = {
    onBlock,
    onOperation
}