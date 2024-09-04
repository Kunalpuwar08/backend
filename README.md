# Blog APIS

- Login API :
  endpoint: /auth/login
  body: email, password

- Signup API
  endpoint: /auth/signup
  body: name, email, password

- list blog
  endpoint: /blog

- create blog
  body: title, description, category
  endpoint: /blog/create

- Edit blog
  body: title, description, category
  endpoint: /blog/:id
- delete blog
  endpoint: /blog/:id

# env variables

install mongodb compass for accessing this

- MONGO_URI = mongodb://localhost:27017/MY_DB
- JWT_SEC=JWT_TOKEN
