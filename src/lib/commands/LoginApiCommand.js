import Command from './Command.js';

class LoginApiCommand extends Command {
    constructor(data) {
        super();
        this.data = data;
        this.response = null;
    }

    async execute() {
        try {
            const result = await fetch("http://127.0.0.1:4000/api/v1/auth/signup", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(this.data)
            });
            if (!result.ok) throw await result;
            this.response = await result.json();
            console.log("LoginData Api executed successfully.");
            return this.response.loginData.uuid;
        } catch (error) {
            const errorMessage = error.status === undefined ? error.message : (await error.json()).message;
            if (errorMessage === "fetch failed") {
                console.error("LoginData execution failed: Network error.");
                throw new Error("LoginData execution failed: Network error.");
            } else {
                console.error(`API ERROR: ${errorMessage}`);
                throw new Error(`API ERROR: ${errorMessage}`);
            }

            // if (error.response === undefined) {
            //     console.log('Network error:', error);
            //     throw new Error(error);
            // } else if (error.response.status >= 500) {
            //     console.log('Server error:', error);
            //     throw new Error(error);
            // } else if (error.response.status >= 400) {
            //     console.log('Client error:', error);
            //     throw new Error(error);
            // }
        }
    }

    async undo() {
        try {
            if (this.response === null) return;
            console.log(" --> Undoing LoginData...");

            const uuid = await this.response.loginData.uuid;
            const result = await fetch(`http://127.0.0.1:4000/api/v1/auth/${uuid}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });

            if (!result.ok) throw await result;
            console.log("LoginData undoed successfully.");
        } catch (error) {
            const errorMessage = error.status === undefined ? error.message : (await error.json()).message;
            if (errorMessage === "fetch failed") {
                console.error("LoginData undo command failed: Network error.");
            } else {
                console.error(`LoginData undo command failed: ${errorMessage}`);
            }
        }
    }
}

export default LoginApiCommand;
