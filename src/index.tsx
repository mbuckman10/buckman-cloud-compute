import "core-js";
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "./App";

class Server {
  constructor() {
    this.registerListener();
  }

  /**
   * Listen for incoming http requests
   * (This will only happen once)
   */
  registerListener() {
    addEventListener("fetch", async (event: any) => {
      // Parse URL for routing
      const url = new URL(event.request.url);

      const body = this.renderFullPage(this.renderReact(url, event));

      const resp = this.makeResponse(body);

      // Return
      event.respondWith(resp);
    });
  }

  /**
   * Render React App
   */
  renderReact(url: any, event: any) {
    try {
      return ReactDOMServer.renderToString(
        <App
          data={{
            url: url.pathname,
            clientIp: event.client.address,
            geo: event.client.address,
          }}
        />
      );
    } catch (e) {
      self._WAS_ERROR = true;
      console.log(e);
      return `There was an error processing the request: ${e}`;
    }
  }

  /**
   * Generate the raw body for the response
   * @param appHtml Rendered html from React
   * @returns Full html page for client
   */
  renderFullPage(appHtml: string) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8" />
          <title>C@E Buckman React Demo</title>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous"/>
      </head>
      <body>
          <div id="root">${appHtml}</div>
      </body>
      </html>`;
  }

  /**
   * Make response object
   */
  makeResponse(body: string) {
    let resp = new Response(body, {
      // Send response code
      status: self._WAS_ERROR ? 500 : self._WAS_NOT_FOUND ? 404 : 200,
    });

    // Set headers
    resp.headers.set("content-type", "text/html");
    resp.headers.set("cache-control", "no-cache"); // For testing

    return resp;
  }
}

new Server();
