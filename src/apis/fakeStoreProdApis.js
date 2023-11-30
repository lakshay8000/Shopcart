export function getAllCategories() {
    return `${import.meta.env.VITE_FAKE_STORE_URL}/products/categories`;
}

export function getAllProducts() {
    return `${import.meta.env.VITE_FAKE_STORE_URL}/products`;
}

export function getProducts(category) {
    return `${import.meta.env.VITE_FAKE_STORE_URL}/products/category/${category}`;
}

export function getProductInfo(productId) {
    return `${import.meta.env.VITE_FAKE_STORE_URL}/products/${productId}`;
}

export function createUser() {
    return `${import.meta.env.VITE_FAKE_STORE_URL}/users`;
}

export function login() {
    return `${import.meta.env.VITE_FAKE_STORE_URL}/auth/login`;
}

export function getCartByUser(userId) {
    return `${import.meta.env.VITE_FAKE_STORE_URL}/carts/user/${userId}`;
}

export function addProductToCart() {
    return `${import.meta.env.VITE_FAKE_STORE_URL}/carts`;
}