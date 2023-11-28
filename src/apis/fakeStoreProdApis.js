export function getAllCategories() {
    return `${import.meta.env.VITE_FAKE_STORE_URL}/products/categories`;
}

export function getAllProducts() {
    return `${import.meta.env.VITE_FAKE_STORE_URL}/products`;
}

export function getProducts(category) {
    return `${import.meta.env.VITE_FAKE_STORE_URL}/products/category/${category}`;
}

export function getProductInfo(id) {
    return `${import.meta.env.VITE_FAKE_STORE_URL}/products/${id}`;
}

export function createUser() {
    return `${import.meta.env.VITE_FAKE_STORE_URL}/users`;
}

export function login() {
    return `${import.meta.env.VITE_FAKE_STORE_URL}/auth/login`;
}