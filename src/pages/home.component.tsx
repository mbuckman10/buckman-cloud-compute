import React from "react";

export default class Home extends React.Component<any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  generateHeader() {
    return (
      <div className="container my-5">
        <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
          <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
            <h1 className="display-4 fw-bold lh-1">TESTING 123</h1>
            <p className="lead">
              Server-side rendered React running in JS on Fastly's C@E Platform!
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
              <button
                type="button"
                className="btn btn-primary btn-lg px-4 me-md-2 fw-bold"
              >
                Primary
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary btn-lg px-4 ml-3"
              >
                Default
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  generateContent() {
    return (
      <div className="container py-5" id="hanging-icons">
        <h2 className="pb-2 border-bottom">Content</h2>
        <div className="row g-5 py-5">
          <div className="col-md-4 d-flex align-items-start">
            <div>
              <h2>Featured title</h2>
              <p>
                Paragraph of text beneath the heading to explain the heading.
                We'll add onto it with another sentence and probably just keep
                going until we run out of words.
              </p>
              <a href="#" className="btn btn-primary">
                Primary button
              </a>
            </div>
          </div>
          <div className="col-md-4 d-flex align-items-start">
            <div>
              <h2>Featured title</h2>
              <p>
                Paragraph of text beneath the heading to explain the heading.
                We'll add onto it with another sentence and probably just keep
                going until we run out of words.
              </p>
              <a href="#" className="btn btn-primary">
                Primary button
              </a>
            </div>
          </div>
          <div className="col-md-4 d-flex align-items-start">
            <div>
              <h2>Featured title</h2>
              <p>
                Paragraph of text beneath the heading to explain the heading.
                We'll add onto it with another sentence and probably just keep
                going until we run out of words.
              </p>
              <a href="#" className="btn btn-primary">
                Primary button
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render(): React.ReactElement {
    return (
      <div>
        {this.generateHeader()}

        <br />

        {this.generateContent()}
      </div>
    );
  }
}
