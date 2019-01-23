// @flow
import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import Typography from "@material-ui/core/Typography";
import ReactAudioPlayer from "react-audio-player";

type Props = {
  classes: Object,
  title: string,
  artist: { name: string },
  audio: string,
  playing: boolean,
  selected: boolean,
  setPlaying: boolean => void
};

const SongCard = ({
  classes = {},
  title,
  artist,
  audio,
  selected,
  playing,
  setPlaying
}: Props) => {
  let audioEl;
  const [duration, setDuration] = useState(0);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    if (!audioEl) return; 
    if (playing) audioEl.play();
    else {
      audioEl.pause();
      if (!selected) audioEl.currentTime = 0;
    }
  }, [playing, selected]);

  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.header}
        title={title}
        subheader={artist && artist.name}
        onClick={() => setExpanded(!expanded)}
        action={
          <IconButton
            aria-label="Play/pause"
            onClick={e => {
              setPlaying(!playing);
              setDuration(audioEl && audioEl.duration);
              e.stopPropagation();
            }}
          >
            {playing ? (
              <PauseIcon className={classes.playIcon} />
            ) : (
              <PlayArrowIcon className={classes.playIcon} />
            )}
          </IconButton>
        }
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {artist && `${artist.name} - `}
            {`${title} - `}
            {`${Math.round(duration / 60)}m${Math.round(duration % 60)}s`}
          </Typography>
        </CardContent>
      </Collapse>
      <div>
        <ReactAudioPlayer
          src={audio}
          ref={element => {
            audioEl = element && element.audioEl;
          }}
        />
      </div>
    </Card>
  );
};

const styles = theme => ({
  card: {
    maxWidth: 800,
    margin: 20
  },
  actions: {
    display: "flex"
  },
  header: {
    cursor: "pointer"
  }
});

export default withStyles(styles)(SongCard);
