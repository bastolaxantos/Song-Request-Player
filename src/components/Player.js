import React, { Component } from 'react'
import YouTubePlayer from 'react-player/lib/players/YouTube'
import ReactPlayer from 'react-player'
import axios from 'axios'
import url from '../utils'

import { Button } from '@material-ui/core'
import RequestBody from './RequestBody'
import Header from './Header'
//...


export default class Player extends Component {

    state = {
        requestList: [],
        currentUrl: '',
        currentId: -1,
    }

    onPlay = (id, url) => {
        // TODO: change status
        this.setState({ currentUrl: url, currentId: id })
        this.changePlayStatus(id, true);
    }

    componentDidMount() {
        this.loadQueue(true)
        this.setLoadTimer()
    }

    setLoadTimer() {
        setInterval(this.loadQueue, 3000)
    }

    changePlayStatus(id, isPlay) {
        axios({
            url: `${url.BASE_URL}/playing`,
            method: 'post',
            headers: {
                'Accept': 'application/json'
            },
            data: {
                play: isPlay,
                id
            }
        })
            .then(res => {
                console.log(res)
                this.loadQueue()
            })
            .catch(err => {
                console.log(err)
                console.log(err.response)
            })
    }

    onPlayEnded(id) {
        axios({
            url: `${url.BASE_URL}/played`,
            method: 'post',
            headers: {
                'Accept': 'application/json'
            },
            data: {
                id
            }
        })
            .then(res => {
                console.log(res)
                this.loadQueue(true)
            })
            .catch(err => {
                console.log(err)
                console.log(err.response)
            })
    }

    loadQueue = (playFirst = false) => {
        axios({
            url: `${url.BASE_URL}/playqueue`,
            method: 'get',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(res => {
                console.log(res)
                if (res.data && res.data.length > 0) {
                    if (playFirst || this.state.currentUrl === null)
                        this.setState({ requestList: res.data, currentUrl: res.data[0].original_url, currentId: res.data[0].id })
                    else
                        this.setState({ requestList: res.data })
                } else {
                    this.setState({ requestList: [], currentId: -1, currentUrl: null })
                }
            })
            .catch(err => {
                console.log(err)
                console.log(err.response)
            })
    }


    render() {
        return (
            <div>
                {/* <div style={{ position: 'absolute', margin: 30, bottom: 0, right: 0 }}> */}
                <Header />
                <YouTubePlayer url={this.state.currentUrl} playing
                    width={'100%'}
                    height={250}
                    controls
                    onPause={() => this.changePlayStatus(this.state.currentId, false)}
                    onEnded={() => this.onPlayEnded(this.state.currentId)}
                    onStart={() => this.changePlayStatus(this.state.currentId, true)}
                    onPlay={() => this.changePlayStatus(this.state.currentId, true)}
                />
                {/* </div> */}
                <RequestBody requestList={this.state.requestList} isPlayer={true} onEnded={(id) => this.onPlayEnded(id)} onPlay={(id, url) => this.onPlay(id, url)} />

            </div>
        )
    }
}