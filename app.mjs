import fs from "fs/promises";
import log from "@ajar/marker";
import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.get("/tasks", (req, res) => {
  (async () => {
    let data = await fs.readFile("./tasks.json");

    res.set("Content-Type", "application/json").send(data);
  })().catch(log.error);
});
//////////////////////////////////////////////////////
app.get("/tasks/:taskId", (req, res) => {
  (async () => {
    let data = await fs.readFile("./tasks.json", "utf-8");
    const parsedData = JSON.parse(data);
    const task = parsedData.find((task) => {
      return task.id.toString() === req.params.taskId;
    });
    log.magenta(task);
    res.set("Content-Type", "application/json").send(task);
  })().catch(log.error);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
