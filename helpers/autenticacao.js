import http from 'k6/http';
const postLogin = JSON.parse(open('../fixtures/postLogin.json'));
import { pegarBaseURL } from '../utils/variaveis.js';

export function obterToken() {

    const url = pegarBaseURL() + '/login';
    
    const payload = JSON.stringify(postLogin);

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const resposta = http.post(url, payload, params);

    return resposta.json('token')
}