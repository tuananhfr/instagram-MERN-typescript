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

export const UploadImg: React.FC<Props> = ({
  width = "6rem",
  height = "4.8rem",
  className,
}) => (
  <svg
    aria-label="Icon to represent media such as images or videos"
    className={className}
    color="rgb(38, 38, 38)"
    fill="rgb(38, 38, 38)"
    height={height}
    role="img"
    viewBox="0 0 97.6 77.3"
    width={width}
  >
    <path
      d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
      fill="currentColor"
    ></path>
    <path
      d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
      fill="currentColor"
    ></path>
    <path
      d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
      fill="currentColor"
    ></path>
  </svg>
);

export const EmojiIcon: React.FC<Props> = ({
  width = "1.25rem",
  height = "1.25rem",
  className,
}) => (
  <svg
    aria-label="Emoji"
    className={className}
    color="rgb(142, 142, 142)"
    fill="rgb(142, 142, 142)"
    height={height}
    role="img"
    viewBox="0 0 24 24"
    width={width}
  >
    <path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path>
  </svg>
);

export const LikeIcon: React.FC<Props> = ({
  width = "1.5rem",
  height = "1.5rem",
  className,
}) => (
  <svg
    aria-label="Like"
    className={className}
    color="rgb(38, 38, 38)"
    fill="rgb(38, 38, 38)"
    height={height}
    role="img"
    viewBox="0 0 24 24"
    width={width}
  >
    <title>Like</title>
    <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
  </svg>
);

export const UnlikeIcon: React.FC<Props> = ({
  width = "1.5rem",
  height = "1.5rem",
  className,
}) => (
  <svg
    aria-label="Unlike"
    className={className}
    color="rgb(255, 48, 64)"
    fill="rgb(255, 48, 64)"
    height={height}
    role="img"
    viewBox="0 0 48 48"
    width={width}
  >
    <title>Unlike</title>
    <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
  </svg>
);

export const LikeCommentIcon: React.FC<Props> = ({
  width = "0.75rem",
  height = "0.75rem",
  className,
}) => (
  <svg
    aria-label="Like"
    className={className}
    color="rgb(38, 38, 38)"
    fill="rgb(38, 38, 38)"
    height={height}
    role="img"
    viewBox="0 0 24 24"
    width={width}
  >
    <title>Like</title>
    <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
  </svg>
);

export const UnlikeCommentIcon: React.FC<Props> = ({
  width = "0.75rem",
  height = "0.75rem",
  className,
}) => (
  <svg
    aria-label="Unlike"
    className={className}
    color="rgb(255, 48, 64)"
    fill="rgb(255, 48, 64)"
    height={height}
    role="img"
    viewBox="0 0 48 48"
    width={width}
  >
    <title>Unlike</title>
    <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
  </svg>
);

export const CommentIcon: React.FC<Props> = ({
  width = "1.5rem",
  height = "1.5rem",
  className,
}) => (
  <svg
    aria-label="Comment"
    className={className}
    color="rgb(38,38,38)"
    fill="rgb(38,38,38)"
    height={height}
    role="img"
    viewBox="0 0 24 24"
    width={width}
  >
    <title>Comment</title>
    <path
      d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="2"
    ></path>
  </svg>
);

