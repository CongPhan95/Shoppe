const elementListProduct = document.querySelector('.list-product');
const elementInputQtyCount = document.querySelector('.quantity_input');
const elementBtnQtyPlus = document.querySelector('.quantity__plus-btn');
const elementBtnQtyMinus = document.querySelector('.quantity__minus-btn');
const quantityCart = document.querySelector('.header__cart-qty');
const elementAddToCart = document.querySelector('.product__cart-add');

// Product detail
const imageProduct = document.querySelector('.product__img')
const nameProduct = document.querySelector('.product__name')
const priceProduct = document.querySelector('.product__price-old')
const priceCurrentProduct = document.querySelector('.product__price-current')
const discountProduct = document.querySelector('.product__price-discount')

const CART_STORAGE_KEY = 'CART'
// const PRODUCT_DETAIL_STORAGE_KEY = 'PRODUCT_DETAIL'


// API
var productsApi = 'http://localhost:3000/products'
var imagesApi = 'http://localhost:3000/images'
var image_productApi = 'http://localhost:3000/image_product'

const app = {
    config: JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || {},

    products: [
        {
            id: 1,
            name: 'Mắt Kính Gọng Tròn Phong Cách Retro Cho Nữ Mắt Kính Gọng Tròn Phong Cách Retro Cho Nữ',
            image: 'https://cf.shopee.vn/file/8d090e77aa3e9b43530b4a8ea6909884_tn',
            price: 199000,
            price_current: 119000,
            category_product: 'Mắt kính nữ',
            attribute_product: 'Gọng tròn',
            inventory: 1000,
        },
        {
            id: 2,
            name: 'Giày thể thao nam Đức Sport G5548 (39-43) tặng tất khử mùi',
            image: 'https://cf.shopee.vn/file/5a49e88cb43fd9d690dfb30eb8315513',
            price: 350000,
            price_current: 299000,
            category_product: 'Giày Dép Nam',
            attribute_product: 'Giày thể thao',
            inventory: 300,
        },
        {
            id: 3,
            name: '[Rẻ Vô Địch Áo cotton tay lỡ Unisex Do you have such -- Tom and Jerry',
            image: 'https://cf.shopee.vn/file/0f1fa7752f7d57a091672a33ad47e932',
            price: 66000,
            price_current: 33000,
            category_product: 'Thời Trang Nữ',
            attribute_product: 'Áo thun',
            inventory: 95,
        },
        {
            id: 4,
            name: '[AP2234] Áo thun tay lỡ unisex nam nữ TOM dáng suông thụng phom rộng basic thấm hút mồ hôi',
            image: 'https://cf.shopee.vn/file/4eab8e9389ff4c8d0acd5b24500326c7',
            price: 120000,
            price_current: 89000,
            category_product: 'Thời Trang Nữ',
            attribute_product: 'Áo thun',
            inventory: 195,
        },
        {
            id: 5,
            name: 'Áo hoa cổ vuông phong cách ngọt ngào gợi cảm cho nữ',
            image: 'https://cf.shopee.vn/file/84e1a3dd826bc184fd7e6af3fe4f6e53',
            price: 183000,
            price_current: 95000,
            category_product: 'Thời Trang Nữ',
            attribute_product: 'Áo kiểu',
            inventory: 4571,
        },
        {
            id: 6,
            name: 'Áo hoa cổ vuông phong cách ngọt ngào gợi cảm cho nữ',
            image: 'https://cf.shopee.vn/file/6fc86e5970baffbd3676616b34156da5',
            price: 183000,
            price_current: 95000,
            category_product: 'Thời Trang Nữ',
            attribute_product: 'Áo kiểu',
            inventory: 4571,
        },
        {
            id: 7,
            name: 'Áo hoa cổ vuông phong cách ngọt ngào gợi cảm cho nữ',
            image: 'https://cf.shopee.vn/file/6fc86e5970baffbd3676616b34156da5',
            price: 183000,
            price_current: 95000,
            category_product: 'Thời Trang Nữ',
            attribute_product: 'Áo kiểu',
            inventory: 4571,
        },
        {
            id: 8,
            name: 'Áo hoa cổ vuông phong cách ngọt ngào gợi cảm cho nữ',
            image: 'https://cf.shopee.vn/file/6fc86e5970baffbd3676616b34156da5',
            price: 183000,
            price_current: 95000,
            category_product: 'Thời Trang Nữ',
            attribute_product: 'Áo kiểu',
            inventory: 4571,
        },
        {
            id: 9,
            name: 'Áo hoa cổ vuông phong cách ngọt ngào gợi cảm cho nữ',
            image: 'https://cf.shopee.vn/file/6fc86e5970baffbd3676616b34156da5',
            price: 183000,
            price_current: 95000,
            category_product: 'Thời Trang Nữ',
            attribute_product: 'Áo kiểu',
            inventory: 4571,
        },
        {
            id: 10,
            name: 'Áo hoa cổ vuông phong cách ngọt ngào gợi cảm cho nữ',
            image: 'https://cf.shopee.vn/file/6fc86e5970baffbd3676616b34156da5',
            price: 183000,
            price_current: 95000,
            category_product: 'Thời Trang Nữ',
            attribute_product: 'Áo kiểu',
            inventory: 4571,
        },
    ],

    setConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.config))
    },

    render: async () => {
        try {
            const responseProduct = await axios.get(productsApi)
            const responseImageProduct = await axios.get(image_productApi)
            const responseImage = await axios.get(imagesApi)
            const products = responseProduct.data
            const htmls = products.map((product, index) => {
                var imageProduct = responseImageProduct.data.find((imageProduct) => {
                    return imageProduct.productId === product.id
                })
                var image = responseImage.data.find((image) => {
                    return image.id === imageProduct.imageId
                })
                return `
                    <div class="col l-2-4 m-4 c-6 item-product" data-index="${index}">
                        <a href="./product-detail.html" class="home-product-item">
                            <div class="home-product-item__img"
                                style="background-image: url(${image.path});">
                            </div>
                            <h4 class="home-product-item__name">${product.name}</h4>
                            <div class="home-product-item__price">
                                <span class="home-product-item__price-old">${product.price}đ</span>
                                <span class="home-product-item__price-current">${product.price_current}đ</span>
                            </div>
                            <div class="home-product-item__action">
                                <span class="home-product-item__like home-product-item__like--liked">
                                    <i class="home-product-item__like-icon-empty far fa-heart"></i>
                                    <i class="home-product-item__like-icon-fill fas fa-heart"></i>
                                </span>
                                <div class="home-product-item__rating">
                                    <i class="home-product-item__star--gold fas fa-star"></i>
                                    <i class="home-product-item__star--gold fas fa-star"></i>
                                    <i class="home-product-item__star--gold fas fa-star"></i>
                                    <i class="home-product-item__star--gold fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                </div>
                                <span class="home-product-item__sold">88 đã bán</span>
                            </div>
                            <div class="home-product-item__origin">
                                <span class="home-product-item__brand">Whoo</span>
                                <span class="home-product-item__origin-name">Nhật Bản</span>
                            </div>
                            <div class="home-product-item__favourite">
                                <i class="fas fa-check"></i>
                                <span>Yêu thích</span>
                            </div>
                            <div class="home-product-item__sale-off">
                                <span class="home-product-item__sale-off-percent">${Math.ceil(100 - ((product.price_current / product.price) * 100))}%</span>
                                <span class="home-product-item__sale-off-label">GIẢM</span>
                            </div>
                        </a>
                    </div>
                `
            })
            if (elementListProduct) {
                elementListProduct.innerHTML = htmls.join('')
            }
        } catch (error) {
            console.log('Failed fetch: ', error)
        }
    },

    loadDetailProduct: function () {
        if (this.config.Product_Detail) {
            nameProduct.firstElementChild.innerText = this.config.Product_Detail.name
            priceProduct.innerText = '₫' + new Intl.NumberFormat('de-DE').format(this.config.Product_Detail.price)
            priceCurrentProduct.innerText = '₫' + new Intl.NumberFormat('de-DE').format(this.config.Product_Detail.price_current)
            discountProduct.innerText = Math.ceil(100 - ((this.config.Product_Detail.price_current / this.config.Product_Detail.price) * 100)) + '% giảm'
        }
    },

    handleEvent: function () {
        const _this = this

        // Xử lý lưu chi tiết sản phẩm vào localStorage
        if (elementListProduct) {
            elementListProduct.onclick = async (e) => {
                const nodeProduct = e.target.closest('.item-product')
                const indexProduct = Number(nodeProduct.dataset.index)
                if (nodeProduct) {
                    const responseProduct = await axios.get(productsApi)
                    // console.log('index', responseProduct.data[indexProduct])
                    const product = responseProduct.data[indexProduct]
                    this.setConfig('Product_Detail', product)
                    _this.loadDetailProduct()
                }
            }
        }
    },

    addQuantity: function () {
        if (elementInputQtyCount) {
            var countQuantity = elementInputQtyCount.value;
            elementBtnQtyPlus.onclick = () => {
                countQuantity++;
                elementInputQtyCount.value = countQuantity;
            }
            elementBtnQtyMinus.onclick = () => {
                if (countQuantity > 1) {
                    countQuantity--;
                    elementInputQtyCount.value = countQuantity;
                }
            }
        }
    },

    addToCart: function () {
        const _this = this;
        if (elementAddToCart) {
            elementAddToCart.onclick = () => {
                quantityCart.classList.add('header__cart-notice');
                if (_this.config.Cart) {
                    var quantity = parseInt(_this.config.Cart) + parseInt(elementInputQtyCount.value)
                } else {
                    var quantity = elementInputQtyCount.value
                }
                quantityCart.innerText = quantity
                _this.setConfig('Cart', quantity);
            }
        }
    },

    start: function () {
        this.handleEvent()
        this.addQuantity()
        this.addToCart()

        this.render()

        this.loadDetailProduct()

        if (this.config.Cart) {
            quantityCart.innerText = this.config.Cart
            quantityCart.classList.add('header__cart-notice');
        }
    }
}

app.start()

// function start() {
//     addQuantity()
//     addToCart()
// }
// start()

function thumbnail(x) {
    if (x) {
        // remove active first
        const elementThumbAll = document.querySelectorAll('.col-pad-6');
        for (let i = 0; i < elementThumbAll.length; ++i) {
            elementThumbAll[i].lastElementChild.classList.remove('_3_iWCp');
        }

        const elementImgMain = document.querySelector('.product__img');
        const firstChild = x.firstElementChild;
        elementImgMain.style.backgroundImage = firstChild.style.backgroundImage;

        const lastChild = x.lastElementChild;
        lastChild.classList.add('_3_iWCp');
    }
}