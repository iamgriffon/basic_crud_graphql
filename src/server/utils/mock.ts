const data = `[
  {
    "email": "example@email.com",
    "image": "https://api.lorem.space/image/movie",
    "name": "test name",
    "tasks": [
      {
        "userId": 1,
        "task": "Tomar café da manhã",
        "id": 1,
        "finished": false
      },
      {
        "userId": 1,
        "task": "Fazer mercado",
        "id": 6,
        "finished": false
      },
      {
        "userId": 1,
        "task": "Estudar para provas",
        "id": 7,
        "finished": false
      },
      {
        "userId": 1,
        "task": "Andar 3km",
        "id": 8,
        "finished": false
      },
      {
        "userId": 1,
        "task": "Fazer pelo menos 3 commits por dia",
        "id": 11,
        "finished": false
      },
      {
        "userId": 1,
        "task": "Tirar o lixo as terças, quintas e sábados",
        "id": 12,
        "finished": false
      },
      {
        "userId": 1,
        "task": "Beber 2L de água",
        "id": 13,
        "finished": false
      },
      {
        "userId": 1,
        "task": "Cuidar da Morgana",
        "id": 15,
        "finished": false
      }
    ]
  },
  {
    "email": "guusilveira@gmail.com",
    "image": "https://github.com/iamgriffon.png",
    "name": "Gustavo",
    "tasks": [
      {
        "userId": 2,
        "task": "Fazer pelo menos 3 commits por dia",
        "id": 2,
        "finished": false
      },
      {
        "userId": 2,
        "task": "Beber 2L de água",
        "id": 3,
        "finished": false
      },
      {
        "userId": 2,
        "task": "Fazer mercado",
        "id": 4,
        "finished": false
      },
      {
        "userId": 2,
        "task": "Tirar o lixo as terças, quintas e sábados",
        "id": 5,
        "finished": false
      },
      {
        "userId": 2,
        "task": "Estudar para provas",
        "id": 9,
        "finished": false
      },
      {
        "userId": 2,
        "task": "Tomar café da manhã",
        "id": 10,
        "finished": false
      },
      {
        "userId": 2,
        "task": "Andar 7km",
        "id": 14,
        "finished": false
      }
    ]
  }
]`

export const Mock = JSON.parse(data)