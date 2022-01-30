const allMoney = document.querySelector('.money')
const setMoney = document.querySelector('.slider__input')
const range = document.querySelector('.slider__range')
const round = document.querySelector('.slider__round')
const buttonsMinus = document.querySelector('.slider__minus')
const buttonsPlus = document.querySelector('.slider__plus')
const bigButtons = document.querySelector('.left-buttons')

const menuList = document.querySelector('.menu-list')
const mainMenuBTN = document.querySelector('.main-menu-btn')
const subMenu = document.querySelector('.sub-menu')
let typeOfPoker
let typeOfBet

// Установка
const money = 50000 // доступных средств
const minMoney = 1000 // минимального взноса
const maxMoney = 100000 // максимального взноса
const bank = 30000 // банк
const maxRange = money > maxMoney ? maxMoney : money
const rank = '1' + String(maxRange).slice(1)

// Стартовая отрисовка
allMoney.innerHTML = money
setMoney.max = maxRange
range.max = maxRange
setMoney.min = minMoney
range.min = minMoney
setMoney.value = Math.round((maxRange + minMoney) / 2)
range.value = Math.round((maxRange + minMoney) / 2)
round.style.left = range.offsetWidth * 0.5 * 0.94 + 'px'

// Отрисовка при изменении value ползунка или инпута
const clickOnRange = (value = range.value) => {
    range.value = value
    setMoney.value = value
    const ratio = (value - minMoney) / (maxRange - minMoney)
    round.style.left = range.offsetWidth * ratio * 0.94 + 'px'
}

// Async функции для кнопок минус и плюс
let isMouseDown = false
const minus = async () => {
    const newValue = Math.round(+range.value - (maxRange / +rank))
    if (newValue >= minMoney) {
        clickOnRange(newValue)
    } else {
        clickOnRange(minMoney)
        isMouseDown = false
    }
    if (isMouseDown) {
        await setTimeout(() => minus(), 100)
    }
}
const plus = async () => {
    const newValue = Math.round(+range.value + (maxRange / +rank))
    if (newValue <= maxRange) {
        clickOnRange(newValue)
    } else {
        clickOnRange(maxRange)
        isMouseDown = false
    }
    if (isMouseDown) {
        await setTimeout(() => plus(), 100)
    }
}
// Следим за кнопками минус и плюс
document.addEventListener("mousedown", (event) => {
    isMouseDown = true
    if (event.target.closest(".slider__minus")) {
        minus()
    } else if (event.target.closest(".slider__plus")) {
        plus()
    }
})
document.addEventListener("touchdown", (event) => {
    isMouseDown = true
    if (event.target.closest(".slider__minus")) {
        minus()
    } else if (event.target.closest(".slider__plus")) {
        plus()
    }
})
document.addEventListener("mouseup", (event) => {
    isMouseDown = false
})
document.addEventListener("touchup", (event) => {
    isMouseDown = false
})

// Следим за движение мыши над ползунком
range.addEventListener("mousemove", (event) => {
    clickOnRange()
})
range.addEventListener("touchmove", (event) => {
    clickOnRange()
})

// Следим за кликами на меню, большие кнопки, ползунке и делигируем
document.addEventListener("click", (event) => {
    if (event.target.closest(".slider__range")) {
        clickOnRange()
    } else if (event.target.closest(".main-menu-btn")) {

        menuList.classList.toggle('shown')
        mainMenuBTN.classList.toggle('rotate180')
        subMenu.classList.remove('shown')
        for (const el of menuList.children) {
            el.children[0].classList.remove('rotate90')
        }
        typeOfPoker = null
    } else if (event.target.closest(".menu-list")) {

        if (!typeOfPoker) {
            typeOfPoker = event.path[1].dataset.item
            event.path[0].classList.add('rotate90')
            subMenu.classList.add('shown')
        } else if (typeOfPoker === event.path[1].dataset.item) {
            event.path[0].classList.remove('rotate90')
            subMenu.classList.remove('shown')
            typeOfPoker = null
        } else {
            for (const el of menuList.children) {
                el.children[0].classList.remove('rotate90')
            }
            event.path[0].classList.add('rotate90')
            typeOfPoker = event.path[1].dataset.item
        }

    } else if (event.target.closest(".sub-menu")) {

        typeOfBet = event.path[1].dataset.item
        menuList.classList.remove('shown')
        if (typeOfPoker === 'FL-H') {
            mainMenuBTN.children[1].children[2].innerHTML = "ФЛ Холдем"
        } else if (typeOfPoker === 'NL-H') {
            mainMenuBTN.children[1].children[2].innerHTML = "НЛ Холдем"
        } else if (typeOfPoker === 'FL-O') {
            mainMenuBTN.children[1].children[2].innerHTML = "ФЛ Омаха"
        } else if (typeOfPoker === 'NL-O') {
            mainMenuBTN.children[1].children[2].innerHTML = "НЛ Омаха"
        }
        mainMenuBTN.children[1].children[0].innerHTML = typeOfBet

        mainMenuBTN.classList.remove('rotate180')
        subMenu.classList.remove('shown')
        for (const el of menuList.children) {
            el.children[0].classList.remove('rotate90')
        }


    } else if (event.target.closest(".bt-min")) {
        clickOnRange(minMoney)
    } else if (event.target.closest(".bt-max")) {
        clickOnRange(maxRange)
    } else if (event.target.closest(".bt-bank")) {
        clickOnRange(bank)
    } else if (event.target.closest(".bt-half")) {
        clickOnRange(bank / 2)
    }
})
range.addEventListener("touchend", (event) => {
    clickOnRange()
})

// Следим за инпутом
setMoney.addEventListener('input', (event) => {
    const newValue = setMoney.value
    if (newValue <= minMoney) {
        clickOnRange(minMoney)
    } else if (newValue >= maxRange) {
        clickOnRange(maxRange)
    } else {
        clickOnRange(newValue)
    }
})
// resize
document.addEventListener("DOMContentLoaded", function(event)
    {window.onresize = () => {
        clickOnRange()
    };
});