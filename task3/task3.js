const result = document.querySelector('.js-result');
const button = document.querySelector('.js-button-request');

button.addEventListener('click', () => {
    let input = document.querySelector('input');
    let valueInput = Number(input.value);
    if (isNaN(valueInput) || valueInput < 1 || valueInput > 10) {
        result.innerHTML = `
            <p class="message">Число вне диапазона от 1 до 10</p>
        `;
    } else {
        useRequest(`https://picsum.photos/v2/list?limit=${valueInput}`, displayResult);
    }
})


function useRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    
    xhr.onload = function() {
        if (xhr.status != 200) {
            console.log('Статус ответа: ', xhr.status);
        } else {
            const result = JSON.parse(xhr.response);
            if (callback) {
                callback(result);
            }
        }
    };
    
    xhr.onerror = function() {
        console.log('Ошибка! Статус ответа: ', xhr.status);
    };
    
    xhr.send();
};

function displayResult(data) {
    let cards = '';
    
    data.forEach(el => {
        const cardHTML = `
            <div class="card">
                <img src="${el.download_url}" class="card__image"/>
                <p class="card__author">${el.author}</p>
            </div>
        `;
        cards += cardHTML;
    });
    

    result.innerHTML = cards;
}
