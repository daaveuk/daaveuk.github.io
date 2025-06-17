import { style, globalStyle } from "@vanilla-extract/css";
import { after } from "node:test";

export const wrapper = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const checkBoxWrapper = style({
  position: "relative",
  display: "inline-block",
});

export const toggleContainer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
});

export const checkBoxLabel = style({
  cursor: "pointer",
});

export const checkBox = style({
  opacity: 0,
  zIndex: 1,
  borderRadius: "15px",
  width: "42px",
  height: "26px",
});

// Global style for the checked sta

export const button = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "40px",
  height: "40px",
  backgroundColor: "transparent",
  border: "none",
});
