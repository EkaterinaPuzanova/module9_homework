const exampleXml = `
    <list>
        <student>
            <name lang="en">
                <first>Ivan</first>
                <second>Ivanov</second>
            </name>
            <age>35</age>
            <prof>teacher</prof>
        </student>
        <student>
            <name lang="ru">
                <first>Петр</first>
                <second>Петров</second>
            </name>
            <age>58</age>
            <prof>driver</prof>
        </student>
    </list>
`;

// Функция, которая парсит XML и выводит в консоль  JS-объект
function parseXML(xmlString) {
    const parser = new DOMParser();
    const xmlDOM = parser.parseFromString(xmlString, 'text/xml');

    const list = xmlDOM.querySelector('list');
    const arrStudents = list.querySelectorAll('student');

    let arrResult = [];

    arrStudents.forEach(el => {
        let name = el.querySelector('name');
        let firstName = name.querySelector('first');
        let secondName = name.querySelector('second');
        let age = el.querySelector('age');
        let prof = el.querySelector('prof');
        let langAttr = name.getAttribute('lang');
        arrResult.push({
            name: `${firstName.textContent} ${secondName.textContent}`,
            age: Number(age.textContent),
            prof: `${prof.textContent}`,
            lang: `${langAttr}`
        })
    });

    console.log({list: arrResult});
}

parseXML(exampleXml);

// {
//   list: [
//     { name: 'Ivan Ivanov', age: 35, prof: 'teacher', lang: 'en' },
//     { name: 'Петр Петров', age: 58, prof: 'driver', lang: 'ru' },
//   ]
// }