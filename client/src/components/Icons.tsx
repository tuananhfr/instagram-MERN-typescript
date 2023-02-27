import React from "react";
type Props = {
  width?: string;
  height?: string;
  className?: string;
};

export const HomeIcon: React.FC<Props> = ({
  width = "1.5rem",
  height = "1.5rem",
  className,
}) => (
  <svg
    aria-label="Home"
    className={className}
    color="rgb(38, 38, 38)"
    fill="rgb(38, 38, 38)"
    height="24"
    role="img"
    viewBox="0 0 24 24"
    width="24"
  >
    <path
      d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z"
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="2"
    ></path>
  </svg>
);

export const HomeActiveIcon: React.FC<Props> = ({
  width = "1.5rem",
  height = "1.5rem",
  className,
}) => (
  <svg
    aria-label="Home"
    className={className}
    color="rgb(38, 38, 38)"
    fill="rgb(38, 38, 38)"
    height={height}
    role="img"
    viewBox="0 0 24 24"
    width={width}
  >
    <path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z"></path>
  </svg>
);
export const SearchIcon: React.FC<Props> = ({
  width = "1.5rem",
  height = "1.5rem",
  className,
}) => (
  <svg
    aria-label="Search"
    className={className}
    color="rgb(38, 38, 38)"
    fill="rgb(38, 38, 38)"
    height={height}
    role="img"
    viewBox="0 0 24 24"
    width={width}
  >
    <path
      d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    ></path>
    <line
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      x1="16.511"
      x2="22"
      y1="16.511"
      y2="22"
    ></line>
  </svg>
);
export const SearchActiveIcon: React.FC<Props> = ({
  width = "1.5rem",
  height = "1.5rem",
  className,
}) => (
  <svg
    aria-label="Search"
    className={className}
    color="rgb(38, 38, 38)"
    fill="rgb(38, 38, 38)"
    height={height}
    role="img"
    viewBox="0 0 24 24"
    width={width}
  >
    <path
      d="M18.5 10.5a8 8 0 1 1-8-8 8 8 0 0 1 8 8Z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
    ></path>
    <line
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
      x1="16.511"
      x2="21.643"
      y1="16.511"
      y2="21.643"
    ></line>
  </svg>
);
export const ExploreIcon: React.FC<Props> = ({
  width = "1.5rem",
  height = "1.5rem",
  className,
}) => (
  <svg
    aria-label="Explore"
    className={className}
    color="rgb(38, 38, 38)"
    fill="rgb(38, 38, 38)"
    height={height}
    role="img"
    viewBox="0 0 24 24"
    width={width}
  >
    <polygon
      fill="none"
      points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    ></polygon>
    <polygon
      fillRule="evenodd"
      points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056"
    ></polygon>
    <circle
      cx="12.001"
      cy="12.005"
      fill="none"
      r="10.5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    ></circle>
  </svg>
);
export const ExploreActiveIcon: React.FC<Props> = ({
  width = "1.5rem",
  height = "1.5rem",
  className,
}) => (
  <svg
    aria-label="Explore"
    className={className}
    color="rgb(38, 38, 38)"
    fill="rgb(38, 38, 38)"
    height={height}
    role="img"
    viewBox="0 0 24 24"
    width={width}
  >
    <path d="m13.173 13.164 1.491-3.829-3.83 1.49ZM12.001.5a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12.001.5Zm5.35 7.443-2.478 6.369a1 1 0 0 1-.57.569l-6.36 2.47a1 1 0 0 1-1.294-1.294l2.48-6.369a1 1 0 0 1 .57-.569l6.359-2.47a1 1 0 0 1 1.294 1.294Z"></path>
  </svg>
);
export const MessagesIcon: React.FC<Props> = ({
  width = "1.5rem",
  height = "1.5rem",
  className,
}) => (
  <svg
    aria-label="Direct"
    className={className}
    color="rgb(38, 38, 38)"
    fill="rgb(38, 38, 38)"
    height={height}
    role="img"
    viewBox="0 0 24 24"
    width={width}
  >
    <line
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="2"
      x1="22"
      x2="9.218"
      y1="3"
      y2="10.083"
    ></line>
    <polygon
      fill="none"
      points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="2"
    ></polygon>
  </svg>
);
export const MessagesActiveIcon: React.FC<Props> = ({
  width = "1.5rem",
  height = "1.5rem",
  className,
}) => (
  <svg
    aria-label="Direct"
    className={className}
    color="rgb(38, 38, 38)"
    fill="rgb(38, 38, 38)"
    height={height}
    role="img"
    viewBox="0 0 24 24"
    width={width}
  >
    <path
      d="M22.91 2.388a.69.69 0 0 0-.597-.347l-20.625.002a.687.687 0 0 0-.482 1.178L7.26 9.16a.686.686 0 0 0 .778.128l7.612-3.657a.723.723 0 0 1 .937.248.688.688 0 0 1-.225.932l-7.144 4.52a.69.69 0 0 0-.3.743l2.102 8.692a.687.687 0 0 0 .566.518.655.655 0 0 0 .103.008.686.686 0 0 0 .59-.337L22.903 3.08a.688.688 0 0 0 .007-.692"
      fillRule="evenodd"
    ></path>
  </svg>
);
export const NotificationsIcon: React.FC<Props> = ({
  width = "1.5rem",
  height = "1.5rem",
  className,
}) => (
  <svg
    aria-label="Notifications"
    className="_ab6-"
    color="rgb(38, 38, 38)"
    fill="rgb(38, 38, 38)"
    height={height}
    role="img"
    viewBox="0 0 24 24"
    width={width}
  >
    <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
  </svg>
);
export const NotificationsActiveIcon: React.FC<Props> = ({
  width = "1.5rem",
  height = "1.5rem",
  className,
}) => (
  <svg
    aria-label="Notifications"
    className={className}
    color="rgb(38, 38, 38)"
    fill="rgb(38, 38, 38)"
    height={height}
    role="img"
    viewBox="0 0 48 48"
    width={width}
  >
    <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
  </svg>
);

