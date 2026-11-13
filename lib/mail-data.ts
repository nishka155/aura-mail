export interface Contact {
  name: string;
  email: string;
  color: string;
}

export interface Attachment {
  name: string;
  size: string;
  type: "pdf" | "image" | "doc" | "code" | "other";
}

export type FolderType = "inbox" | "sent" | "drafts" | "spam" | "trash";

export interface Email {
  id: string;
  from: Contact;
  to: Contact[];
  cc?: Contact[];
  subject: string;
  preview: string;
  body: string;
  timestamp: string;
  read: boolean;
  starred: boolean;
  folder: FolderType;
  attachments?: Attachment[];
  labels?: string[];
}

export const ME: Contact = { name: "You", email: "me@aura.mail", color: "#8b5cf6" };

export const CONTACTS: Record<string, Contact> = {
  alice:  { name: "Alice Chen",      email: "alice@designstudio.io",  color: "#8b5cf6" },
  marcus: { name: "Marcus Okafor",   email: "m.okafor@venturecap.io", color: "#06b6d4" },
  priya:  { name: "Priya Sharma",    email: "priya@pixelflow.dev",    color: "#f59e0b" },
  james:  { name: "James Wu",        email: "james@makerstudio.com",  color: "#10b981" },
  elena:  { name: "Elena Vasquez",   email: "elena@luminary.ai",      color: "#ec4899" },
  kai:    { name: "Kai Nakamura",    email: "kai@synthesis.co",       color: "#3b82f6" },
  github: { name: "GitHub",          email: "noreply@github.com",     color: "#6b7280" },
  stripe: { name: "Stripe",          email: "billing@stripe.com",     color: "#635bff" },
  notion: { name: "Notion",          email: "notify@notion.so",       color: "#374151" },
};

