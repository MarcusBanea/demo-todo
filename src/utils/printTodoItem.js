//un singur export DEFAULT permis / fisier
//la export default, numele nu conteaza
export default function printTodoItem(id, title, completed){
    return `${id}. ${title} - ${completed}`;
}

//pot exista mai multe export
//la export, numele conteaza
export const test = "abc";