export const ShareIcon: React.FC<Props> = ({
  width = "1.5rem",
  height = "1.5rem",
  className,
}) => (
  <svg
    aria-label="Share Post"
    className={className}
    color="rgb(38, 38, 38)"
    fill="rgb(38, 38, 38)"
    height={height}
    role="img"
    viewBox="0 0 24 24"
    width={width}
  >
    <title>Share Post</title>
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

export const SaveIcon: React.FC<Props> = ({
  width = "1.5rem",
  height = "1.5rem",
  className,
}) => (
  <svg
    aria-label="Save"
    className={className}
    color="rgb(38,38,38)"
    fill="rgb(38,38,38)"
    height={height}
    role="img"
    viewBox="0 0 24 24"
    width={width}
  >
    <title>Save</title>
    <polygon
      fill="none"
      points="20 21 12 13.44 4 21 4 3 20 3 20 21"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    ></polygon>
  </svg>
);

export const SaveActiveIcon: React.FC<Props> = ({
  width = "1.5rem",
  height = "1.5rem",
  className,
}) => (
  <svg
    aria-label="Remove"
    className={className}
    color="rgb(38, 38, 38)"
    fill="rgb(38, 38, 38)"
    height={height}
    role="img"
    viewBox="0 0 24 24"
    width={width}
  >
    <title>Remove</title>
    <path d="M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z"></path>
  </svg>
);

export const UpdateIcon: React.FC<Props> = ({
  width = "1.5rem",
  height = "1.5rem",
  className,
}) => (
  <svg
    aria-label="More options"
    className={className}
    color="rgb(142, 142, 142)"
    fill="rgb(142, 142, 142)"
    height={height}
    role="img"
    viewBox="0 0 24 24"
    width={width}
  >
    <circle cx="12" cy="12" r="1.5"></circle>
    <circle cx="6" cy="12" r="1.5"></circle>
    <circle cx="18" cy="12" r="1.5"></circle>
  </svg>
);

export const PostsFocusIcon: React.FC<Props> = ({
  width = "0.75rem",
  height = "0.75rem",
  className,
}) => (
  <svg
    aria-label=""
    className={className}
    color="rgb(38, 38, 38)"
    fill="rgb(38, 38, 38)"
    height={height}
    role="img"
    viewBox="0 0 24 24"
    width={width}
  >
    <rect
      fill="none"
      height="18"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      width="18"
      x="3"
      y="3"
    ></rect>
    <line
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      x1="9.015"
      x2="9.015"
      y1="3"
      y2="21"
    ></line>
    <line
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      x1="14.985"
      x2="14.985"
      y1="3"
      y2="21"
    ></line>
    <line
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      x1="21"
      x2="3"
      y1="9.015"
      y2="9.015"
    ></line>
    <line
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      x1="21"
      x2="3"
      y1="14.985"
      y2="14.985"
    ></line>
  </svg>
);

export const PostsIcon: React.FC<Props> = ({
  width = "0.75rem",
  height = "0.75rem",
  className,
}) => (
  <svg
    aria-label=""
    className={className}
    color="rgb(142,142,142)"
    fill="rgb(142,142,142)"
    height={height}
    role="img"
    viewBox="0 0 24 24"
    width={width}
  >
    <rect
      fill="none"
      height="18"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      width="18"
      x="3"
      y="3"
    ></rect>
    <line
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      x1="9.015"
      x2="9.015"
      y1="3"
      y2="21"
    ></line>
    <line
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      x1="14.985"
      x2="14.985"
      y1="3"
      y2="21"
    ></line>
    <line
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      x1="21"
      x2="3"
      y1="9.015"
      y2="9.015"
    ></line>
    <line
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      x1="21"
      x2="3"
      y1="14.985"
      y2="14.985"
    ></line>
  </svg>
);

export const SavedFocusIcon: React.FC<Props> = ({
  width = "0.75rem",
  height = "0.75rem",
  className,
}) => (
  <svg
    aria-label=""
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
      points="20 21 12 13.44 4 21 4 3 20 3 20 21"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    ></polygon>
  </svg>
);

export const SavedIcon: React.FC<Props> = ({
  width = "0.75rem",
  height = "0.75rem",
  className,
}) => (
  <svg
    aria-label=""
    className={className}
    color="rgb(142, 142, 142)"
    fill="rgb(142, 142, 142)"
    height={height}
    role="img"
    viewBox="0 0 24 24"
    width={width}
  >
    <polygon
      fill="none"
      points="20 21 12 13.44 4 21 4 3 20 3 20 21"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    ></polygon>
  </svg>
);

export const NotificationActiveIcon: React.FC<Props> = ({
  width = "1.5rem",
  height = "1.5rem",
  className,
}) => (
  <svg
    aria-label=""
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

export const CreateMessagesIcon: React.FC<Props> = ({
  width = "1.5rem",
  height = "1.5rem",
  className,
}) => (
  <svg
    aria-label="New message"
    className={className}
    color="rgb(0, 0, 0)"
    fill="rgb(0, 0, 0)"
    height={height}
    role="img"
    viewBox="0 0 24 24"
    width={width}
  >
    <title>New message</title>
    <path
      d="M12.202 3.203H5.25a3 3 0 0 0-3 3V18.75a3 3 0 0 0 3 3h12.547a3 3 0 0 0 3-3v-6.952"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    ></path>
    <path
      d="M10.002 17.226H6.774v-3.228L18.607 2.165a1.417 1.417 0 0 1 2.004 0l1.224 1.225a1.417 1.417 0 0 1 0 2.004Z"
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
      x1="16.848"
      x2="20.076"
      y1="3.924"
      y2="7.153"
    ></line>
  </svg>
);

export const YourMessagesIcon: React.FC<Props> = ({
  width = "6rem",
  height = "6rem",
  className,
}) => (
  <svg
    aria-label="Direct"
    className={className}
    color="rgb(0, 0, 0)"
    fill="rgb(0, 0, 0)"
    height={height}
    role="img"
    viewBox="0 0 96 96"
    width={width}
  >
    <title>Direct</title>
    <circle
      cx="48"
      cy="48"
      fill="none"
      r="47"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    ></circle>
    <line
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="2"
      x1="69.286"
      x2="41.447"
      y1="33.21"
      y2="48.804"
    ></line>
    <polygon
      fill="none"
      points="47.254 73.123 71.376 31.998 24.546 32.002 41.448 48.805 47.254 73.123"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="2"
    ></polygon>
  </svg>
);

export const CallIcon: React.FC<Props> = ({
  width = "1.5rem",
  height = "1.5rem",
  className,
}) => (
  <svg
    aria-label="Audio call"
    className={className}
    color="rgb(0, 0, 0)"
    fill="rgb(0, 0, 0)"
    height={height}
    role="img"
    viewBox="0 0 24 24"
    width={width}
  >
    <title>Audio call</title>
    <path d="M18.227 22.912c-4.913 0-9.286-3.627-11.486-5.828C4.486 14.83.731 10.291.921 5.231a3.289 3.289 0 0 1 .908-2.138 17.116 17.116 0 0 1 1.865-1.71 2.307 2.307 0 0 1 3.004.174 13.283 13.283 0 0 1 3.658 5.325 2.551 2.551 0 0 1-.19 1.941l-.455.853a.463.463 0 0 0-.024.387 7.57 7.57 0 0 0 4.077 4.075.455.455 0 0 0 .386-.024l.853-.455a2.548 2.548 0 0 1 1.94-.19 13.278 13.278 0 0 1 5.326 3.658 2.309 2.309 0 0 1 .174 3.003 17.319 17.319 0 0 1-1.71 1.866 3.29 3.29 0 0 1-2.138.91 10.27 10.27 0 0 1-.368.006Zm-13.144-20a.27.27 0 0 0-.167.054A15.121 15.121 0 0 0 3.28 4.47a1.289 1.289 0 0 0-.36.836c-.161 4.301 3.21 8.34 5.235 10.364s6.06 5.403 10.366 5.236a1.284 1.284 0 0 0 .835-.36 15.217 15.217 0 0 0 1.504-1.637.324.324 0 0 0-.047-.41 11.62 11.62 0 0 0-4.457-3.119.545.545 0 0 0-.411.044l-.854.455a2.452 2.452 0 0 1-2.071.116 9.571 9.571 0 0 1-5.189-5.188 2.457 2.457 0 0 1 .115-2.071l.456-.855a.544.544 0 0 0 .043-.41 11.629 11.629 0 0 0-3.118-4.458.36.36 0 0 0-.244-.1Z"></path>
  </svg>
);

export const VideoCallIcon: React.FC<Props> = ({
  width = "1.5rem",
  height = "1.5rem",
  className,
}) => (
  <svg
    aria-label="Video call"
    className={className}
    color="rgb(0, 0, 0)"
    fill="rgb(0, 0, 0)"
    height={height}
    role="img"
    viewBox="0 0 24 24"
    width={width}
  >
    <title>Video call</title>
    <rect
      fill="none"
      height="18"
      rx="3"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      width="16.999"
      x="1"
      y="3"
    ></rect>
    <path
      d="m17.999 9.146 2.495-2.256A1.5 1.5 0 0 1 23 8.003v7.994a1.5 1.5 0 0 1-2.506 1.113L18 14.854"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    ></path>
  </svg>
);

export const CallActiveIcon: React.FC<Props> = ({
  width = "1.5rem",
  height = "1.5rem",
  className,
}) => (
  <svg
    aria-label="Audio call started"
    className={className}
    color="rgb(0, 0, 0)"
    fill="rgb(0, 0, 0)"
    height={height}
    role="img"
    viewBox="0 0 24 24"
    width={width}
  >
    <title>Audio call started</title>
    <path d="M18.227 22.912c-4.913 0-9.286-3.627-11.486-5.828C4.486 14.83.731 10.291.921 5.231a3.289 3.289 0 0 1 .908-2.138 17.116 17.116 0 0 1 1.865-1.71 2.308 2.308 0 0 1 3.004.174 13.283 13.283 0 0 1 3.658 5.325 2.551 2.551 0 0 1-.19 1.941l-.455.853a.463.463 0 0 0-.024.387 7.57 7.57 0 0 0 4.077 4.075.46.46 0 0 0 .386-.024l.853-.455a2.553 2.553 0 0 1 1.94-.19 13.278 13.278 0 0 1 5.326 3.658 2.309 2.309 0 0 1 .174 3.003 17.319 17.319 0 0 1-1.71 1.866 3.29 3.29 0 0 1-2.138.91 10.27 10.27 0 0 1-.368.006Z"></path>
  </svg>
);

export const VideoCallActiveIcon: React.FC<Props> = ({
  width = "1.5rem",
  height = "1.5rem",
  className,
}) => (
  <svg
    aria-label="Video call ended"
    className={className}
    color="rgb(0, 0, 0)"
    fill="rgb(0, 0, 0)"
    height={height}
    role="img"
    viewBox="0 0 24 24"
    width={width}
  >
    <title>Video call ended</title>
    <path
      d="M21.259 5.935q-.401.404-.877.88a2.998 2.998 0 0 0-.88 2.121v6.18a3 3 0 0 0 .878 2.121l.879.881A1.653 1.653 0 0 0 24 16.953V7.101a1.653 1.653 0 0 0-2.742-1.166Zm-7.075-3.408H3.818A3.823 3.823 0 0 0-.001 6.345v11.364a3.823 3.823 0 0 0 3.819 3.818h10.366a3.823 3.823 0 0 0 3.818-3.818V6.345a3.823 3.823 0 0 0-3.818-3.818Z"
      fillRule="evenodd"
    ></path>
  </svg>
);

export const SettingsMessagesIcon: React.FC<Props> = ({
  width = "1.5rem",
  height = "1.5rem",
  className,
}) => (
  <svg
    aria-label="View Thread Details"
    className={className}
    color="rgb(0, 0, 0)"
    fill="rgb(0, 0, 0)"
    height={height}
    role="img"
    viewBox="0 0 24 24"
    width={width}
  >
    <title>View Thread Details</title>
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
    <circle cx="11.819" cy="7.709" r="1.25"></circle>
    <line
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      x1="10.569"
      x2="13.432"
      y1="16.777"
      y2="16.777"
    ></line>
    <polyline
      fill="none"
      points="10.569 11.05 12 11.05 12 16.777"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    ></polyline>
  </svg>
);

export const ImagesMessageIcon: React.FC<Props> = ({
  width = "1.5rem",
  height = "1.5rem",
  className,
}) => (
  <svg
    aria-label="Add Photo or Video"
    className={className}
    color="rgb(0, 0, 0)"
    fill="rgb(0, 0, 0)"
    height={height}
    role="img"
    viewBox="0 0 24 24"
    width={width}
  >
    <title>Add Photo or Video</title>
    <path
      d="M6.549 5.013A1.557 1.557 0 1 0 8.106 6.57a1.557 1.557 0 0 0-1.557-1.557Z"
      fillRule="evenodd"
    ></path>
    <path
      d="m2 18.605 3.901-3.9a.908.908 0 0 1 1.284 0l2.807 2.806a.908.908 0 0 0 1.283 0l5.534-5.534a.908.908 0 0 1 1.283 0l3.905 3.905"
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="2"
    ></path>
    <path
      d="M18.44 2.004A3.56 3.56 0 0 1 22 5.564h0v12.873a3.56 3.56 0 0 1-3.56 3.56H5.568a3.56 3.56 0 0 1-3.56-3.56V5.563a3.56 3.56 0 0 1 3.56-3.56Z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    ></path>
  </svg>
);
