import jwt_decode from "jwt-decode";

class TokenService {
    getToken() {
        return localStorage.getItem("token");
    }
    getMOCToken() {
        return localStorage.getItem("mc-token");
    }
    getUser() {
        return JSON.parse(<string>localStorage.getItem("user"))
    }
    getMOCUser() {
        return JSON.parse(<string>localStorage.getItem("moc-user"))
    }

    setToken(token: string) {
        localStorage.setItem("token", token);
    }
    setMOCToken(token: string) {
        localStorage.setItem("moc-token", token);
    }
    setUser(user: any){
        localStorage.setItem("user",user)
    }
    setMOCUser(user: any){
        localStorage.setItem("moc-user",user)
    }
    removeToken() {
        localStorage.removeItem("token");
    }
    removeMOCToken() {
        localStorage.removeItem("moc-token");
    }

    clearStorage() {
        localStorage.clear();
    }
}

export default new TokenService();
