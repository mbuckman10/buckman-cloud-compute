import "core-js";
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "./App";

class Server {
  constructor() {
    addEventListener("fetch", (event) =>
      event.respondWith(this.handleRequest(event))
    );
  }

  async handleRequest(event: any) {
    fastly.enableDebugLogging(false);

    // Log to a Fastly endpoint.
    const logger = fastly.getLogger("AzureLogging");
    logger.log("Hello from the edge!");
    logger.log("We have Azure Blob Logs!");

    // Log to a Fastly endpoint.
    const httpslogger = fastly.getLogger("AzureFunction");
    httpslogger.log("Hello from the edge!");
    httpslogger.log("We have HTTPS Logs!");

    this.logEnvVeriables();

    // Parse URL for routing
    const url = new URL(event.request.url);
    const body = this.renderFullPage(this.renderReact(url, event));
    return this.makeResponse(body);
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
            geo: event.client.geo,
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

  logEnvVeriables() {
    console.log(`The Customer Id is ${fastly.env.get("FASTLY_CUSTOMER_ID")}`);
    console.log(`The Service Id is ${fastly.env.get("FASTLY_SERVICE_ID")}`);
    console.log(`The cachegen is ${fastly.env.get("FASTLY_CACHE_GENERATION")}`);
    console.log(`The pop hit is ${fastly.env.get("FASTLY_POP")}`);
    console.log(`The hostname is ${fastly.env.get("FASTLY_HOSTNAME")}`);
    console.log(`The region is ${fastly.env.get("FASTLY_REGION")}`);
    console.log(`The version is ${fastly.env.get("FASTLY_SERVICE_VERSION")}`);
    console.log(`The trace Id is ${fastly.env.get("FASTLY_TRACE_ID")}`);
  }
}

new Server();
