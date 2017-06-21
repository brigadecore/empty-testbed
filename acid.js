// Acid CI/CD
events.push = function(e) {
  console.log("===> Building " + e.repo.cloneURL + " " + e.commit);
  j = new Job("empty-testbed-test");
  j.image = "acidic.azurecr.io/acid-ubuntu:latest";
  j.tasks = [
    "sleep 900"
  ];
  j.run()
}
