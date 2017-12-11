import React from 'react';
import axios from '../../axios';
import { Row, Input, Col, Button, Card, Collection, CollectionItem } from 'react-materialize';
import { chunk } from 'lodash-es';

import Item from './item';

class Reactions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedKey: "",
      selectedItem: "",
      reactions: {}
    }
  }

  componentDidMount() {
    axios.get("/reactions")
      .then(reactions => {
        let modified = {}
        Object.keys(reactions.data).forEach(key => {
          let with_spaces = key.replace(/_/g, " ");
          modified[with_spaces] = reactions.data[key];
        })
        this.setState({ reactions: modified })
      })
  }

  selectKey(key) {
    this.setState({
      selectedKey: key
    })
    window.scrollTo(0, 0);
  }

  selectItem(item) {
    this.setState({
      selectedItem: item
    })
  }

  render() {
    let selectedItem = (this.state.selectedItem === "") ? "" : (
      <div>
        <h3>
          Preview
          <span className="right">
            <i className="fa fa-times" onClick={this.selectItem.bind(this, "")} />
          </span>
        </h3>
        <p>{this.state.selectedItem}</p>
        <Item src={this.state.selectedItem} autoPlay="autoplay" />
      </div>
    )

    let listing = Object.keys(this.state.reactions).sort().map(key => {
      return <CollectionItem key={key} href="#/reactions" onClick={this.selectKey.bind(this, key)}>{key}</CollectionItem>
    });

    var thumbs = "";
    let perRow = (selectedItem === "") ? 6 : 3;

    let middleSize = (selectedItem === "") ? 9 : 4;

    if (this.state.selectedKey !== "") {
      let rows = chunk(this.state.reactions[this.state.selectedKey], perRow);
      thumbs = rows.map((items, idx) => (
        <Row key={"itemrow-" + idx}>
          {items.map(item => (
            <Col s={12 / perRow}>
              <Item key={item} src={item} onClick={this.selectItem.bind(this, item)} thumb="true" />
            </Col>
          ))}
        </Row>
      ))
    }

    return (
      <Row>
        <Col s={12} l={3}>
          <Collection>
            {listing}
          </Collection>
        </Col>
        <Col s={12} l={middleSize}>
          <h3>{this.state.selectedKey}</h3>
          {thumbs}
        </Col>
        <Col s={12} l={5}>
          {selectedItem}
        </Col>
      </Row>
    )
  }
}

export default Reactions;