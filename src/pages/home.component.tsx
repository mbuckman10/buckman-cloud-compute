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
            <h1 className="display-4 fw-bold lh-1">React @ the Edge!</h1>
            <p className="lead">
              TypeScript and React running on Fastly's C@E Platform!
            </p>
          </div>
        </div>
      </div>
    );
  }

  render(): React.ReactElement {
    return <div>{this.generateHeader()}</div>;
  }
}
