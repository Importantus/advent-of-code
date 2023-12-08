// BY https://usingmaths.com/primary/javascript/lcm.php

var all_factors: number[] = []; // factors to our set_of_numbers
var index = 0; // index into array all_factors
/* To avoid recording the same factor multiple times
 count off as it is used on the different numbers. */
var state_check = false;

/* Pass of Array(according to javascript) is by reference;
 so make a copy that will be passed instead. */
var arg_copy: number[] = [];

var i = 2; // start checking for factors from variable 2

/*
 * Our function checks 'set_of_numbers';
 * If it finds a factor, it records(once for each round) this factor;
 * then divides 'set_of_numbers' by the factor found
 * and makes this the new 'set_of_numbers'.
 * It continues recursively until all factors are found.
 */
function getLCMFactors() {
    // STEP 1:
    // Sort in descending order
    arg_copy.sort(
        function (a, b) {
            return b - a;
        }
    );
    while (i <= arg_copy[0]) {
        state_check = false;
        // STEP 2:
        for (var j = 0; j < arg_copy.length; j++) {
            if ((arg_copy[j] % i) == 0) {
                // STEP 3:
                arg_copy[j] /= i;
                if (state_check == false) {
                    all_factors[index++] = i;
                }
                state_check = true; //do not store the factor twice
            }
        }
        // STEP 4:
        if (state_check == true) {
            return getLCMFactors();
        }
        i++;
    }
    return;
}

export function getLCM(group: number[]) {
    // Make a local copy
    for (var j = 0; j < group.length; j++) {
        arg_copy[j] = group[j];
    }
    getLCMFactors();

    var LCM = 1;
    for (var k = 0; k < all_factors.length; k++) {
        LCM *= all_factors[k];
    }

    return LCM;
}