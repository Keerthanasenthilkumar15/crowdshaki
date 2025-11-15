"use server";

import { renderToStaticMarkup } from "react-dom/server";
import ApproveRejectEmail from "../email/ApproveRejectEmail";

export const generateApprovalEmailHtml = (approveUrl, rejectUrl) => {
  const emailComponent = <ApproveRejectEmail approveUrl={approveUrl} rejectUrl={rejectUrl} />;
  return renderToStaticMarkup(emailComponent);
};
