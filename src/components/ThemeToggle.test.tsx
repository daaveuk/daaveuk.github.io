import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ThemeToggle from "./ThemeToggle";

// Mock the global toggleTheme function
const mockToggleTheme = vi.fn();

describe("ThemeToggle", () => {
  beforeEach(() => {
    // Setup DOM
    document.documentElement.setAttribute("data-theme", "light");

    // Setup window.toggleTheme mock
    Object.defineProperty(window, "toggleTheme", {
      writable: true,
      value: mockToggleTheme,
    });

    // Clear localStorage
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("renders theme toggle button", () => {
    render(<ThemeToggle />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "button");
  });

  it("renders with correct accessibility attributes", () => {
    render(<ThemeToggle />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label");
    expect(button).toHaveAttribute("aria-pressed");

    const group = screen.getByRole("group");
    expect(group).toHaveAttribute("aria-labelledby", "theme-toggle-label");
  });

  it("accepts custom id prop", () => {
    render(<ThemeToggle id="custom-toggle" />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("id", "custom-toggle");
  });

  it("displays correct aria-label for light mode", () => {
    document.documentElement.setAttribute("data-theme", "light");
    render(<ThemeToggle />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Switch to dark mode");
    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  it("displays correct aria-label for dark mode", async () => {
    document.documentElement.setAttribute("data-theme", "dark");
    render(<ThemeToggle />);

    // Wait for useEffect to process the theme change
    await waitFor(() => {
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label", "Switch to light mode");
      expect(button).toHaveAttribute("aria-pressed", "true");
    });
  });

  it("calls window.toggleTheme when clicked", () => {
    render(<ThemeToggle />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });
  it("handles missing window.toggleTheme gracefully", () => {
    // Remove the toggleTheme function
    (window as any).toggleTheme = undefined;
    render(<ThemeToggle />);

    const button = screen.getByRole("button");

    // Should not throw error when clicked
    expect(() => fireEvent.click(button)).not.toThrow();
  });

  it("responds to theme change events", async () => {
    render(<ThemeToggle />);

    // Initially light mode
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-pressed", "false");

    // Simulate theme change event
    const themeChangeEvent = new CustomEvent("themeChange", {
      detail: { theme: "dark" },
    });

    window.dispatchEvent(themeChangeEvent);

    await waitFor(() => {
      expect(button).toHaveAttribute("aria-pressed", "true");
      expect(button).toHaveAttribute("aria-label", "Switch to light mode");
    });
  });

  it("contains sun and moon icons", () => {
    render(<ThemeToggle />);

    const sunIcon = screen.getByText("☀️");
    const moonIcon = screen.getByText("🌙");

    expect(sunIcon).toBeInTheDocument();
    expect(moonIcon).toBeInTheDocument();
    expect(sunIcon).toHaveAttribute("aria-hidden", "true");
    expect(moonIcon).toHaveAttribute("aria-hidden", "true");
  });

  it("has proper CSS classes for styling", () => {
    render(<ThemeToggle />);

    expect(screen.getByRole("group")).toHaveClass("theme-toggle-wrapper");
    expect(screen.getByRole("button")).toHaveClass("theme-toggle");
    expect(document.querySelector(".theme-toggle-track")).toBeInTheDocument();
    expect(document.querySelector(".theme-toggle-thumb")).toBeInTheDocument();
    expect(document.querySelector(".theme-toggle-icons")).toBeInTheDocument();
  });
});
