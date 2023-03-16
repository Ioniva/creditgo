import Command from './Command.js';

class UserApiCommand extends Command {
    constructor(data) {
        super();
        this.data = data;
        this.response = null;
    }

    async execute(loginUUID, bankAccountUUID, financialUUID, guarantorUUID) {
        this.data = {
            ...this.data,
            loginDataUUID: loginUUID,
            bankAccountUUID: bankAccountUUID,
            financialUUID: financialUUID,
            guarantorUUID: guarantorUUID
        };

        try {
            const result = await fetch("http://127.0.0.1:4000/api/v1/users", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(this.data)
            });
            if (!result.ok) throw await result;
            this.response = await result.json();
            console.log("User Api executed successfully.");
        } catch (error) {
            const errorMessage = error.status === undefined ? error.message : (await error.json()).message;
            if (errorMessage === "fetch failed") {
                console.error("User execution failed: Network error.");
                throw new Error("User execution failed: Network error.");
            } else {
                console.error(`API ERROR: ${errorMessage}`);
                throw new Error(`API ERROR: ${errorMessage}`);
            }
        }
    }

    async undo() {
        try {
            if (this.response === null) return;
            console.log(" --> Undoing User...");

            const uuid = await this.response.user.uuid;
            const result = await fetch(`http://127.0.0.1:4000/api/v1/users/${uuid}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });

            if (!result.ok) throw await result;
            console.log("User undoed successfully.");
        } catch (error) {
            const errorMessage = error.status === undefined ? error.message : (await error.json()).message;
            if (errorMessage === "fetch failed") {
                console.error("User undo command failed: Network error.");
                throw new Error("User undo command failed: Network error.");
            } else {
                console.error(`User undo command failed: ${errorMessage}`);
                throw new Error(`User undo command failed: ${errorMessage}`);
            }
        }
    }
}

export default UserApiCommand;
