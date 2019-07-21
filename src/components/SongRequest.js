import React, { Component } from 'react'
import Header from './Header.js'
import RequestBody from './RequestBody'
import { Add } from '@material-ui/icons'
import { Fab, Dialog, DialogTitle, DialogActions, DialogContentText, DialogContent, TextField, Button, CircularProgress } from '@material-ui/core'
import axios from 'axios'
import url from '../utils'

export default class SongRequest extends Component {

    state = {
        requestList: [],
        dialogVisible: false,
        errorText: '',
        url: '',
        loading: false,
    }

    componentDidMount() {
        this.loadQueue();
        setInterval(() => {
            this.loadQueue()
        }, 3000);
    }

    loadQueue() {
        axios({
            url: `${url.BASE_URL}/queue`,
            method: 'get',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(res => {
                console.log(res)
                this.setState({ requestList: res.data })
            })
            .catch(err => {
                console.log(err)
                console.log(err.response)
            })
    }

    onChangeVote = (id, isUpvote) => {
        axios({
            url: `${url.BASE_URL}/vote`,
            method: 'post',
            data: {
                id, increment: isUpvote
            }
        })
            .then(res => {
                // console.log(res)
                // this.loadQueue()
            })
            .catch(err => {
                console.log(err)
                console.log(err.response)
            })
    }


    onTextChange = (e) => {
        this.setState({ url: e.target.value, errorText: '' })
    }

    onAddClick = () => {
        this.setState({ dialogVisible: true, errorText: '', url: '' })
    }

    onAddToQueue = () => {
        if (this.state.url === '') {
            this.setState({ errorText: 'Please enter valid url' })
            return
        }
        this.setState({ dialogVisible: false, loading: true })
        axios({
            url: `${url.BASE_URL}/queue`,
            method: 'post',
            headers: {
                'Accept': 'application/json'
            },
            data: {
                'original_url': this.state.url
            }
        })
            .then(res => {
                console.log(res)
                this.setState({ loading: false })
                this.loadQueue();
            })
            .catch(err => {
                this.setState({ loading: false })
                console.log(err)
            })
    }

    onDialogClose = () => {
        this.setState({ dialogVisible: false })
    }

    deleteThis = (id) => {
        axios({
            url: `${url.BASE_URL}/queue`,
            method: 'delete',
            data: {
                id
            }
        })
            .then(res => {
                // console.log(res)
                // this.loadQueue()
            })
            .catch(err => {
                console.log(err)
                console.log(err.response)
            })
    }

    renderDialog() {
        return (
            <Dialog open={this.state.dialogVisible} onClose={this.onDialogClose} fullWidth={true} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add a song to queue</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter the youtube url of the song
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="url"
                        label="Youtube Url of the song"
                        type="url"
                        onChange={this.onTextChange}
                        value={this.state.url}
                        error={!!this.state.errorText}
                        helperText={this.state.errorText ? this.state.errorText : "https://youtube.com/h8sdf89u789"}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.onDialogClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={this.onAddToQueue} color="primary">
                        Add To Queue
          </Button>
                </DialogActions>
            </Dialog>
        )
    }

    render() {
        return (
            <div>
                <Header />
                <RequestBody requestList={this.state.requestList} isPlayer={false} onChangeVote={(id, isUpvote) => this.onChangeVote(id, isUpvote)} deleteThis={(id) => this.deleteThis(id)} />
                {this.state.loading ? <CircularProgress style={{ position: 'absolute' }} /> : null}
                <Fab color="primary" aria-label="Add" size="large" style={{ position: 'absolute', margin: 30, bottom: 0, right: 0 }} onClick={this.onAddClick}>
                    <Add />
                </Fab>
                {this.renderDialog()}
            </div>
        )
    }

}