# Zion Chin Baptist Church Website

Developed by: Bawi Hmun Lian

This web app informs the public about Zion Chin Baptist Church in Northern Kentucky. It contains details of current leadership, community work, missionary work, and global outreach.

## Project Structure

```
zcbc-website/
├── frontend/                  # React frontend (Vite + React 19)
│   ├── src/
│   │   ├── api.js             # Strapi client: resource factories + auth interceptors
│   │   ├── App.css            # Design tokens (:root) + global styles
│   │   ├── config/church.js   # Single source of truth for address/phone/service times
│   │   ├── context/           # AuthProvider and its context
│   │   ├── hooks/
│   │   │   ├── queries.js     # TanStack Query read hooks + query keys
│   │   │   ├── mutations.js   # Create/update/delete hooks with cache invalidation
│   │   │   └── useAuth.js
│   │   ├── utils/             # text.js (rich text, dates), media.js (Strapi URLs)
│   │   └── components/
│   │       ├── common/        # ChurchMap, SocialLinks — shared across pages
│   │       ├── admin/         # Login, guard, generic CRUD list + form
│   │       ├── AboutUs/       # Page with sub-components
│   │       └── NavBar/        # Nav + mega-menu, driven by navData.js
│   ├── public/
│   └── .env.example
│
└── backend/
    └── church-cms/            # Strapi 5 headless CMS
        └── src/api/           # aboutus (single type), sermon, leader, contact
```

### Conventions

- **Colours and spacing** come from CSS custom properties in `src/App.css`. Never
  hardcode a hex value in a component stylesheet.
- **Page stylesheets are scoped** under their page's root class (`.home-page`,
  `.sermons-page`, …) because plain CSS is global — two pages defining
  `.sermon-card` differently would otherwise collide depending on load order.
- **Components never see Strapi's `{ data, meta }` envelope.** `api.js` unwraps it.
- **Strapi 5 addresses entries by `documentId`**, not the numeric `id`.

## Prerequisites

**Node.js Version: 22.21.1 (LTS)**

This project requires Node.js v22.21.1 for compatibility with Strapi CMS (backend). The correct version is specified in `.nvmrc` files throughout the project.

### Using nvm (Recommended)
If you have [nvm](https://github.com/nvm-sh/nvm) installed, the correct Node version will be automatically used:

```bash
# In the project root, run:
nvm use

# This will switch to Node v22.21.1 as specified in .nvmrc
```

### Manual Installation
If you don't have nvm:
1. Install [nvm](https://github.com/nvm-sh/nvm)
2. Run `nvm install 22.21.1`
3. Run `nvm use`

### Auto-switch Node version (Optional)
Add this to your `~/.zshrc` or `~/.bashrc` to automatically use the correct Node version when entering the project:

```bash
# Auto-load .nvmrc
autoload -U add-zsh-hook
load-nvmrc() {
  local node_version="$(nvm version)"
  local nvmrc_path="$(nvm_find_nvmrc)"

  if [ -n "$nvmrc_path" ]; then
    local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")

    if [ "$nvmrc_node_version" = "N/A" ]; then
      nvm install
    elif [ "$nvmrc_node_version" != "$node_version" ]; then
      nvm use
    fi
  fi
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc
```

## Getting Started

> **Check your Node version first.** Vite 7 requires Node ≥ 20.19. On an older
> release the build fails with a confusing `crypto.hash is not a function`
> error. Run `nvm use` in the project root before anything else.

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env    # Configure your environment variables
npm run dev             # Start dev server on http://localhost:5174
```

Other frontend scripts:

| Script | What it does |
| --- | --- |
| `npm run lint` | ESLint over `src/` and config files |
| `npm run lint:fix` | Same, applying autofixes |
| `npm run format` | Prettier, writing changes |
| `npm run format:check` | Prettier in check mode (what CI runs) |
| `npm run build` | Production build into `dist/` |

### Backend Setup
```bash
cd backend/church-cms
npm install
npm run develop         # Start Strapi admin panel on http://localhost:1337
```

## Admin Panel

The site has its own lightweight admin at `/admin` for editing sermons and
leaders without opening Strapi. It authenticates against Strapi's
users-permissions plugin, so it needs a one-time setup:

**1. Create an API user.** In the Strapi admin panel
(`http://localhost:1337/admin`), go to **Content Manager → User** and create a
user with an email and password. This is *not* the same as your Strapi
administrator account — the admin account signs into Strapi itself, while this
user is what the website's `/admin` logs in as.

**2. Grant that user's role permission to write.** Go to **Settings → Users &
Permissions Plugin → Roles → Authenticated**, and enable `create`, `update` and
`delete` for **Sermon** and **Leader**. Leave `find` and `findOne` enabled for
the Public role so visitors can still read the site.

**3. Sign in** at `http://localhost:5174/admin`.

Security notes:

- The route guard in `ProtectedRoute.jsx` only hides UI. The real enforcement is
  Strapi rejecting unauthenticated writes with a 403 — verify with:
  `curl -X POST http://localhost:1337/api/sermons -d '{}'`
- The JWT is kept in `localStorage`. That is fine for this site, but it means an
  XSS bug would expose the token — do not paste untrusted HTML into content
  fields.
- Images are still managed in the Strapi panel; the `/admin` forms cover text
  fields only.

## Environment Variables

Copy `.env.example` to `.env` in the frontend directory and configure:
- `VITE_API_BASE_URL` - Strapi API URL (default: http://localhost:1337/api)
- `VITE_STRAPI_URL` - Strapi base URL (default: http://localhost:1337) 


## Features

The following **functionality** is completed:

- [ ] **A Home page with upcoming events, leadership activities, sermon series, how to get connected, and location**
- [ ] **About Us page with a card list of leaders: Pastor, Executive Committee members, Christian Education leaders, Youth leaders, Building Committee, and Mission Committee.** 
    - [ ] *Gathering times*
    - [ ] *Who we are*
    - [ ] *Our story*
    - [ ] *What we do*
    ### notes: About Us page should drop down a list of all the departments and link to their respective page
- [ ] **The Sermons page that has current sermon series**
  - [ ] *YouTube Videos*
  - [ ] *Blog Posts*
- [ ] **A Visit Us page containing gathering times, Location**
    - [ ] *Google Map*
- [ ] **Contact us page with a form visitors can fill out to get in touch with the Church**
- [ ] **A Giving page that enables visitors to donate or give tithing**
    -[ ]*third party application: *

The following **additional** features are to be implemented:

* [ ] List anything else that you added to improve the site's functionality!
* [ ] Create a Login  function for authorized users (admin)
* [ ] Enable specific users to post and edit pages (admin)
* [ ] Provide a log out function (admin)
* [ ] Store login information to the data-base (admin)
* [ ] Add a create post option for Sermons page (admin)


## Video Walkthrough

Here's a walkthrough of implemented user stories:


## Notes



## License

    Copyright [2025] [Bawi Hmun Lian]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.