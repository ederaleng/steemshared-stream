const { try_parse, json_verify_message } = require('./../utils/blockchain')
const uuid = require('uuid/v1')
const _get = require('lodash/get')
const { Chats, Messages } = require('./../models');


function messages(op, block_num, block_id, previous_block_id, transaction_id, block_time) {
    let operation = try_parse(op[1].json)
    let messages = _get(operation, 'messages', null)
    
    if(messages && messages.length){
        messages.map(async json=>{

            let ok_json = await json_verify_message(json)
            if(ok_json){
                let filter1={ user_1: json.from, user_2: json.to }
                let filter2={ user_1: json.to, user_2: json.from }

                Chats.TwoFilters(filter1, filter2).then(result=>{
                    if(!result){
                        create_new_chat(json, transaction_id, block_num)
                    }else{
                        save_message(result.id, json, transaction_id, block_num)
                    }
                }).catch(error=>{
                    console.log(error)
                })
            }
        })
    }
}


const create_new_chat = async(json, transaction_id, block_num)=>{
    return Chats.create({ id: uuid(), user_1: json.from, user_2: json.to })
    .then(chat=>{
        let idChat = _get(chat, '[0].id', null)
        return save_message(idChat, json, transaction_id, block_num)
    })
    .catch(error=>{
        console.log(error)
    })
}

const save_message = async(id_chat, json, transaction_id, block_num)=>{
    return Messages.create({
        txid: transaction_id,
        block: block_num,
        message: json.message,
        from: json.from,
        to: json.to,
        id_chat: id_chat
    }).then(result=>{
        return result;
    })
}

module.exports = messages;