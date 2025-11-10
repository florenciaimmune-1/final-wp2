### Final Web Programming II 

### Clonar el repositorio
```bash
git clone https://github.com/florenciaimmune-1/final-wp2.git
cd final-wp2
```

### Configurar entorno
Contenido del .env:
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=finalwp2
JWT_SECRET=supersecreto
CORS_ORIGIN=http://localhost:5173


### Instalar dependencias
```bash
cd backend
npm install
cd ../frontend
npm install
```

### Levantar el backend
```bash
cd backend
npm run dev
```

### Levantar el frontend
```bash
cd frontend
npm run dev
```
