function gcd (a, b){
    let temp;
    while (b>0){
       temp=a%b;
       a=b;
       b=temp;
    }
    return a;
}
 
function rel_prime(phi){
    let rel=5;
    while (gcd(phi,rel)!=1) rel++;
    return rel;
}
 
function power(a, b){
    let temp=1, i;
    for(i=1;i<=b;i++){
        temp*=a;
    }
    return temp;
}
 
function encrypt(N, e, M){
    let r,i=0,prod=1,rem_mod=0;
    while (e>0)
    {
        r=e % 2;
        if (i++==0)
            rem_mod=M % N;
        else
            rem_mod=power(rem_mod,2) % N;
        if (r==1)
        {
            prod*=rem_mod;
            prod=prod % N;
        }
        e=parseInt(e/2);
    }
    return prod;
}
 
function calculate_d(phi,e){
    //d = e^(-1) mod phi(n)
    // de mod phi(n)  = 1 
    // d = (1+k*phi(n)) / e where k = 0,1,2 
    // result must be interger not in float
    let d = 0;
    let k = 0;
    while(1){
        d = (1+(k*phi))/e;
        if(d %1 ===0) break;
        k++;
    }
    return d;
}
 
 
 
function decrypt(c, d, N){
    let r,i=0,prod=1,rem_mod=0;
    while (d>0){
        r=d % 2;
        if (i++==0)
            rem_mod=c % N;
        else
            rem_mod=power(rem_mod,2) % N;
        if (r==1)
        {
            prod*=rem_mod;
            prod=prod % N;
        }
        d=parseInt(d/2);
    }
    return prod;
}

function rsa(type){
    const a = 61,b=53;
    const N = a*b;
    const phi = (a-1)*(b-1);
    const e = rel_prime(phi);
    const d = calculate_d(phi,e);
    if(type === 'encrpyt') return{N,e}
    if(type === 'decrypt') return {N,d};

}

exports.encryptmsg = (msg) => {
    const {N,e} = rsa('encrpyt')
    let cyphier = '';
    //encrypt
    for(let i=0;i<msg.length;i++){
        let ascii = msg[i].charCodeAt(0);
        let c = encrypt(N,e,ascii);
        let char = String.fromCharCode(c);
        cyphier+=char;
    }
    return cyphier;
}

exports.decryptmsg = (cyphier) =>{
    const {N,d} = rsa('decrypt');
    let plain = '';

    //decrpyt
    for(let i=0;i<cyphier.length;i++){
        let ascii = cyphier[i].charCodeAt(0);
        let p = decrypt(ascii,d,N);
        let char = String.fromCharCode(p);
        plain+=char;
    }
    return plain;
}
