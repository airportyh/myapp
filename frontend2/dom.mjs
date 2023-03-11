export function clear(element) {
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
}