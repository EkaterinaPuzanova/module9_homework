const result = document.querySelector('.js-result');
const button = document.querySelector('.js-button-request');
const inputNum = document.querySelector('#input-num');
const inputLimit = document.querySelector('#input-limit');

// Получаем данные с localStorage, если они там есть
const myJSON = localStorage.getItem('myJSON');
if (myJSON) {
    inputNum.value = localStorage.getItem('myNum');
    inputLimit.value = localStorage.getItem('myLimit');
    displayResult(JSON.parse(myJSON));
}

button.addEventListener('click', () => {
    const valueInputNum = Number(inputNum.value);
    const valueInputLimit = Number(inputLimit.value);
    const nonConditionNum = isNaN(valueInputNum) || valueInputNum < 1 || valueInputNum > 10;
    const nonConditionLimit = isNaN(valueInputLimit) || valueInputLimit < 1 || valueInputLimit > 10;    
    if ((isNaN(valueInputNum) && isNaN(valueInputLimit)) || (nonConditionNum && nonConditionLimit)) {
        result.innerHTML = `
            <p class="message">Номер страницы и лимит вне диапазона от 1 до 10</p>
        `;
    } else if (nonConditionNum) {
        result.innerHTML = `
            <p class="message">Номер страницы вне диапазона от 1 до 10</p>
        `;
    } else if (nonConditionLimit) {
        result.innerHTML = `
            <p class="message">Лимит вне диапазона от 1 до 10</p>
        `;
    } else {
        fetch(`https://picsum.photos/v2/list?page=${valueInputNum}&limit=${valueInputLimit}`)
            .then((response) => {
                const resultResponse = response.json();
                return resultResponse;
            })
            .then((data) => {
                localStorage.setItem('myNum', `${valueInputNum}`);
                localStorage.setItem('myLimit', `${valueInputLimit}`);
                localStorage.setItem('myJSON', JSON.stringify(data));
                displayResult(data);
            })
            .catch(() => { console.log('error') });
    }
})

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