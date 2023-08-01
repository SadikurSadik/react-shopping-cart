const userLogin = async (email) => {
    const res = await fetch(import.meta.env.VITE_BASE_URL + 'user-login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({UserEmail: email})
    });

    const data = await res.json();

    return data;
}

const verifyLogin = async (email, otp) => {
    const res = await fetch(import.meta.env.VITE_BASE_URL + 'verify-login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({UserEmail: email, OTP: otp})
    });

    const data = await res.json();

    return data;
}


export { userLogin, verifyLogin };

