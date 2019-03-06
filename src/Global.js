export const _ = "https://one.lgk.io";
export let app = {};
export function setApp(component) {
    app = component;
}
export function getUserApiKey() {
    if (app && app.state.user) {
        return app.state.user.api_key;
    }
    else {
        return null;
    }
}