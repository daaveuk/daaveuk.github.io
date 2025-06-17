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

  it("renders theme toggle checkbox", () => {
    render(<ThemeToggle />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute("type", "checkbox");
  });

  it("renders with correct accessibility attributes", () => {
    render(<ThemeToggle />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("aria-label");

    const group = screen.getByRole("group");
    expect(group).toHaveAttribute("aria-labelledby", "theme-toggle-label");
  });

  it("accepts custom id prop", () => {
    render(<ThemeToggle id="custom-toggle" />);

    const toggle = screen.getByLabelText("Toggle switch").closest("label");
    expect(toggle).toHaveAttribute("id", "custom-toggle");
  });

  it("displays correct state for light mode", () => {
    document.documentElement.setAttribute("data-theme", "light");
    render(<ThemeToggle />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  it("displays correct state for dark mode", async () => {
    document.documentElement.setAttribute("data-theme", "dark");
    render(<ThemeToggle />);

    // Wait for useEffect to process the theme change
    await waitFor(() => {
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeChecked();
    });
  });

  it("calls window.toggleTheme when clicked", () => {
    render(<ThemeToggle />);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  it("handles missing window.toggleTheme gracefully", () => {
    // Remove the toggleTheme function
    (window as any).toggleTheme = undefined;
    render(<ThemeToggle />);

    const checkbox = screen.getByRole("checkbox");

    // Should not throw error when clicked
    expect(() => fireEvent.click(checkbox)).not.toThrow();
  });

  it("responds to theme change events", async () => {
    render(<ThemeToggle />);

    // Initially light mode
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();

    // Simulate theme change event
    const themeChangeEvent = new CustomEvent("themeChange", {
      detail: { theme: "dark" },
    });

    window.dispatchEvent(themeChangeEvent);

    await waitFor(() => {
      expect(checkbox).toBeChecked();
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

    // Check that elements have Vanilla Extract generated classes (just check they exist)
    const group = screen.getByRole("group");
    expect(group.className).toBeTruthy(); // Should have some class

    const toggle = screen.getByLabelText("Toggle switch").closest("label");
    expect(toggle?.className).toBeTruthy(); // Should have some class
  });
});
