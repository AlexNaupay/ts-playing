
function identity<T>(value: T): T {
    return value;
}

function identity2(value: any): any {
    return value.length;
}

// Uso con string
const texto = identity<string>("Hola Mundo");
// T = string, value = "Hola Mundo", retorna string
console.log(texto.toUpperCase()); // TypeScript SABE que es string

// Uso con number
const numero = identity<number>(42);
// T = number, value = 42, retorna number
console.log(numero.toFixed(2)); // TypeScript SABE que es number