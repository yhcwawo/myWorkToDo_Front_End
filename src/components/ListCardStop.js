import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import WorkOffIcon from '@material-ui/icons/WorkOff';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: '5px',
    width: '100%',
    height: '100%',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 100,
    width: 100,
  },
}));

export default function MediaControlCard({number}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h2" variant="h2" color="secondary">
            <strong>
            {number}건
            </strong>
          </Typography>
          <Typography variant="h4" color="primary">
            보류
          </Typography>
        </CardContent>

      </div>
      <IconButton aria-label="play/pause">
            <WorkOffIcon className={classes.playIcon} color="secondary" />
      </IconButton>
    </Card>
  );
}