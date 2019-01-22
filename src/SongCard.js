// @flow
import React, { useState } from "react";
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
  stream: string,
};

const SongCard = ({ classes = {}, title, artist, stream }: Props) => {
  let audio;
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);

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
            if (!playing) audio && audio.play();
            else audio && audio.pause();
            setPlaying(!playing);
            setDuration(audio && audio.duration);
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
      <Collapse in={expanded && Boolean(duration)} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {`${Math.round(duration / 60)}:${Math.round(duration % 60)}`}
          </Typography>
        </CardContent>
      </Collapse>
      <div>
        <ReactAudioPlayer
          src={stream}
          ref={element => {
            audio = element && element.audioEl;
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
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  header: {
    cursor: "pointer"
  },
});

export default withStyles(styles)(SongCard);
