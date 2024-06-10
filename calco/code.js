const quer= document.getElementById("quer")
const lastNum= document.getElementById("lastNum")
const lc= document.getElementById("lc")




function press(num)
{
    if(lc.innerHTML== '='){
        quer.innerHTML = quer.innerHTML.substring(quer.innerHTML.indexOf('=')+1);
        if(quer.innerHTML.indexOf('.')==-1)
        {
            lc.innerHTML='';
        }else{
            lc.innerHTML='.';
        }
    }
    switch(num){
        case 'del':
            quer.innerHTML = quer.innerHTML.slice(0,quer.innerHTML.length-1);
            break;
        case 'c':
            quer.innerHTML = '';
            lc.innerHTML='';
            lastNum.innerHTML='';
            break;
        case 'ce':
            if(lc=='=' || lc=='')
            {
                quer.innerHTML = '';
            }else{
                quer.innerHTML = quer.innerHTML.substring(0,quer.innerHTML.indexOf(lc.innerHTML)+1);
            }
            break;
        case '.':
            if(lc.innerHTML=='.'){
                break;
            }

        case '+':
        case '-':
        case '*':
        case '/':
            if((lc.innerHTML=='' || quer.innerHTML.charAt(quer.innerHTML.length-1)!=lc.innerHTML) && quer.innerHTML!='')
            {
                lc.innerHTML = num;
                quer.innerHTML+=String(num);
            }else{
                console.log("error")
            }
            break;
        default:
            lastNum.innerHTML = num;
            quer.innerHTML+=String(num);
            break;
    }
    // if(num=='+'|| num=='-'|| num=='*'|| num=='/')
    // {
    //     lc.innerHTML = num;
    // }else{   
    //     lastNum.innerHTML = num;
    //  }
   // quer.innerHTML+=String(num);
}

function eq() {
    let ans = quer.innerHTML;
    if((lc.innerHTML== ''|| ans.charAt(quer.innerHTML.length-1)!=lc.innerHTML) && lc.innerHTML!='=')
    {
        ans = kefel(ans);    // Handle multiplication first
        ans = hilok(ans);    // Handle division next
        ans = plusminus(ans); // Handle addition and subtraction last
        quer.innerHTML += '=';
        lc.innerHTML = '=';
        quer.innerHTML += ans;
    }else{
        console.log("error")
    }
}

function plusminus(ans) {
    while (ans.indexOf('-') !== -1 || ans.indexOf('+') !== -1) {
        let minusIndex = ans.indexOf('-');
        let plusIndex = ans.indexOf('+');

        if (minusIndex === -1) minusIndex = ans.length;
        if (plusIndex === -1) plusIndex = ans.length;

        let ind = Math.min(minusIndex, plusIndex);
        let indchar = (ind === minusIndex) ? '-' : '+';

        const beforef = ans.substring(0, ind);
        const afterf = ans.substring(ind + 1);

        const beforeMatch = beforef.match(/(\d+(\.\d+)?)(?!.*\d+(\.\d+)?)/);        
        const afterMatch = afterf.match(/^\d+(\.\d+)?/);

        const beforeNumber = beforeMatch ? beforeMatch[0] : null;
        const afterNumber = afterMatch ? afterMatch[0] : null;
        let subExpression;

        if (beforeNumber && afterNumber) {
            let result;
            if (indchar === '+') {
                result = parseFloat(beforeNumber) + parseFloat(afterNumber);
                subExpression = beforeNumber + '+' + afterNumber;
            } else {
                result = parseFloat(beforeNumber) - parseFloat(afterNumber);
                subExpression = beforeNumber + '-' + afterNumber;
            }

            ans = ans.replace(subExpression, result.toString());
        } else {
            break; // If numbers are not found, exit the loop to avoid an infinite loop
        }
    }
    return ans;
}

function kefel(ans) {
    while (ans.indexOf('*') !== -1) {
        const multiplyIndex = ans.indexOf('*');

        const beforeMultiply = ans.substring(0, multiplyIndex);
        const afterMultiply = ans.substring(multiplyIndex + 1);

        const beforeMatch = beforeMultiply.match(/(\d+(\.\d+)?)(?!.*\d+(\.\d+)?)/);
        const afterMatch = afterMultiply.match(/^\d+(\.\d+)?/);

        const beforeNumber = beforeMatch ? beforeMatch[0] : null;
        const afterNumber = afterMatch ? afterMatch[0] : null;

        if (beforeNumber && afterNumber) {
            const result = parseFloat(beforeNumber) * parseFloat(afterNumber);
            const subExpression = beforeNumber + '*' + afterNumber;
            ans = ans.replace(subExpression, result.toString());
        }
    }
    return ans;
}

function hilok(ans) {
    while (ans.indexOf('/') !== -1) {
        const divideIndex = ans.indexOf('/');

        const beforeDivide = ans.substring(0, divideIndex);
        const afterDivide = ans.substring(divideIndex + 1);

        const beforeMatch = beforeDivide.match(/(\d+(\.\d+)?)(?!.*\d+(\.\d+)?)/);
        const afterMatch = afterDivide.match(/^\d+(\.\d+)?/);

        const beforeNumber = beforeMatch ? beforeMatch[0] : null;
        const afterNumber = afterMatch ? afterMatch[0] : null;

        if (beforeNumber && afterNumber) {
            const result = parseFloat(beforeNumber) / parseFloat(afterNumber);
            const subExpression = beforeNumber + '/' + afterNumber;
            ans = ans.replace(subExpression, result.toString());
        }
    }
    return ans;
}