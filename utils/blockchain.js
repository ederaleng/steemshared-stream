module.exports = {
    json_verify_message(json){
        if(json.hasOwnProperty('from') && json.hasOwnProperty('to') && json.hasOwnProperty('message')){
            if(json.message.startsWith('#'))  return true;

            return false
        }
        return false
    },
    try_parse(json){
        let json_to_return = null
        try {
            json_to_return = JSON.parse(json)
        } catch (error) {
            console.log(error)
        }
        return json_to_return
    }
}