export const MOCK_EMAILS: Email[] = [
  // ── Inbox ──────────────────────────────────────────
  {
    id: "e1",
    from: CONTACTS.alice,
    to: [ME],
    subject: "Design system handoff — ready for review",
    preview: "I finished the design system docs and all Figma tokens are exported. Would love your eyes on the interaction patterns before we ship.",
    body: `Hey,

I've finally wrapped up the design system handoff! Everything is in Figma with proper documentation -- here's what's included:

**Component Library**
All 47 components are documented with usage guidelines, anatomy breakdowns, and do/don't examples. The interactive states (hover, focus, active, disabled) are all specced out.

**Design Tokens**
I've exported all tokens to JSON format. Colors, typography, spacing, shadows -- everything is there. The token naming follows the semantic/primitive split we discussed.

**Interaction Patterns**
This is where I'd really love your input. I've documented 12 key interaction patterns but I'm unsure about the micro-animations for the glass components. Can you check slides 34-47 and let me know if the spring values feel right?

The Figma file is shared with the whole team. Leave any comments directly on the frames.

Best,
Alice`,
    timestamp: "2026-11-13T09:42:00Z",
    read: false,
    starred: true,
    folder: "inbox",
    attachments: [
      { name: "design-system-v2.pdf", size: "4.2 MB", type: "pdf" },
      { name: "tokens.json",           size: "12 KB",  type: "code" },
    ],
    labels: ["Design"],
  },
  {
    id: "e2",
    from: CONTACTS.marcus,
    to: [ME],
    subject: "Q4 investment memo — Aura Series A",
    preview: "We've completed initial due diligence and I'm happy to share the committee is very excited about the trajectory. The numbers are strong.",
    body: `Hi,

Following our call last Thursday, I wanted to put our thoughts in writing while they're fresh.

We completed the initial due diligence pass on Aura last week. The committee reviewed the metrics you shared -- ARR growth, retention cohorts, and the enterprise pipeline -- and I'll be direct: the numbers are strong.

**Where we landed:**
The $12M Series A at a $60M pre-money valuation feels right given the current market. We'd be leading the round with $7M, leaving room for two strategic angels you mentioned.

**Timeline:**
If you can get the data room ready by Nov 20, we could have a term sheet by EOW (Nov 28). Let me know if that works.

**Next step:**
Our partner meeting is Nov 25. Can we schedule a 30-min slot for you to present the vision? The committee already knows the numbers -- this is about the team and roadmap.

Talk soon,
Marcus`,
    timestamp: "2026-11-13T08:15:00Z",
    read: false,
    starred: false,
    folder: "inbox",
    labels: ["Finance"],
  },
  {
    id: "e3",
    from: CONTACTS.priya,
    to: [ME],
    subject: "Re: API rate limits hitting prod — found it",
    preview: "We were calling the enrichment endpoint on every keystroke instead of debouncing. Quick fix deployed to staging -- PR #847 is up for review.",
    body: `Found it!

We were calling the enrichment endpoint on every single keystroke in the search field. Zero debounce. At peak usage that was ~400 requests/minute just from search -- well above our 100 req/min tier.

**The fix:**
- Added 350ms debounce to the search input handler
- Added local caching for enrichment results (10min TTL)
- Switched from polling to webhooks for real-time updates

This should drop API usage by ~85%. I've deployed to staging and the search actually feels snappier too because we're hitting cache on second queries.

PR is up: #847 -- it's a small diff, should be a quick review.

One follow-up: we should upgrade our plan given growth. The current 100 req/min tier will be tight by Q1 even with these fixes. I'll put together a cost analysis next week.

Priya`,
    timestamp: "2026-11-12T16:30:00Z",
    read: true,
    starred: false,
    folder: "inbox",
    attachments: [
      { name: "api-usage-analysis.png", size: "220 KB", type: "image" },
    ],
    labels: ["Engineering"],
  },
  {
    id: "e4",
    from: CONTACTS.james,
    to: [ME],
    subject: "Prototype feedback — new onboarding flow",
    preview: "Ran it with 8 users yesterday. 7/8 completed without help. The main drop-off at step 3 tracks perfectly with our quantitative data.",
    body: `Quick summary from yesterday's usability sessions:

8 participants, 90 min each. Here's what I found:

**The good:**
The new progress indicator significantly reduced anxiety. 6 participants explicitly commented on knowing "how far they had to go." Time-to-first-value dropped from 11 mins avg to 6.5 mins.

**Step 3 (Integration connect) is still the wall:**
5 out of 8 participants needed help here. Main issues:
1. "Connect your first tool" is unclear -- which tools count?
2. The OAuth redirect confused 3 people (they expected to stay in the app)
3. The success state is easy to miss -- the toast is too subtle

**Suggestions from participants:**
- Show a live preview of what the connected tool will look like
- Replace the toast with an inline success state in the sidebar
- Add "why connect?" microcopy near the CTA

I'd recommend addressing point 3 before the next cohort. It's a one-day fix.

James`,
    timestamp: "2026-11-12T11:00:00Z",
    read: true,
    starred: true,
    folder: "inbox",
    labels: ["Product"],
  },
  {
    id: "e5",
    from: CONTACTS.elena,
    to: [ME],
    subject: "Luminary x Aura — collab proposal",
    preview: "We've been thinking about a co-marketing push around the AI email workflow angle. Our audiences overlap a ton and there's a real story to tell.",
    body: `Hi,

I'll be brief because I know your inbox is a warzone.

We've been building something at Luminary that pairs beautifully with what Aura is doing -- specifically the intelligent email triage piece. Our AI summary engine + your sorting logic could be a compelling joint demo.

**The proposal:**
- Co-write a "State of AI Productivity" report (we do the research, you contribute the data)
- Joint webinar to the combined audience (~12k engaged subscribers between us)
- Cross-linked product integrations: "Powered by Luminary" summaries in Aura's reading pane

We're not asking for exclusivity or anything. This would be a lightweight partnership focused on content and reach.

Would love a 30-min exploratory call. Any time Thursday/Friday works.

-- Elena
Luminary AI`,
    timestamp: "2026-11-11T14:22:00Z",
    read: false,
    starred: false,
    folder: "inbox",
    labels: ["Partnerships"],
  },
  {
    id: "e6",
    from: CONTACTS.kai,
    to: [ME],
    subject: "The annual reading list thread",
    preview: "Starting early this year. Currently obsessed with Thinking in Systems by Donella Meadows -- it's rewired how I see product feedback loops.",
    body: `Hey,

Kicking off the annual reading list exchange early this year.

Currently obsessed with: **Thinking in Systems** by Donella Meadows. Not a business book but it's changed how I think about feedback loops in product design. If you've ever wondered why "just fixing the bug" makes three new ones appear -- this book explains it.

Just finished: **The Art of Doing Science and Engineering** by Hamming. Dense but worth it. The core idea is about working on important problems vs. just the ones that are solvable. Good annual recalibration.

Starting soon: **Working in Public** by Nadia Eghbal -- re-read. First time I read it I was focused on the wrong chapters.

What are you reading?

Kai`,
    timestamp: "2026-11-10T20:45:00Z",
    read: true,
    starred: false,
    folder: "inbox",
  },
  {
    id: "e7",
    from: CONTACTS.github,
    to: [ME],
    subject: "[aura-app] PR #312 — Glass UI components merged",
    preview: "All 3 checks passed. PR merged into main by @alice-chen. 847 additions, 203 deletions across 6 files.",
    body: `Pull request merged: "Glass UI components -- Sidebar + EmailList refactor"

Branch: feat/glass-ui -> main
Author: @kai-nakamura
Merged by: @alice-chen

Changes:
+ 847 lines added, 203 lines removed

Checks:
All checks passed (3/3)

Files changed:
components/Sidebar.tsx
components/EmailList.tsx
components/EmailReader.tsx
styles/glass.css (new)
lib/motion-config.ts (new)
tailwind.config.ts`,
    timestamp: "2026-11-13T07:30:00Z",
    read: true,
    starred: false,
    folder: "inbox",
    labels: ["Engineering"],
  },
  {
    id: "e8",
    from: CONTACTS.stripe,
    to: [ME],
    subject: "Invoice ready — November 2026 $1,249.00",
    preview: "Invoice #IN-2026-11-0847 for $1,249.00 is now available. Payment will be automatically charged on November 30.",
    body: `Invoice #IN-2026-11-0847

Billing period: November 1-30, 2026
Amount due: $1,249.00
Due date: November 30, 2026

Summary:
Aura Mail Pro -- 500 seats x $2.00/seat   $1,000.00
Enterprise Add-ons                           $249.00
                                            --------
Total                                      $1,249.00

This invoice will be automatically charged to your Visa ending in 4242 on the due date.

Questions? Reply to this email or visit your billing portal.`,
    timestamp: "2026-11-01T10:00:00Z",
    read: true,
    starred: false,
    folder: "inbox",
    attachments: [
      { name: "invoice-IN-2026-11-0847.pdf", size: "89 KB", type: "pdf" },
    ],
  },

  // ── Sent ───────────────────────────────────────────
  {
    id: "s1",
    from: ME,
    to: [CONTACTS.alice],
    subject: "Re: Design system handoff — looks incredible",
    preview: "Alice! This is exactly what we needed. The token naming convention is perfect. I have a few notes on motion timing -- can we jump on a quick call?",
    body: `Alice!

This is exactly what we needed. I went through the whole thing last night and my main reaction is: incredibly thorough.

The token naming convention is perfect -- the semantic/primitive split makes so much sense. I already know this is going to save our engineers hours of guesswork.

A few notes on the motion timing (slides 38-42):
- The entrance animations feel slightly over-damped to me. I'd try spring stiffness around 380 instead of 300.
- The exit timing on the email reader panel (slide 41) could be faster -- 150ms instead of 200ms.
- Everything else is spot on.

Can we jump on a 20-min call this week to walk through those specific panels? Friday morning works for me.

Thanks for such a thorough job on this.`,
    timestamp: "2026-11-13T10:15:00Z",
    read: true,
    starred: false,
    folder: "sent",
  },
  {
    id: "s2",
    from: ME,
    to: [CONTACTS.marcus],
    subject: "Re: Series A — timeline works, data room by Nov 20",
    preview: "Marcus -- great news. Nov 20 for the data room is totally doable. I've already briefed the team. Can we do 2pm PST for the partner meeting on Nov 25?",
    body: `Marcus,

Great news on the committee's reaction -- really appreciate you moving quickly on this.

Nov 20 for the data room is totally doable. I've already briefed our CFO and she's pulling the cohort data together now. We'll have everything clean and organized well before the deadline.

For the partner meeting on Nov 25 -- 2pm PST works perfectly for us. I'll keep it tight: 10 mins on the problem/opportunity, 10 mins on the product and traction, 10 mins on the team and roadmap. Enough time for 10-15 mins of Q&A.

One request: can you send me a 2-3 sentence bio for each partner who'll be in the room? I like to know who I'm talking to.

Looking forward to it.`,
    timestamp: "2026-11-13T09:00:00Z",
    read: true,
    starred: false,
    folder: "sent",
  },

  // ── Drafts ─────────────────────────────────────────
  {
    id: "d1",
    from: ME,
    to: [CONTACTS.elena],
    subject: "Re: Luminary x Aura collab",
    preview: "Elena -- love the proposal. The State of AI Productivity report angle is compelling. I have one concern about the integration piece that I want to think through...",
    body: `Elena,

Love the direction on this. The "State of AI Productivity" angle is compelling -- it's the kind of content that gets shared by people who would never click on a product ad.

One thing I want to think through before we get too far: the cross-linked integration piece. I'm totally open to it but I want to make sure we're aligned on what`,
    timestamp: "2026-11-12T18:30:00Z",
    read: true,
    starred: false,
    folder: "drafts",
  },

  // ── Spam ───────────────────────────────────────────
  {
    id: "sp1",
    from: { name: "Prize Notification", email: "noreply@lucky-winners.biz", color: "#ef4444" },
    to: [ME],
    subject: "You have been selected! Claim your $5,000 gift card NOW",
    preview: "Congratulations! You have been randomly selected to receive a $5,000 Amazon gift card. Click here immediately to claim before it expires.",
    body: `CONGRATULATIONS!!!

You have been RANDOMLY SELECTED to receive a $5,000 Amazon Gift Card!!!

Click the link below IMMEDIATELY to claim your prize before it expires in 24 hours.

This is a LIMITED TIME offer. Do not miss out!`,
    timestamp: "2026-11-12T03:00:00Z",
    read: false,
    starred: false,
    folder: "spam",
  },
  {
    id: "sp2",
    from: { name: "Crypto Opportunity", email: "invest@moonshot-gains.net", color: "#ef4444" },
    to: [ME],
    subject: "URGENT: 10,000% returns guaranteed -- act now",
    preview: "Our exclusive algorithm has identified a once-in-a-lifetime crypto opportunity. Early investors are already seeing massive gains.",
    body: `Dear Valued Investor,

Our proprietary AI trading algorithm has identified a ONCE-IN-A-LIFETIME opportunity in the crypto market.

Early investors are already seeing returns of 10,000%+. Act now before this window closes.

INVEST NOW -- MINIMUM $500 TO START`,
    timestamp: "2026-11-11T22:00:00Z",
    read: false,
    starred: false,
    folder: "spam",
  },
];

export function getEmailsByFolder(folder: FolderType): Email[] {
  return MOCK_EMAILS.filter((e) => e.folder === folder);
}

export function getUnreadCount(folder: FolderType): number {
  return MOCK_EMAILS.filter((e) => e.folder === folder && !e.read).length;
}

export function formatTime(iso: string): string {
  const d = new Date(iso);
  // During SSR window is unavailable — return a stable date string to avoid hydration mismatch
  if (typeof window === "undefined") {
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  if (diffHours < 24 && d.getDate() === now.getDate()) {
    return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  }
  if (diffDays < 7) {
    return d.toLocaleDateString("en-US", { weekday: "short" });
  }
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}
