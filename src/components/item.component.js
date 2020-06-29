import React, { Component } from "react";
import Post from './Post';

export default class Item extends Component {
    render() {
        return (
            <Post nickname="Chris" avatar="https://www.laravelnigeria.com/img/chris.jpg" caption="Moving the community!" image="https://pbs.twimg.com/media/DOXI0IEXkAAkokm.jpg" />
        )
    }
}