import React from "react";

export default class NotFound extends React.Component<any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render(): React.ReactElement {
    self._WAS_NOT_FOUND = true;
    return (
      <div>
        <h3>Not found :(</h3>
      </div>
    );
  }
}

