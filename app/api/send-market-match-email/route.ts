import {
  adminEmailSubject,
  generateAdminNotificationEmailCopy,
  generateTraderEmailCopy,
  traderEmailSubject,
} from "@/data/emailTemplates";
import type { MarketMatchLead, MarketMatchResult } from "@/lib/types";
import { Resend } from "resend";

const sender = "TradeAnchor <onboarding@resend.dev>";
const fallbackAdminEmail = "klima620@gmail.com";

type SendMarketMatchEmailRequest = {
  lead?: MarketMatchLead;
  result?: MarketMatchResult;
};

type ResendEmailPayload = {
  to: string[];
  subject: string;
  text: string;
};

function isValidRequestBody(
  body: SendMarketMatchEmailRequest,
): body is { lead: MarketMatchLead; result: MarketMatchResult } {
  return Boolean(
    body.lead?.firstName &&
      body.lead.email &&
      body.lead.capturedAt &&
      body.result?.primaryMarketId &&
      body.result.secondaryMarketId &&
      body.result.bestStyleId &&
      body.result.bestWindowId &&
      body.result.archetypeId,
  );
}

function toHtmlEmail(text: string) {
  const escaped = text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

  return `<pre style="font-family: Arial, sans-serif; white-space: pre-wrap; color: #0F172A; line-height: 1.6;">${escaped}</pre>`;
}

async function sendResendEmail({ to, subject, text }: ResendEmailPayload) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY");
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: sender,
    to,
    subject,
    text,
    html: toHtmlEmail(text),
  });

  if (error) {
    throw new Error(`Resend email failed: ${error.message}`);
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SendMarketMatchEmailRequest;

    if (!isValidRequestBody(body)) {
      return Response.json(
        { ok: false, error: "Missing lead or result data." },
        { status: 400 },
      );
    }

    const traderEmail = generateTraderEmailCopy(body.lead, body.result);
    const adminEmailCopy = generateAdminNotificationEmailCopy(
      body.lead,
      body.result,
    );
    const failures: string[] = [];

    await Promise.allSettled([
      sendResendEmail({
        to: [body.lead.email],
        subject: traderEmailSubject,
        text: traderEmail.body,
      }),
      sendResendEmail({
        to: [process.env.ADMIN_NOTIFICATION_EMAIL || fallbackAdminEmail],
        subject: adminEmailSubject,
        text: adminEmailCopy.body,
      }),
    ]).then((results) => {
      results.forEach((result) => {
        if (result.status === "rejected") {
          const message =
            result.reason instanceof Error
              ? result.reason.message
              : "Unknown email error";
          failures.push(message);
          console.error(message);
        }
      });
    });

    return Response.json({
      ok: failures.length === 0,
      failures,
    });
  } catch (error) {
    console.error("Market Match email route failed", error);

    return Response.json(
      { ok: false, error: "Unable to process email request." },
      { status: 500 },
    );
  }
}
