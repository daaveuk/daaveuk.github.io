import { style } from "@vanilla-extract/css";

export const switchContainer = style({
  position: "relative",
  display: "inline-block",
  width: "60px",
  height: "34px",
});

export const input = style({
  opacity: 0,
  width: 0,
  height: 0,
});

export const slider = style({
  position: "absolute",
  cursor: "pointer",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "#ccc",
  WebkitTransition: "0.4s",
  transition: "0.4s",
});

export const sliderChecked = style({
  backgroundColor: "#2196F3",
});

export const sliderFocused = style({
  boxShadow: "0 0 1px #2196F3",
});

export const sliderDisabled = style({
  opacity: 0.6,
  cursor: "not-allowed",
});

// Rounded slider variant
export const round = style({
  borderRadius: "34px",
});

export const sliderThumb = style({
  position: "absolute",
  height: "26px",
  width: "26px",
  left: "4px",
  bottom: "4px",
  backgroundColor: "white",
  WebkitTransition: "0.4s",
  transition: "0.4s",
});

export const sliderThumbChecked = style({
  WebkitTransform: "translateX(26px)",
  msTransform: "translateX(26px)",
  transform: "translateX(26px)",
});

export const sliderThumbRound = style({
  borderRadius: "50%",
});
