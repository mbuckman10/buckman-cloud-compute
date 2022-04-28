import React from "react";

type Props = {
  data: ILocation;
};

type State = {
  data: ILocation;
};

export default class Location extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: props.data,
    };
  }

  render() {
    const { data } = this.state;

    return (
      <div>
        <h2>IP</h2>
        <p>{data.clientIp}</p>
        <h2>Url</h2>
        <p>{data.url}</p>
      </div>
    );
  }
}
