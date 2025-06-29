// @ts-ignore
const perspectives = "<ul><li>A corto y mediano plazo, no existen indicios asociados al desarrollo de un nuevo proceso eruptivo, por lo que el nivel de alerta volcánica se mantiene en color verde.</li></ul>";

const regexx = /<li>(.*?)<\/li>/g;
console.log(regexx.lastIndex)
if (regexx.test(perspectives)) {
    regexx.lastIndex = 0;
    // console.log(regexx.lastIndex)
    const result = Array.from(perspectives.matchAll(regexx)).map((m)=> console.log(m[1]));
    console.log(result);
}

console.log(regexx.lastIndex)
// Usamos matchAll
const matchesx = Array.from(perspectives.matchAll(regexx));
// Filtramos solo los que tengan contenido capturado en el grupo 1
const result: string[] = matchesx
    .filter(match => match[1]) // aseguramos que haya contenido
    .map(match => match[1]);   // extraemos el texto capturado

console.log(result);