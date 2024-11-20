class Api {
  static BaseURL = "http://127.0.0.1:8000/api";
  static imgBaseURL = "http://127.0.0.1:8000/storage/";

  // Method to get the full image URL
  static imgURL(path) {
    return this.imgBaseURL + path;
  }

  static ReviewList() {
    return this.BaseURL + "/reviews/";
  }

  static Banner() {
    return this.BaseURL + "/banner/";
  }

  static Services() {
    return this.BaseURL + "/services/";
  }

  static Project() {
    return this.BaseURL + "/projects/";
  }

  static Team() {
    return this.BaseURL + "/team/";
  }

  static Contact() {
    return this.BaseURL + "/contact";
  }

  static SiteInfo() {
    return this.BaseURL + "/site-info";
  }

  // New method to log visitor data
  static LogVisitor(destinationPort = 80) {
    return fetch(this.BaseURL + "/log-visitor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        destination_port: destinationPort,
      })
    })
      .then(response => response.json())
      .then(data => console.log("Visitor logged:", data))
      .catch(error => console.error("Error logging visitor:", error));
  }
}

export default Api;
