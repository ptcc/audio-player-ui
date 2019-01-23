// @flow
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";

const styles = {
  appBar: {
    top: "auto",
    bottom: 0
  }
};

function PlayListControl({
  classes,
  artist,
  title,
  songCount,
  playing,
  setPlaying,
  next,
  previous
}: Props) {
  return (
    <AppBar position="static" color="primary">
      <Toolbar className={classes.toolbar}>
        <IconButton color="inherit" aria-label="previous" onClick={previous}>
          <SkipPreviousIcon />
        </IconButton>
        <Fab
          color="secondary"
          aria-label="Play/Pause"
          className={classes.fabButton}
          onClick={e => {
            setPlaying(!playing);
          }}
        >
          {playing ? (
            <PauseIcon className={classes.playIcon} />
          ) : (
            <PlayArrowIcon className={classes.playIcon} />
          )}
        </Fab>
        <IconButton color="inherit" aria-label="previous" onClick={next}>
          <SkipNextIcon />
        </IconButton>
        <Typography
          className={classes.title}
          variant="h6"
          color="inherit"
          noWrap
        >
          {songCount} songs in playlist | Current song: {title} by{" "}
          {(artist && artist.name) || "???"}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

type Props = {
  classes: Object,
  songCount: number,
  title: string,
  artist: { name: string },
  playing: boolean,
  setPlaying: boolean => {},
  next: void => {},
  previous: void => {}
};

export default withStyles(styles)(PlayListControl);
