const exampleJSON = `
    {
        "list": [
            {
                "name": "Petr",
                "age": "20",
                "prof": "mechanic"
            },
            {
                "name": "Vova",
                "age": "60",
                "prof": "pilot"
            }
        ]
    }
`;

// Функция, которая парсит JSON и выводит в консоль  JS-объект
function parseJSON(jsonString) {
    const DATA = JSON.parse(jsonString);

    let arrResult = [];

    DATA.list.forEach(el => {
        let name = el.name;
        let age = el.age;
        let prof = el.prof;
        arrResult.push({
            name: `${name}`,
            age: `${Number(age)}`,
            prof: `${prof}`
        })
    });

    console.log({
        list: arrResult
    });
}

parseJSON(exampleJSON);

// {
//     list: [
//       { name: 'Petr', age: 20, prof: 'mechanic' },
//       { name: 'Vova', age: 60, prof: 'pilot' },
//     ]
//   }