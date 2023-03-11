export function curry(fn, ...args) {
    return (...restArgs) => {
       return fn(...args, ...restArgs); 
    };
}