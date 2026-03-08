(function () {

  let API_KEY = null;
  let USER_ID = null;
  const API_URL = "http://localhost:5000/events/track";

  function generateUserId() {
    return "user_" + Math.random().toString(36).substring(2, 12);
  }

  function getUserId() {

    let user = localStorage.getItem("analytics_user_id");

    if (!user) {
      user = generateUserId();
      localStorage.setItem("analytics_user_id", user);
    }

    return user;
  }

  function sendEvent(eventName, metadata = {}) {

    if (!API_KEY) {
      console.error("Analytics not initialized");
      return;
    }

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        api_key: API_KEY,
        event_name: eventName,
        user_id: USER_ID,
        metadata: metadata,
        timestamp: new Date().toISOString()
      })
    })
    .catch(err => console.error("Analytics error:", err));

  }

  window.analytics = {

    init: function(apiKey) {

      API_KEY = apiKey;
      USER_ID = getUserId();

      // automatic page view tracking
      sendEvent("page_view", {
        url: window.location.pathname
      });

    },

    track: function(eventName, metadata = {}) {

      sendEvent(eventName, metadata);

    }

  };

})();