class FetchUtil {
    static async fetchData(url, method, data) {
        const response = await fetch(url, {
            method,
            body: data ? JSON.stringify(data) : null,
            headers: {
                "Content-Type": "application/json"
            },
        });
        if (!response.ok) {
            throw new Error(`Fetch error: ${response.status}`);
        }
        return response.json();
    }

    static async post(url, data) {
        const response = await fetch(url, {
            method: "POST",
            body: data ? JSON.stringify(data) : null,
            headers: {
                "Content-Type": "application/json"
            },
        });
        if (!response.ok) {
            throw new Error(`Fetch error: ${response.status}`);
        }
        return response.json();
    }
}

export default FetchUtil;
