const { try_parse } = require('./../utils/blockchain')
const _get = require('lodash/get')
const { Tokens } = require('./../models');


function token(op, block_num, block_id, previous_block_id, transaction_id, block_time) {
    let operation = try_parse(op[1].json)
    let username = _get(operation, 'username', null)
    let public_token = _get(operation, 'public_token', null)

    if(username && public_token){

        Tokens.findOne({ public_token, active: false  }).then(result=>{
            if(result){
                return update_token(username, public_token, transaction_id)
            }
        }).catch(error=>{
            console.log(error)
        })

    }
}


function update_token(username, public_token, trx_id){
    return Tokens.update(public_token, { username, active: true, trx_id }).then(result=>{
        if(result){
            return result
        }
    }).catch(error=>{
        console.log(error)
    })
}


module.exports = token;