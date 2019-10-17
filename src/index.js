function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let str = expr.replace('[ ]*', '')
        .replace(/\+/g, ' + ')
        .replace(/-/g, ' - ')
        .replace(/\*/g, ' * ')
        .replace(/\//g, ' / ')
        .replace(/\(/g, ' ( ')
        .replace(/\)/g, ' ) ')
        .replace(/ +/g, ' ')
        .replace(/- \(/g, '+ m (');


    let arr = str.trim().split(' ');

    let priority = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
        'm': 3
    }

    let output = [];
    let operations = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == '-' && (arr[i + 2] == '/' || arr[i + 2] == '*')) {
            arr[i]='+';
            arr.splice(i + 1, 0, 'm');
        }
    }

    arr.forEach(element => {
        if (isFinite(element)) {
            output.push(element);
        } else {
            if (operations.length == 0) {
                operations.push(element)
            } else {
                if (element == "(") {
                    operations.push(element);
                } else if (element == ")") {
                    let index = operations.lastIndexOf("(", operations.length);
                    if (index < 0) {
                        throw ("ExpressionError: Brackets must be paired");
                    } else {
                        let deleted = operations.splice(index, operations.length - index);

                        for (let i = deleted.length - 1; i > 0; i--) {
                            output.push(deleted[i]);
                        }
                    }

                } else if (priority[element] <= priority[operations[operations.length - 1]]) {
                    output.push(operations.pop());
                    operations.push(element);
                } else {
                    operations.push(element);
                }
            }
        }
    });

    for (let i = operations.length - 1; i >= 0; i--) {
        if (operations[i] == '(') {
            throw ("ExpressionError: Brackets must be paired");
        }
        output.push(operations[i]);
    }

    preLast = 0;
    last = 0;

    let result = [];
    while (output.length != 0) {
        let inter = output.shift();

        if (inter == 'm') {
            result.push(-1 * (result.pop()));
            inter = output.shift();
        }

        if (isFinite(inter)) {
            result.push(+inter);
        } else {
            last = result.pop();
            preLast = result.pop();

            if (inter == "+") {
                result.push(preLast + last);
            };
            if (inter == "-") {
                result.push(preLast - last);
            }
            if (inter == "*") {
                result.push(preLast * last);
            }
            if (inter == "/") {
                if (last == 0) {
                    throw ("TypeError: Division by zero.")
                }
                result.push(preLast / last);
            }

        }
    }

    return result[0];
}

module.exports = {
    expressionCalculator
}
