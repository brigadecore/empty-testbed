const { events, Job, Group} = require("brigadier")

events.on("push", function(e, project) {
  console.log("===> Building " + project.repo.cloneURL + " " + e.commit)

  var node = new Job("node-runner")
  node.image = "node:8"
  node.tasks = [
    "cd /src/hello",
    "npm install",
    "node index.js"
  ]
  node.env = {
    "unused": "myval",
    "unused2": project.secrets.dbPassword || "empty"
  }
  node.run()
})

events.on("imagePush", function(e) {
  console.log(JSON.stringify(e))
  var hook = JSON.parse(e.payload)
  console.log("===> Image push " + hook.repository.name + ":" + hook.push_data.tag)
})

events.on("after", function(e, project) {
  var c = e.cause.event
  var m = "Hook " + c.type + " is in state " + e.cause.trigger +
    " for build " + e.commit + " of " + project.repo.name

  if (project.secrets.SLACK_WEBHOOK) {
    var slack = new Job("slack-notify")

    slack.image = "technosophos/slack-notify:latest"
    slack.env = {
      SLACK_WEBHOOK: project.secrets.SLACK_WEBHOOK,
      SLACK_USERNAME: "AcidBot",
      SLACK_TITLE: "Build " + e.cause.trigger,
      SLACK_MESSAGE: m + " <https://" + project.repo.name + ">",
      SLACK_COLOR: "#00ff00"
    }

    slack.tasks = ["/slack-notify"]

    if (e.cause.trigger != "success") {
      slack.env.SLACK_COLOR = "#ff0000"
    }
    slack.run()
  } else {
    console.log(m)
  }
})

