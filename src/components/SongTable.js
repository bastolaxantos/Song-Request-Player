import React from 'react'
import { Typography, Table, TableBody, TableCell, TableRow, TableHead, Paper, IconButton, Badge } from "@material-ui/core"
import { ThumbUp, ThumbDown, Delete, PlayArrow } from "@material-ui/icons"

const SongTable = (props) => {
    // console.log(props)
    return (
        <div style={{ margin: 30 }}>
            <Typography variant="h6" color="inherit" align="left">
                Song Queue
                </Typography>
            <Paper style={{ marginTop: 20 }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Index</TableCell>
                            <TableCell>Song Name</TableCell>
                            <TableCell align="right">Length</TableCell>
                            <TableCell align="right">Reqeuested By</TableCell>
                            <TableCell align="right">Requested At</TableCell>
                            {/* <TableCell align="center">Votes</TableCell> */}
                            <TableCell align="center">{props.isPlayer ? 'Play mgmt' : 'Votes'}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.requestList.map((row, index) => (
                            <TableRow key={row.id} style={row.playing ? { backgroundColor: 'aquamarine' } : null}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell component="th" scope="row">
                                    {row.title.substring(0, 65)}
                                </TableCell>
                                <TableCell align="right">{secondsToString(row.length)}</TableCell>
                                <TableCell align="right">{row.by}</TableCell>
                                <TableCell align="right">{row.created_at}</TableCell>
                                {/* <TableCell align="center">{row.upvote - row.downvote}</TableCell> */}
                                <TableCell align="center">
                                    {!props.isPlayer ? (
                                        <div>
                                            <IconButton onClick={() => props.onChangeVote(row.id, true)} >
                                                <Badge badgeContent={row.upvote} color="primary">
                                                    <ThumbUp color={row.myvote === 1 ? "primary" : "disabled"} />
                                                </Badge>
                                            </IconButton>
                                            <IconButton onClick={() => props.onChangeVote(row.id, false)}>
                                                <Badge badgeContent={row.downvote} color="secondary">
                                                    <ThumbDown color={row.myvote === -1 ? "secondary" : "disabled"} />
                                                </Badge>
                                            </IconButton>
                                            {row.own ? <IconButton onClick={() => props.deleteThis(row.id)}> <Delete color="secondary" /></IconButton> : null}
                                        </div>
                                    ) :
                                        !row.playing ?
                                            <IconButton onClick={() => props.onPlay(row.id, row.original_url)} ><PlayArrow color="primary" /></IconButton> :
                                            <IconButton onClick={() => props.onEnded(row.id)} ><Delete color="secondary" /></IconButton>
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    )
}

export default SongTable

function secondsToString(seconds) {
    var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
    var numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;
    return numminutes + " min " + numseconds + " sec";
}