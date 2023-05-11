import * as React from "react";

interface Props {
  children: React.ReactNode;
  enClose?: string;
}

const Container: React.FC<Props> = ({ children, enClose }) => {
  return (
    <span>
      {enClose?.slice(0, 1)}
      {children}
      {enClose?.slice(1)}
    </span>
  );
};

export default Container;
