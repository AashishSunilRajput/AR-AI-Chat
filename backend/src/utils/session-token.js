import crypto from "crypto";

class SessionToken {

    generate() {

        return "vs_" + crypto.randomBytes(32).toString("hex");

    }

}

export default new SessionToken();