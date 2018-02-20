class argParser {
    /* Parses input into a list of arguments
        handles "quoted messages"*/
    static parse(input, argAmount, ignoreMin) {
        let args = [];

        let quote = false;
        let quoteCache = [];

        let cached = 0;

        // We can just return unedited string if argument count is less than 2
        if (argAmount < 2)
            return input;

        // Do a basic split in the beginning
        let split = input.split(' ');
        
        // Loop through the list of split strings
        for (let i = 0; i < split.length; i++) {
            let s = split[i];
            
            // handle multiple whitespaces
            if (s == null)
                continue;
            
            // Check if split string starts with a quote
            if (s[0] == "\"" && quote == false) {
                // Remove quote and add to a seperate list
                quoteCache.push(s.substr(1, s.length - 1));

                // Start seeking for another quote
                quote = true;
                continue;
            }

            if (quote == true) {
                // Check if string ends with a quote, while seeking for one
                if (s[s.length - 1] == "\"") {
                    // Add word to the cache and remove trailing quote
                    quoteCache.push(s.substr(0, s.length - 1));
                    
                    // Join words in the cache and push it to returnable list
                    args.push(quoteCache.join(' '));

                    // Flush cache
                    quoteCache = [];

                    // Stop seeking for quotes
                    quote = false;
                    continue;
                } else {
                    // Add words seperated by whitespace but still inside quotes to cache
                    quoteCache.push(s);
                }
            } else {
                // Add non-quoted words straight to returnable list
                args.push(s);
            }
        }

        // Check if cache contains something and push it to returnable list
        // Handles cases like '"Hello World' without making the string vanish
        if (quoteCache.length > 0)
            args.push(quoteCache.join(' '));

        // Check if the amount of parsed arguments is higher than the output argument amount
        // If so, concat the array to the point the length matches with the argument amount
        if (args.length > argAmount) {
            const spliced = args.splice(0, argAmount - 1);
            spliced.push(args.join(' '));
        }
        
        // Check if we managed to build enough arguments for the command
        // Or if the command even needs a set amount in the first place
        if (args.length == argAmount || ignoreMin)
            return args;
        else
            throw "Not enough arguments!";
    }
}
module.exports = argParser;
