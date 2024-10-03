import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate = ({ firstName }: EmailTemplateProps) => {
  return (
    <>
      <p>Welcome! {firstName}</p>
    </>
  );
};
