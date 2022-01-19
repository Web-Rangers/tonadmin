export default function shortenNumber(number){
    switch(true){
        case (number>=1000000000):
            return (number/1000000000).toFixed(1)+"B";
        case (number > 999999):
            return `${(number / 1000000).toFixed(1)}m`
        case (number > 999): 
            return `${(number / 1000).toFixed(1)}k`
        default:
            return number
    }
}