const elementsInputQtyCount = document.querySelectorAll('.quantity_input')

const elementsBtnQtyPlus = document.querySelectorAll('.quantity__plus-btn')
const elementsBtnQtyMinus = document.querySelectorAll('.quantity__minus-btn')

const elementsProductPriceCurrent = document.querySelectorAll('.cart-item__price-current')
const elementsProductTotal = document.querySelectorAll('.cart-item__product-total')

const elementSubTotalText = document.querySelector('.cart-product-footer-summary__subtotal-text')
const elementSubTotal = document.querySelector('.cart-product-footer-summary__subtotal-amount')

const cart = {
    addQuantity: () => {
        for (let i = 0; i < elementsBtnQtyPlus.length; ++i) {
            elementsBtnQtyPlus[i].onclick = (e) => {
                var countQuantity = elementsInputQtyCount[i].value
                countQuantity++
                elementsInputQtyCount[i].value = countQuantity
                elementsProductTotal[i].innerText = countQuantity * parseInt(elementsProductPriceCurrent[i].innerText)

                cart.subTotalText()
                cart.subTotal()
            }
        }
        for (let i = 0; i < elementsBtnQtyMinus.length; ++i) {
            elementsBtnQtyMinus[i].onclick = (e) => {
                var countQuantity = elementsInputQtyCount[i].value
                if (countQuantity > 1) {
                    countQuantity--
                    elementsInputQtyCount[i].value = countQuantity

                    elementsProductTotal[i].innerText = countQuantity * parseInt(elementsProductPriceCurrent[i].innerText)

                    cart.subTotalText()
                    cart.subTotal()
                }
            }
        }
        // var inputValue
        for (let i = 0; i < elementsInputQtyCount.length; ++i) {
            elementsInputQtyCount[i].onblur = (e) => {
                inputValue = e.target.value
                if (inputValue) {
                    elementsProductTotal[i].innerText = inputValue * parseInt(elementsProductPriceCurrent[i].innerText)

                    cart.subTotalText()
                    cart.subTotal()
                }
            }
        }
    },
    subTotalText: () => {
        var subTotalText = 0
        for (let i = 0; i < elementsInputQtyCount.length; ++i) {
            subTotalText += parseInt(elementsInputQtyCount[i].value)
        }
        elementSubTotalText.innerText = `Tổng tiền hàng (${subTotalText} Sản phẩm):`
    },
    subTotal: () => {
        var subTotal = 0
        for (let i = 0; i < elementsProductTotal.length; ++i) {
            subTotal += parseInt(elementsProductTotal[i].innerText)
        }
        elementSubTotal.innerHTML = subTotal
        // elementSubTotal.innerHTML = '₫' + new Intl.NumberFormat('de-DE').format(subTotal)
    },
    start: function () {
        this.addQuantity()
        this.subTotal()
        this.subTotalText()
    }
}

cart.start()