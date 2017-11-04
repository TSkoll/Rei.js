const async = require('async');

class argParser {
    static parse(input, argAmount, minArgs, ignoreMin) {
        let args = [];

        let quote = false;
        let quoteCache = [];

        if (argAmount < 2)
            return input;

        let split = input.split(' ');
        for (let i = 0; i < input.length; i++) {
            let s = split[i];

            if (s == null)
                continue;

            if (s[0] == "\"" && quote == false) {
                quoteCache.push(s.substr(1, s.length - 1));

                quote = true;
                continue;
            }

            if (quote == true) {
                if (s[s.length - 1] == "\"") {
                    quoteCache.push(s.substr(0, s.length - 1));
                    args.push(quoteCache.join(' '));
                    quoteCache = [];

                    quote = false;
                    continue;
                } else {
                    quoteCache.push(s);
                }
            } else {
                args.push(s);
            }
        }

        if (quoteCache.length > 0)
            args.push(quoteCache.join(' '));
        
        if (args.length == argAmount && ignoreMin)
            throw "Not enough arguments!";
        else
            return args;
    }
}
module.exports = argParser;