export const CreateIcon: React.FC<Props> = ({
  width = "1.5rem",
  height = "1.5rem",
  className,
}) => (
  <svg
    aria-label="New post"
    className={className}
    color="rgb(38, 38, 38)"
    fill="rgb(38, 38, 38)"
    height={height}
    role="img"
    viewBox="0 0 24 24"
    width={width}
  >
    <path
      d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    ></path>
    <line
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      x1="6.545"
      x2="17.455"
      y1="12.001"
      y2="12.001"
    ></line>
    <line
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      x1="12.003"
      x2="12.003"
      y1="6.545"
      y2="17.455"
    ></line>
  </svg>
);
export const CreateActiveIcon: React.FC<Props> = ({
  width = "1.5rem",
  height = "1.5rem",
  className,
}) => (
  <svg
    aria-label="New post"
    className={className}
    color="rgb(38, 38, 38)"
    fill="rgb(38, 38, 38)"
    height={height}
    role="img"
    viewBox="0 0 24 24"
    width={height}
  >
    <path d="m12.003 5.545-.117.006-.112.02a1 1 0 0 0-.764.857l-.007.117V11H6.544l-.116.007a1 1 0 0 0-.877.876L5.545 12l.007.117a1 1 0 0 0 .877.876l.116.007h4.457l.001 4.454.007.116a1 1 0 0 0 .876.877l.117.007.117-.007a1 1 0 0 0 .876-.877l.007-.116V13h4.452l.116-.007a1 1 0 0 0 .877-.876l.007-.117-.007-.117a1 1 0 0 0-.877-.876L17.455 11h-4.453l.001-4.455-.007-.117a1 1 0 0 0-.876-.877ZM8.552.999h6.896c2.754 0 4.285.579 5.664 1.912 1.255 1.297 1.838 2.758 1.885 5.302L23 8.55v6.898c0 2.755-.578 4.286-1.912 5.664-1.298 1.255-2.759 1.838-5.302 1.885l-.338.003H8.552c-2.754 0-4.285-.579-5.664-1.912-1.255-1.297-1.839-2.758-1.885-5.302L1 15.45V8.551c0-2.754.579-4.286 1.912-5.664C4.21 1.633 5.67 1.05 8.214 1.002L8.552 1Z"></path>
  </svg>
);

export const SettingsIcon: React.FC<Props> = ({
  width = "1.5rem",
  height = "1.5rem",
  className,
}) => (
  <svg
    aria-label="Settings"
    className={className}
    color="rgb(38, 38, 38)"
    fill="rgb(38, 38, 38)"
    height={height}
    role="img"
    viewBox="0 0 24 24"
    width={width}
  >
    <line
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      x1="3"
      x2="21"
      y1="4"
      y2="4"
    ></line>
    <line
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      x1="3"
      x2="21"
      y1="12"
      y2="12"
    ></line>
    <line
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      x1="3"
      x2="21"
      y1="20"
      y2="20"
    ></line>
  </svg>
);
export const SettingsActiveIcon: React.FC<Props> = ({
  width = "1.5rem",
  height = "1.5rem",
  className,
}) => (
  <svg
    aria-label="Settings"
    className={className}
    color="rgb(38, 38, 38)"
    fill="rgb(38, 38, 38)"
    height={height}
    role="img"
    viewBox="0 0 24 24"
    width={width}
  >
    <path d="M3.5 6.5h17a1.5 1.5 0 0 0 0-3h-17a1.5 1.5 0 0 0 0 3Zm17 4h-17a1.5 1.5 0 0 0 0 3h17a1.5 1.5 0 0 0 0-3Zm0 7h-17a1.5 1.5 0 0 0 0 3h17a1.5 1.5 0 0 0 0-3Z"></path>
  </svg>
);
