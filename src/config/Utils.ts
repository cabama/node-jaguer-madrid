export function everyTrue (array: Array<boolean>): boolean {
    array.forEach(element => {
        if (element == false) {return false}
    });
    return true
}