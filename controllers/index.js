const uuid = require('uuid')
const _get = require('lodash/get')
const { tryParse, jsonVerify } = require('./../utils/blockchain')
const { Chats, Messages } = require('./../models');

async function onBlock(block){
    // console.log(block)
}
async function onOperation(op, block_num, block_id, previous_block_id, transaction_id, block_time){
    if(op[0]=='custom_json'){
        let operation = tryParse(op[1].json)
        let messages = _get(operation, 'messages', null)
        
        if(messages && messages.length){
            messages.map(async json=>{

                let ok_json = await jsonVerify(json)
                if(ok_json){
                    let filter1={ user_1: json.from, user_2: json.to }
                    let filter2={ user_1: json.to, user_2: json.from }

                    Chats.TwoFilters(filter1, filter2).then(result=>{
                        if(!result){
                            createNewChat(json, transaction_id, block_num)
                        }else{
                            saveMessage(result.id, json, transaction_id, block_num)
                        }
                    }).catch(error=>{
                        console.log(error)
                    })
                }
            })
        }
    }
}

const createNewChat = (json, transaction_id, block_num)=>{
    Chats.create({ id: uuid(), user_1: json.from, user_2: json.to })
    .then(chat=>{
        let idChat = _get(chat, '[0].id', null)
        saveMessage(idChat, json, transaction_id, block_num)
    })
    .catch(error=>{
        console.log(error)
    })
}

const saveMessage = (id_chat, json, transaction_id, block_num)=>{
    Messages.create({
        txid: transaction_id,
        block: block_num,
        message: json.message,
        from: json.from,
        to: json.to,
        id_chat: id_chat
    }).then(result=>{
        console.log(result)
        return result;
    })
}

module.exports = {
    onBlock,
    onOperation
}