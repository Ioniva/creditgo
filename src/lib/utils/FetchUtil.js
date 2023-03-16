class FetchUtil {
    static async get(url) {
        const headers = { "Content-Type": "application/json" };
        const response = await fetch(url, {
            method: "GET",
            headers: headers,
        });
        return response.json();
    }

    static async post(url, data) {
        const headers = { "Content-Type": "application/json" };
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data),
            });
            if (!response.ok) { throw new Error (`FetchUtil.post failed: ${await response.json()}`) }
            return response.json();
        } catch (error) { throw new Error(`FetchUtil.post failed: ${error.message}`) }
    }

    static async delete(url) {
        const headers = { "Content-Type": "application/json" };
        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: headers,
            })
            if (!response.ok) { throw new Error(`FetchUtil.delete failed: ${await response.json()}`) }
            return response.json();
        } catch (error) { throw new Error(`FetchUtil.delete failed: ${error.message}`) }
    }
}

export default FetchUtil;
