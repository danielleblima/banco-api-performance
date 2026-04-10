import http from 'k6/http';
import { sleep, check } from 'k6';  

export const options = {
  iterations: 50, // Número total de iterações (repetições do teste)
  thresholds: {
    'http_req_duration': ['p(90)<10', 'max<1'], // 90% das requisições devem ser menores que 1ms
    'http_req_failed': ['rate<0.01'], // Menos de 1% das requisições devem falhar
  },
}

export default function () {

    const url = 'http://localhost:3000/login';
    
    const payload = JSON.stringify({
    username: 'julio.lima',
    senha: '123456',
    
    });

    const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const resposta = http.post(url, payload, params);

  check(resposta, {
    'Validar que o status é 200': (r) => r.status === 200,
    'validar que o token é string': (r) => typeof(r.json().token) == 'string'
  })

  sleep(1);

}