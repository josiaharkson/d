import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
    height: 255,
    position: "relative",
    margin: "0 auto",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "100%",
    },
  },
  roota: {
    padding: "0 30px",
    textAlign: "center",
    maxWidth: 400,
    flexGrow: 1,
    height: 255,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    margin: "0 auto",
    fontSize: 13,
    color: "#e4e4e4",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "100%",
    },
  },

  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 255,
    display: "block",
    overflow: "hidden",
    width: "100%",
  },

  stepper: {
    background: "rgba(250,250,250,.0)",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    top: "90%",

    "& .MuiMobileStepper-dots": {
      background: "rgba(255,255,255, 0.27)",
      padding: 2,
    },
  },
  btn_a: {
    // background: "#caaeae",
    // background: "#caaeae45",
    background: "#caaeae00",

    width: 50,
    height: 225,
    position: "absolute",
    top: -225,
    right: 0,
    padding: 0,
    "& path": {
      // color: "#ff0000",
      color: "#ff000000",
    },
    "& svg": {
      // color: "#ff0000",
      color: "#ff000000",
      fontSize: 50,
      textShadow: "1px 1px 1px green",
    },
  },

  btn_b: {
    // background: "#caaeae",
    // background: "#caaeae45",
    background: "#caaeae00",

    width: 50,
    height: 225,
    position: "absolute",
    top: -225,
    left: 0,
    padding: 0,
    "& path": {
      // color: "#ff0000",
      color: "#ff000000",
    },
    "& svg": {
      // color: "#ff0000",
      color: "#ff000000",

      fontSize: 50,
      textShadow: "1px 1px 1px green",
    },
  },

  empty: {
    width: "100%",
    height: "100%",
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
  },
}));

function SwipeableTextMobileStepper({ photos, ...props }) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStepChange = step => {
    setActiveStep(step);
  };

  if (!photos)
    return (
      <div className={classes.root}>
        <div className={classes.empty}>
          You Have Not Uploaded Any Photo yet!
        </div>
        {props.children}
      </div>
    );

  if (!photos.length)
    return (
      <div className={classes.roota}>
        {props.children}
        <div className={classes.empty}>
          You Have Not Uploaded Any Photo yet!
        </div>
      </div>
    );

  const maxSteps = photos.length;

  return (
    <div className={classes.root}>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        interval={10000}
        key={Math.random()}
      >
        {photos.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img className={classes.img} src={step.url} alt={step.token} />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="top"
        variant="dots"
        classes={{ root: classes.stepper }}
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            className={classes.btn_a}
            disabled={activeStep === maxSteps - 1}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button
            size="small"
            className={classes.btn_b}
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </Button>
        }
      />

      {props.children}
    </div>
  );
}

export default SwipeableTextMobileStepper;

// import React from "react";
// import { makeStyles, useTheme } from "@material-ui/core/styles";
// import MobileStepper from "@material-ui/core/MobileStepper";
// import Button from "@material-ui/core/Button";
// // import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
// // import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
// import SwipeableViews from "react-swipeable-views";
// import { autoPlay } from "react-swipeable-views-utils";

// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

// const useStyles = makeStyles((theme) => ({
//   root: {
//     maxWidth: 400,
//     flexGrow: 1,
//     height: 255,
//     position: "relative",
//     margin: "0 auto",
//     [theme.breakpoints.down("xs")]: {
//       maxWidth: "100%",
//     },
//   },
//   roota: {
//     padding: "0 30px",
//     textAlign: "center",
//     maxWidth: 400,
//     flexGrow: 1,
//     height: 255,
//     position: "relative",
//     alignItems: "center",
//     justifyContent: "center",
//     display: "flex",
//     margin: "0 auto",
//     fontSize: 13,
//     color: "#e4e4e4",
//     [theme.breakpoints.down("xs")]: {
//       maxWidth: "100%",
//     },
//   },

//   header: {
//     display: "flex",
//     alignItems: "center",
//     height: 50,
//     paddingLeft: theme.spacing(4),
//     backgroundColor: theme.palette.background.default,
//   },
//   img: {
//     height: 255,
//     display: "block",
//     overflow: "hidden",
//     width: "100%",
//   },

//   stepper: {
//     background: "rgba(250,250,250,.0)",
//     width: "100%",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     position: "absolute",
//     top: "40%",
//   },
//   btn: {
//     background: "#caaeae45",
//     borderRadius: "50%",
//     // width: 60,
//     // height: 60,
//     width: 0,
//     height: 0,
//     padding: 0,
//     "& path": {
//       color: "red",
//     },
//     "& svg": {
//       color: "red",
//       fontSize: 50,
//       textShadow: "1px 1px 1px green",
//     },
//   },
// }));

// function SwipeableTextMobileStepper({ photos, ...props }) {
//   const classes = useStyles();
//   const theme = useTheme();
//   const [activeStep, setActiveStep] = React.useState(0);

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleStepChange = (step) => {
//     setActiveStep(step);
//   };

//   if (!photos) return <div className={classes.root} />;

//   if (!photos.length)
//     return (
//       <div className={classes.roota}>You Have Not Uploaded Any Photo yet!</div>
//     );

//   const maxSteps = photos.length;

//   return (
//     <div className={classes.root}>
//       <AutoPlaySwipeableViews
//         axis={theme.direction === "rtl" ? "x-reverse" : "x"}
//         index={activeStep}
//         onChangeIndex={handleStepChange}
//         enableMouseEvents
//         interval={10000}
//         key={Math.random()}
//       >
//         {photos.map((step, index) => (
//           <div key={step.label}>
//             {Math.abs(activeStep - index) <= 2 ? (
//               <img className={classes.img} src={step.url} alt={step.token} />
//             ) : null}
//           </div>
//         ))}
//       </AutoPlaySwipeableViews>
//       <MobileStepper
//         steps={maxSteps}
//         position="top"
//         variant="dots"
//         classes={{ root: classes.stepper }}
//         activeStep={activeStep}
//         nextButton={
//           <Button
//             size="small"
//             onClick={handleNext}
//             className={classes.btn}
//             disabled={activeStep === maxSteps - 1}
//           >
//             {/* {theme.direction === "rtl" ? (
//               <KeyboardArrowLeft />
//             ) : (
//               <KeyboardArrowRight />
//             )} */}
//           </Button>
//         }
//         backButton={
//           <Button
//             size="small"
//             className={classes.btn}
//             onClick={handleBack}
//             disabled={activeStep === 0}
//           >
//             {/* {theme.direction === "rtl" ? (
//               <KeyboardArrowRight />
//             ) : (
//               <KeyboardArrowLeft />
//             )} */}
//           </Button>
//         }
//       />

//       {props.children}
//     </div>
//   );
// }

// export default SwipeableTextMobileStepper;
