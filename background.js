(function() {
  const TEAM_PAGE = /\/team$/;
  const NAMESPACE = "CCA.AVATAR.";

  if (TEAM_PAGE.test(location.pathname)) { // refresh team photos
    var teamObserver = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        mutation.target.querySelectorAll("[data-model='User']").forEach(function(user) {
          var userId = user.attributes["data-id"].value;
          var avatarSrc = user.querySelector("img.avatar").src;

          localStorage.setItem(NAMESPACE + userId, avatarSrc);
        })
      });
    });

    teamObserver.observe(document.body, {childList: true, subtree: true});
  }

  var storyCardsObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      mutation.target.querySelectorAll("[data-model='Story']").forEach(function(story) {
        story.querySelectorAll("[data-model='User']").forEach(function(user) {
          var userId = user.attributes["data-id"].value;
          if (userId && localStorage.getItem(NAMESPACE + userId)) {
            user.innerHTML = "<img class='CCA-avatar' src='" + localStorage.getItem(NAMESPACE + userId) + "' height='20' width='20' />";
          }
        });
      });
    });
  });

  storyCardsObserver.observe(document.body, {childList: true, subtree: true});
})();
