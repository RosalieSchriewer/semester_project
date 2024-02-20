import { createHmac } from 'crypto';
const secret = 'ghkj56a<sd<sg324'

export function generateHash(data){
    const hash = createHmac('sha256',secret)
    .update(data)
    .digest('hex')
    
    return hash;
}
