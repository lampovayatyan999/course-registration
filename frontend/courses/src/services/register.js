export async function registerUser(data) {
    const response = await fetch("http://127.0.0.1:8000/api/registrations/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if(!response.ok) {
        throw result;
    }

    return result;
}