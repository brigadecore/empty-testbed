events.push = function(e) {
  console.log("===> Building " + e.repo.cloneURL + " " + e.commit);

  var node = new Job("node-runner")
  node.image = "node:8"
  node.tasks = [
    "cd /src/hello",
    "npm install",
    "node index.js"
  ]
  node.run()
}
