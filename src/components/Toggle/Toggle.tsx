import React, { useState } from "react";
import * as styles from "./styles/index.css";

export interface ToggleProps {
  id: string;
  /**
   * Controlled state - whether the toggle is checked
   */
  checked?: boolean;
  /**
   * Default checked state (for uncontrolled usage)
   */
  defaultChecked?: boolean;
  /**
   * Callback fired when the toggle state changes
   */
  onChange?: (checked: boolean) => void;
  /**
   * Whether the toggle has rounded corners
   */
  rounded?: boolean;
  /**
   * Accessible label for the toggle
   */
  ariaLabel?: string;
  /**
   * Whether the toggle is disabled
   */
  disabled?: boolean;
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * Custom colors for the toggle
   */
  colors?: {
    background?: string;
    checked?: string;
    slider?: string;
  };
}

export const Toggle: React.FC<ToggleProps> = ({
  id,
  checked,
  defaultChecked = false,
  onChange,
  rounded = false,
  ariaLabel = "Toggle switch",
  disabled = false,
  className = "",
  colors,
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  // Use controlled or uncontrolled pattern
  const isChecked = checked !== undefined ? checked : internalChecked;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) {
      return; // Don't process changes when disabled
    }

    const newChecked = event.target.checked;

    if (checked === undefined) {
      setInternalChecked(newChecked);
    }

    onChange?.(newChecked);
  };

  const getSliderClasses = () => {
    let classes = styles.slider;

    if (isChecked) {
      classes += ` ${styles.sliderChecked}`;
    }

    if (disabled) {
      classes += ` ${styles.sliderDisabled}`;
    }

    if (rounded) {
      classes += ` ${styles.round}`;
    }

    return classes;
  };

  const getSliderThumbClasses = () => {
    let classes = styles.sliderThumb;

    if (isChecked) {
      classes += ` ${styles.sliderThumbChecked}`;
    }

    if (rounded) {
      classes += ` ${styles.sliderThumbRound}`;
    }

    return classes;
  };

  return (
    <label id={`${id}`} className={`${styles.switchContainer} ${className}`}>
      <input
        id={`${id}-input`}
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        aria-label={ariaLabel}
        className={styles.input}
      />
      <span
        className={getSliderClasses()}
        style={{
          backgroundColor: isChecked
            ? colors?.checked || undefined
            : colors?.background || undefined,
        }}
      >
        <span
          className={getSliderThumbClasses()}
          style={{
            backgroundColor: colors?.slider || undefined,
          }}
        />
      </span>
    </label>
  );
};

export default Toggle;
