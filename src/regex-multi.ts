const html = `<ul><li>Se ha identificado la ocurrencia promedio de 5 sismos por día, con magnitudes menores a M2.1 e hipocentros a 1 km de profundidad, asociados a procesos de ruptura de rocas en el interior del volcán.</li><li>La sismicidad mantiene su nivel habitual.</li><li>Se observaron emisiones de gases y vapor de agua de hasta 100 m de altura sobre la cima del volcán.</li><li>No se ha registrado deformación significativa en el edificio volcánico.</li><li>No se detectaron anomalías térmicas ni de emisiones de gases magmáticos.</li></ul>`;

// Expresión regular para extraer el contenido de los <li>
const regex = /<li>(.*?)<\/li>/g;
const resultados: string[] = [];

// 1. regexp.test
// true si hay al menos una coincidencia, false en caso contrario.

// 2. regexp.exec
let match;
// regex.exec(string). Primera coincidencia: Un array con el texto coincidente, grupos de captura y propiedades
// Con /g Cada llamada a exec() avanza al siguiente match.
while ((match = regex.exec(html)) !== null) {
    resultados.push(match[1]);
}
console.log(resultados);

/** 3. Modern: str.matchAll
* Retorna: Un iterador con todos los matches, incluyendo grupos.
* Requiere flag g.
*/
const resultados2 = Array.from(html.matchAll(regex)).map(m => m[1]);
console.log(resultados2);

const strA = "John Doe, Jane Smith";
const regexA = /(\w+)\s(\w+)/g;
const matches = [...strA.matchAll(regexA)];
/*
  [
    ["John Doe", "John", "Doe", index: 0, ...],
    ["Jane Smith", "Jane", "Smith", index: 10, ...]
  ]
*/

/**
 * 4. str.match
 * Sin flag g: Igual que exec(), devuelve un array con el match completo y grupos.
 * Con flag g: Devuelve un array con todas las coincidencias (sin grupos ni detalles).
 */
const str = "Hello World";
str.match(/o/);       // ["o", index: 4, input: "Hello World"]
str.match(/o/g);      // ["o", "o"] (solo matches, sin grupos)
str.match(/(\w+)\s(\w+)/); // ["Hello World", "Hello", "World", ...]