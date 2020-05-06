const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function validateRepositoriesId(request, response, next){
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(project => project.id === id);

  if( repositorieIndex < 0 ){
    return response.status(400).json({ error: 'Repositori not found.'});
  }

  return next();

}

app.use("/repositories/:id", validateRepositoriesId);

app.get("/repositories", (request, response) => {
  // TODO

  return response.json(repositories);

});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;

  const project = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(project);

  return response.json(project);
});

app.put("/repositories/:id", (request, response) => {
  // TODO

  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositorieIndex = repositories.findIndex(project => project.id === id);

  if( repositorieIndex < 0 ){
    return response.status(400).json({ error: 'Repositori not found.'});
  }

  const { likes } = repositories[repositorieIndex];
  
  const project = {
    id,
    title,
    url,
    techs,
    likes,
  };

  repositories[repositorieIndex] = project;

  return response.json(project);

});

app.delete("/repositories/:id", (request, response) => {
  // TODO

  // const { id } = request.params;

  // const repositorieIndex = repositories.findIndex(project => project.id === id);

  // if (repositorieIndex < 0) {
  //   return response.status(400).json({ erro: 'Project not found.'});
  // }

  repositories.splice(repositorieIndex, 1);

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  // TODO

  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(project => project.id === id);

  if (repositorieIndex < 0) {
    return response.status(400).json({ erro: 'Project not found.'});
  }

  repositories[repositorieIndex].likes ++;

  return response.json(repositories[repositorieIndex]);

});

module.exports = app;
