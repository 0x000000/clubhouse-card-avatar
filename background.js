(function() {
  const TEAM_PAGE = /\/team$/;
  const NAMESPACE = "CCA.AVATAR.";

  if (TEAM_PAGE.test(location.pathname)) { // refresh team photos
    var teamObserver = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        mutation.target.querySelectorAll("[data-model='User']").forEach(function(user) {
          var userId = (user.attributes["data-id"] || {}).value;
          var avatarSrc = (user.querySelector("img.avatar") || {}).src;

          if (userId && avatarSrc) {
            localStorage.setItem(NAMESPACE + userId, avatarSrc);
          }
        });
      });
    });

    teamObserver.observe(document.body, {childList: true, subtree: true});
  }

  var storyCardsObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      mutation.target.querySelectorAll(".story-link[data-model='Story']").forEach(function(story) {
        story.querySelectorAll("[data-model='User']").forEach(function(user) {
          var userId = (user.attributes["data-id"] || {}).value;
          if (userId && localStorage.getItem(NAMESPACE + userId)) {
            user.innerHTML = "<img class='CCA-avatar' src='" + localStorage.getItem(NAMESPACE + userId) + "' height='20' width='20' />";

            var summary = story.querySelector(".story-summary");
            if(!summary) { return; }

            Array.prototype.slice.call(summary.childNodes).forEach(function(node) {
              if (node.nodeValue == "/") {
                node.nodeValue = "";
              }
            });
          }
        });
      });
    });
  });

  storyCardsObserver.observe(document.body, {childList: true, subtree: true});
})();
