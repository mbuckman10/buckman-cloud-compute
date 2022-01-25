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
    const geo: any = data.geo;
    const rows = Object.keys(data.geo).map((key) => {
      return (
        <tr>
          <th>{key}</th>
          <td>{geo[key]}</td>
        </tr>
      );
    });

    return (
      <div>
        <h2>IP</h2>
        <p>{data.clientIp}</p>
        <h2>Url</h2>
        <p>{data.url}</p>
        <h2>Geo IP</h2>
        <div>
          <div id="mapid"></div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Key</th>
                <th scope="col">Value</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
