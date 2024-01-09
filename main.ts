// One thing to note is that sometime it seems as though the values in the output are duplicated but I believe they are being randomly generated over and over agin because this issue does not occur with a smaller list size
let small: number[] = []
let list: number[] = []
let good: number[][] = []
let bad: number[][] = []
let _true = false
let output = ""
// Creates a list of 1000 randomly generate values from 1-999
for (let index = 0; index < 1000; index++) {
    list.unshift(randint(1, 999))
}
// User input for inning number
let winning = game.askForNumber("What's the winning number? ", 4)
// Goes through every combination in the list: N^2
for (let value of list) {
    for (let index = 0; index <= list.length - 1; index++) {
        // Checks if the index for the value and the other number are not the same because this could not occur in real life.
        if (list.indexOf(value) != index) {
            // Checks if the numbers add up to the winning ticket, and adds them to an array of all the winning pair, and then marks that there is a winning pair. It also removes the values from the list to make sure they do not get entered multiple times with the same value
            if (value + list[index] == winning) {
                good.push([value, list.removeAt(index)])
                _true = true
                list.removeAt(list.indexOf(value))
            } else {
                // If the numbers do not add up to be a winning ticket the numbers get stored in a list along with the difference between their sum and the winning number, and then they get removed from the list in order to ensure that there are no repeats
                bad.push([value, list[index], Math.abs(winning - (value + list[index]))])
                list.removeAt(index)
                list.removeAt(list.indexOf(value))
            }
        }
    }
}
// Converts the list of good values into a string that can be displayed
if (_true) {
    for (let value of good) {
        output = "" + output + " [" + value[0] + ", " + value[1] + "]"
    }
    game.splash(output)
} else {
    small = [0, bad[0][2]]
    // If there are no pairs that sum up to the winning number, it searches for a pair with the smallest difference and then stores it in a list with the index to the pair
    for (let value of bad) {
        if (value[2] < small[1]) {
            small = [bad.indexOf(value), value[2]]
        }
    }
    // Outputs the clostest pair by using the stored index to wind each number in the list of non-winning values.
    game.splash("" + convertToText(bad[small[0]][0]) + ", " + convertToText(bad[small[0]][1]))
}
