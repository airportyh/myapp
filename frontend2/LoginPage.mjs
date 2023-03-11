import el from './el.mjs';
import api from './api.mjs';

export async function authenticate() {
    await new Promise((resolve) => {
        if (api.hasToken()) {
            resolve();
            return;
        }
        let page = LoginPage(() => {
            document.body.removeChild(page);
            resolve();
        });
        document.body.appendChild(page);
    });
}

export function LoginPage(onAuthenticated) {
    let error;
    let password;

    return el.div(
        el.h1('Log In:'),
        el.form({
            onSubmit: async (e) => {
                e.preventDefault();
                try {
                    const auth = await api.post(`/api/login`, {
                        password: password.value
                    });
                    api.setToken(auth.token);
                    onAuthenticated();
                } catch (e) {
                    error.textContent = e.message;
                }
            }}, 
            error = el.div({class: 'error'}),
            el.div(
                el.label('What is the password?'),
                password = el.input({
                    type: 'password',
                    name: 'password'
                })
            ),
            el.button({
                type: 'submit',
            }, 'Enter')
        ),  
    )
}