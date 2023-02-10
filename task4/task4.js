const result = document.querySelector('.js-result');
const button = document.querySelector('.js-button-request');

button.addEventListener('click', () => {
    let inputWidth = document.querySelector('#input-width');
    let inputHeigth = document.querySelector('#input-heigth');
    let valueInputWidth = Number(inputWidth.value);
    let valueInputHeigth = Number(inputHeigth.value);
    if (isNaN(valueInputWidth) || isNaN(valueInputHeigth)) {
        result.innerHTML = `
            <p class="message">Одно из чисел вне диапазона от 100 до 300</p>
        `;
    }
    if (valueInputWidth >= 100 && valueInputWidth <= 300 && valueInputHeigth >= 100 && valueInputHeigth <= 300) {
        fetch(`https://picsum.photos/${valueInputWidth}/${valueInputHeigth}`)
            .then((response) => {
                const resultResponse = response.blob();
                return resultResponse;
            })
            .then((data) => {
                result.innerHTML = `
                    <img src="${URL.createObjectURL(data)}" class="image"/>
                `;
            })
            .catch(() => { console.log('error') });
    } else {
        result.innerHTML = `
            <p class="message">Одно из чисел вне диапазона от 100 до 300</p>
        `;
    }
})
