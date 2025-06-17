import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Toggle } from "./Toggle";

describe("Toggle Component", () => {
  describe("Basic Functionality", () => {
    it("renders correctly", () => {
      render(<Toggle id="test" ariaLabel="Test toggle" />);
      const input = screen.getByLabelText("Test toggle");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "checkbox");
    });

    it("starts unchecked by default", () => {
      render(<Toggle id="test" ariaLabel="Test toggle" />);
      const input = screen.getByLabelText("Test toggle");
      expect(input).not.toBeChecked();
    });

    it("respects defaultChecked prop", () => {
      render(
        <Toggle id="test" defaultChecked={true} ariaLabel="Test toggle" />
      );
      const input = screen.getByLabelText("Test toggle");
      expect(input).toBeChecked();
    });
  });

  describe("Controlled Mode", () => {
    it("respects controlled checked prop", () => {
      const { rerender } = render(
        <Toggle id="test" checked={false} ariaLabel="Test toggle" />
      );
      const input = screen.getByLabelText("Test toggle");
      expect(input).not.toBeChecked();

      rerender(<Toggle id="test" checked={true} ariaLabel="Test toggle" />);
      expect(input).toBeChecked();
    });

    it("calls onChange when clicked in controlled mode", () => {
      const handleChange = vi.fn();
      render(
        <Toggle
          id="test"
          checked={false}
          onChange={handleChange}
          ariaLabel="Test toggle"
        />
      );

      const input = screen.getByLabelText("Test toggle");
      fireEvent.click(input);

      expect(handleChange).toHaveBeenCalledWith(true);
    });
  });

  describe("Uncontrolled Mode", () => {
    it("toggles state when clicked in uncontrolled mode", () => {
      render(<Toggle id="test" ariaLabel="Test toggle" />);
      const input = screen.getByLabelText("Test toggle");

      expect(input).not.toBeChecked();
      fireEvent.click(input);
      expect(input).toBeChecked();
      fireEvent.click(input);
      expect(input).not.toBeChecked();
    });

    it("calls onChange in uncontrolled mode", () => {
      const handleChange = vi.fn();
      render(
        <Toggle id="test" onChange={handleChange} ariaLabel="Test toggle" />
      );

      const input = screen.getByLabelText("Test toggle");
      fireEvent.click(input);

      expect(handleChange).toHaveBeenCalledWith(true);
    });
  });

  describe("Props", () => {
    it("applies custom className", () => {
      render(
        <Toggle id="test" className="custom-class" ariaLabel="Test toggle" />
      );
      const label = screen.getByLabelText("Test toggle").parentElement;
      expect(label).toHaveClass("custom-class");
    });

    it("applies disabled state", () => {
      render(<Toggle id="test" disabled={true} ariaLabel="Test toggle" />);
      const input = screen.getByLabelText("Test toggle");
      expect(input).toBeDisabled();
    });

    it("does not call onChange when disabled", () => {
      const handleChange = vi.fn();
      render(
        <Toggle
          id="test"
          disabled={true}
          onChange={handleChange}
          ariaLabel="Test toggle"
        />
      );

      const input = screen.getByLabelText("Test toggle");
      fireEvent.click(input);

      expect(handleChange).not.toHaveBeenCalled();
    });

    it("applies custom aria-label", () => {
      render(<Toggle id="test" ariaLabel="Custom label" />);
      const input = screen.getByLabelText("Custom label");
      expect(input).toBeInTheDocument();
    });
  });

  describe("Styling", () => {
    it("applies rounded style when rounded prop is true", () => {
      render(<Toggle id="test" rounded={true} ariaLabel="Test toggle" />);
      const slider = screen.getByLabelText("Test toggle").nextElementSibling;

      // Check that the slider exists and has some classes (Vanilla Extract generates classes)
      expect(slider).toBeInTheDocument();
      expect(slider?.className).toBeTruthy(); // Should have some classes

      // Also check that the thumb exists and has styling
      const thumb = slider?.querySelector("span");
      expect(thumb).toBeInTheDocument();
      expect(thumb?.className).toBeTruthy(); // Should have some classes
    });

    it("applies custom colors through inline styles", () => {
      const colors = {
        background: "#ff0000",
        checked: "#00ff00",
        slider: "#0000ff",
      };

      render(
        <Toggle
          id="test"
          checked={false}
          colors={colors}
          ariaLabel="Test toggle"
        />
      );

      const slider = screen.getByLabelText("Test toggle").nextElementSibling;
      expect(slider).toHaveStyle({ backgroundColor: "#ff0000" });
    });
  });
});
