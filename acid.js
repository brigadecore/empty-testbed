// Acid CI/CD
events.push = function(e) {
  console.log("===> Building " + e.repo.cloneURL + " " + e.commit);
  j = new Job("empty-testbed-test");
  j.image = "acidic.azurecr.io/acid-ubuntu:latest";
  j.tasks = [
    "cd src",
    "pwd",
    "ls -lah",
    "cat acid.js",
    "sleep 200"
  ];
  j.run()
}
