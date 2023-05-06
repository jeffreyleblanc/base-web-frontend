export function randint(min, max){
    const delta = max-min;
    return min + Math.round(Math.random()*delta);
}

const _base62 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const _base62_len = _base62.length;
export function make_text(num_words=6){
    let result = '';
    for(let i=0; i<num_words; i++){
        let word = '';
        let wlength = randint(1,12);
        for(let j=0; j<wlength; j++){
            word += _base62.charAt(Math.floor(Math.random()*_base62_len));}
        result += word;
        result += ' ';
    }
    return result;
}