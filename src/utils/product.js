const fetchProducts = async () => {
    const res = await fetch(import.meta.env.VITE_BASE_URL + 'product-list')
    const data = await res.json();

    return data.msg === 'success' ? data.data : [];
}


export { fetchProducts };

