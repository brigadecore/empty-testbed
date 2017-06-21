// Acid CI/CD
events.push = function(e) {
  console.log("===> Building " + e.repo.cloneURL + " " + e.commit);

  node = new Job("node-runner")
  node.image = "node:8"
  node.tasks = [
    "cd /src/hello",
    "npm install",
    "node index.js"
  ]
  node.run()

  /*
  j = new Job("empty-testbed-test");
  j.image = "acidic.azurecr.io/acid-ubuntu:latest";
  j.tasks = [
    "ls -lah",
    "sleep 200"
  ];
  j.run()
  */
}
