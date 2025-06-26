function extractLisFromHtml(html: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return Array.from(doc.querySelectorAll('li')).map((li) => li.textContent);
}

const perspectives = "<ul><li>A corto y mediano plazo, no existen indicios asociados al desarrollo de un nuevo proceso eruptivo, por lo que el nivel de alerta volcánica se mantiene en color verde.</li></ul>";

console.log(extractLisFromHtml(perspectives));