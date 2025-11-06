# Zion Chin Baptist Church Website

Developed by: Bawi Hmun Lian

This web app informs the public about Zion Chin Baptist Church in Northern Kentucky. It contains details of current leadership, community work, missionary work, and global outreach.

## Project Structure

```
zcbc-website/
├── frontend/          # React frontend application (Vite + React 19)
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── assets/        # Static assets
│   │   └── api.js         # API client for backend
│   ├── public/            # Public assets
│   └── .env.example       # Environment variables template
│
└── backend/           # Strapi CMS backend
    └── church-cms/    # Headless CMS for content management
```

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

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env    # Configure your environment variables
npm run dev             # Start development server
```

### Backend Setup
```bash
cd backend/church-cms
npm install
npm run develop         # Start Strapi admin panel
```

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