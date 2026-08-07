# Two-Week Plan: Catching These Issues Yourself

Every topic below maps to something real in this repo. The goal isn't general
React knowledge — it's the specific judgment that would have let you spot the
`.sermon-card` collision, or notice that `useFetch` could never refetch, before
someone else pointed them out.

Budget ~1.5 hours a day. Each day has **read**, **do**, and a **question you
should be able to answer** at the end. If you can't answer it, the reading
didn't land — go back rather than moving on.

---

## Week 1 — The fundamentals that caused the actual bugs

### Day 1 — How CSS actually resolves

The bug: `HomePage.css` and `Sermons.css` both defined `.sermon-card`. Because
plain CSS is global and pages are lazy-loaded, which one won depended on which
page you visited first.

**Read**
- MDN: [Cascade, specificity, and inheritance](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascade/Cascade)
- MDN: [Using CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

**Do** — Open `src/components/HomePage.css` and `Sermons.css` side by side. Find
three more class names that would have collided if I hadn't scoped them. Then
open DevTools on any page, inspect an element, and read the Styles panel
top-to-bottom: every crossed-out rule is the cascade doing its job.

**Answer this** — If two stylesheets define the same class with the same
specificity, what decides the winner? Why does lazy-loading routes make that
answer unstable?

---

### Day 2 — CSS at scale: scoping strategies

**Read**
- [CSS Modules](https://github.com/css-modules/css-modules) — the readme is short
- Vite docs: [CSS Modules](https://vite.dev/guide/features#css-modules)
- Optional but excellent: Josh Comeau, [CSS Variables for React Devs](https://www.joshwcomeau.com/css/css-variables-for-react-devs/)

**Do** — Convert **one** stylesheet (`Footer.css` is smallest) to
`Footer.module.css` and update `Footer.jsx` to import it. Notice what changes
and what breaks. This is the migration I deliberately didn't do, because it
touches every `className` — decide for yourself whether it's worth finishing.

**Answer this** — What does the scoping approach I used (prefixing every
selector with `.site-footer`) fail to protect against that CSS Modules would
catch?

---

### Day 3 — Server state vs. client state

The bug: `useFetch` had `[]` dependencies and no `refetch`. Every CRUD flow
needs "create → refresh the list," which it structurally could not do.

**Read**
- Kent C. Dodds: [Application State Management with React](https://kentcdodds.com/blog/application-state-management-with-react)
- TanStack Query: [Important Defaults](https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults) and [Queries](https://tanstack.com/query/latest/docs/framework/react/guides/queries)

**Do** — Read `src/hooks/queries.js` and `src/hooks/mutations.js`. Add a
`useContacts()` read hook for the contact submissions, and a `/admin/contacts`
entry in `resourceConfig.js`. You should not need to touch `ResourceList.jsx`
at all — if you do, the abstraction is leakier than intended, and that's worth
noticing.

**Answer this** — Why is caching form state in TanStack Query a bad idea, when
caching a sermon list is a good one?

---

### Day 4 — useEffect, and when not to reach for it

**Read**
- react.dev: [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect) — the single most useful page in the React docs
- react.dev: [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
- react.dev: [Removing Effect Dependencies](https://react.dev/learn/removing-effect-dependencies)

**Do** — Find every `useEffect` left in this codebase (`NavBar.jsx`,
`ScrollToTop.jsx`, `AuthProvider.jsx`, `ResourceForm.jsx`). For each, ask: *is
this synchronizing with something outside React?* Three of them are. One is
arguably avoidable — work out which, and why I left it.

**Answer this** — The old `useFetch` had `// eslint-disable-line
react-hooks/exhaustive-deps`. What was that comment actually hiding?

---

### Day 5 — Designing a data layer

The smell: 116 lines of `api.js` to express 9 endpoints, each with an identical
`try/catch/console.error/throw` that caught nothing.

**Read**
- Axios docs: [Interceptors](https://axios-http.com/docs/interceptors)
- Strapi 5: [REST API](https://docs.strapi.io/dev-docs/api/rest) and
  [parameters](https://docs.strapi.io/dev-docs/api/rest/parameters) — especially
  `filters`, `sort`, `populate`, `pagination`

**Do** — Read the `collection()` factory in `src/api.js`. Add a
`useSermonsBySeries(series)` query hook that filters **server-side** with
`filters[series][$eq]`, rather than fetching everything and filtering in the
browser like `Sermons.jsx` still does. Then decide whether it's worth using —
for 20 sermons it isn't, and knowing when *not* to optimize matters as much.

**Answer this** — What does an interceptor give you that a wrapper function
around every call doesn't?

---

### Day 6 — DRY, and its limits

The trap: I removed duplication in five places but *declined* to extract a
shared `<SermonCard>`, because HomePage's card and the Sermons page's card only
looked similar.

**Read**
- Kent C. Dodds: [AHA Programming](https://kentcdodds.com/blog/aha-programming) (avoid hasty abstractions)
- Sandi Metz: [The Wrong Abstraction](https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction)

**Do** — Look at `src/components/admin/resourceConfig.js`. This *is* a
config-driven abstraction over two resources. Write two paragraphs arguing it
was the wrong call, then two arguing it was right. Genuinely try both sides.

**Answer this** — What's the difference between two pieces of code that look the
same and two that *are* the same?

---

### Day 7 — Consolidate

No new material. Re-read the diff of everything that changed this week:

```bash
git diff --stat
git diff frontend/src/api.js
```

Write yourself a one-page note: what would you now check in a code review that
you wouldn't have checked two weeks ago?

---

## Week 2 — The practices that prevent the next round

### Day 8 — Testing, starting from zero

This project has no tests. Before adding CRUD to it, that's the largest
remaining risk.

**Read**
- [Vitest: Getting Started](https://vitest.dev/guide/)
- [Testing Library: Guiding Principles](https://testing-library.com/docs/guiding-principles) and [React Testing Library intro](https://testing-library.com/docs/react-testing-library/intro/)
- Kent C. Dodds: [Testing Implementation Details](https://kentcdodds.com/blog/testing-implementation-details)

**Do** — Install Vitest + Testing Library. Write tests for `src/utils/text.js`
first (pure functions, no setup): `extractText` with a string, with a blocks
array, with `null`; `truncate` at, under, and over the limit; `formatDate` with
an invalid date. That's ~10 assertions and it's the easiest possible start.

**Answer this** — Why is `truncate` easy to test and `NavBar` hard? What does
that tell you about where to put logic?

---

### Day 9 — Testing components and forms

**Do** — Write a test for `ContactUs` that fills the form and asserts the
success message appears. You'll need to mock the API module and wrap the
component in a `QueryClientProvider` — the wrapper friction you hit is itself a
design signal worth noticing.

**Read** — TanStack Query: [Testing](https://tanstack.com/query/latest/docs/framework/react/guides/testing)

**Answer this** — Your test passes. Does it prove a visitor can actually contact
the church? What's still unverified?

---

### Day 10 — Auth: what actually protects anything

**Read**
- Strapi: [Users & Permissions plugin](https://docs.strapi.io/cms/features/users-permissions)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) — read the summaries for
  A01 (Broken Access Control) and A03 (Injection)
- [OWASP: JWTs for Client-Side Sessions](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html)

**Do** — With the site logged out, run:

```bash
curl -X POST http://localhost:1337/api/sermons -H "Content-Type: application/json" -d '{"data":{"title":"x"}}'
```

You get a 403. Now delete `<ProtectedRoute>` from `App.jsx` and try to create a
sermon through the UI. Watch it fail anyway. That's the lesson.

**Answer this** — If `ProtectedRoute` isn't what stops an attacker, what is it
for? And what would happen if the Strapi "Public" role were given `create` on
Sermon?

---

### Day 11 — Rate limiting and abuse

Your contact form posts to a public Strapi endpoint with no throttle and no
captcha. It will get spammed.

**Read**
- Strapi: [Middlewares](https://docs.strapi.io/cms/configurations/middlewares) — look at `strapi::rateLimit`
- [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) as a captcha option

**Do** — Add server-side validation to the contact endpoint: reject messages
over N characters, and require a well-formed email. Do it in Strapi (a custom
controller or a lifecycle hook), *not* in React — client validation is a UX
feature, not a defence.

**Answer this** — Why is `required` on an `<input>` not validation?

---

### Day 12 — Git, CI, and reviewable change

**Read**
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Actions: workflow syntax](https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions)
- Chris Beams: [How to Write a Git Commit Message](https://cbeams.me/posts/git-commit/)

**Do** — Look at `.github/workflows/ci.yml`. Add a step that runs your new
tests. Then push a branch with a deliberately failing lint rule and watch CI
catch it. Compare your recent commit messages ("fixing forms and modifing theme
of pages") against the guide.

**Answer this** — This session produced one enormous change. How would you have
split it into commits someone could actually review?

---

### Day 13 — Accessibility and performance

**Read**
- MDN: [HTML: A good basis for accessibility](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML)
- [WebAIM: Introduction to Web Accessibility](https://webaim.org/intro/)
- web.dev: [Core Web Vitals](https://web.dev/articles/vitals)

**Do** — Run Lighthouse (Chrome DevTools → Lighthouse) on the home page. Fix the
top accessibility finding. Then try navigating the whole site with only the Tab
key — the mega-menu is where you'll find problems, and it's why I changed that
`<div onClick>` to a `<button>`.

**Answer this** — Why can a `<div onClick={...}>` not be operated by keyboard,
and what exactly does using `<button>` give you for free?

---

### Day 14 — Review your own code

Bring it together. Do a full review pass on this repo as if someone else wrote
it. Specifically hunt for:

- Content still hardcoded in JSX that belongs in `config/church.js` or Strapi
- The `email` field `LeaderCard.jsx` renders — which the `leader` schema doesn't
  actually have. Decide: add the field, or delete the branch?
- `Giving.jsx` still fakes payment with `alert()`
- `aboutUsDefaults.js` — ~100 lines of content living in a JS file
- Anywhere a list renders without a stable `key`

**Read** — [Google's Code Review Developer Guide](https://google.github.io/eng-practices/review/reviewer/) — short, and it's about what to *look* for.

**Write** — Your own review, in the format I used: file:line, what's wrong, why
it matters, what to do. Then fix the top three.

---

## Books worth the time (beyond two weeks)

| Book | Why |
| --- | --- |
| *Refactoring UI* — Wathan & Schoger | Short, practical. Directly addresses the design-token thinking from Day 1. |
| *Grokking Simplicity* — Eric Normand | The clearest explanation of separating calculations from actions. Would have prevented the `useFetch` design. |
| *The Pragmatic Programmer* — Hunt & Thomas | Where "DRY" comes from, stated more carefully than the internet repeats it. |
| *Refactoring* (2nd ed.) — Martin Fowler | A catalogue of exactly the moves made in this session, with names. |

## Habits that matter more than any of the above

1. **Run `npm run lint` before every commit.** A red lint run you ignore trains
   you to ignore lint.
2. **When you copy-paste code a second time, stop.** Two is a coincidence; the
   third is a pattern. Five copies of the church address is how this started.
3. **Read your own diff before committing.** `git diff --staged`. Most of what I
   found would surface this way.
4. **When something works but you don't know why, find out then.** The
   `eslint-disable-line` on `useFetch` was a note saying "I got this to work" —
   those are where bugs live.
5. **Ask "what breaks if this is wrong?"** before choosing how carefully to build
   something. A church website's giving page deserves more care than its
   footer.
