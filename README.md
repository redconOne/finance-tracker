<a id='readme-top'> </a>

<br />
<div align="center">
  <a href="https://github.com/redconOne/finance-tracker">
    <img src="" alt="finance tracker logo" width="50" height="50" />
  </a>
  <h3 align="center">
    Finance Tracker
  </h3>
  <p align="center"> 
    A finance tool to assist in visualization and tracking of both income and expenses.
    <br />
    <a href="https://github.com/redconOne/finance-tracker"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="">View Live</a>
    |
    <a href="https://github.com/redconOne/finance-tracker/issues">Report Bug</a>
    |
    <a href="https://github.com/redconOne/finance-tracker/issues">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about">About</a>
      <ul>
        <li>
          <a href="#built-with">Built With</a>
        </li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li>
          <a href="#prerequisites">Prerequisites</a>
        </li>
        <li>
          <a href="#installation">Installation</a>
        </li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
    </li>
    <li>
      <a href="#roadmap">Roadmap</a>
    </li>
    <li>
      <a href="#optimizations">Optimizations</a>
    </li>
    <li>
      <a href="#lessons-learned">Lessons Learned</a>
    </li>
    <li>
      <a href="#contributing">Contributing</a>
    </li>
    <li>
      <a href="#license">License</a>
    </li>
    <li>
      <a href="#contact">Contact</a>
    </li>
  </ol>
</details>

## About

<div align="center">
  <img src="./public/img/financeTrackerLanding.png" alt="project landing page image" width="700px" />
</div>

<br />
<p>
  Finance Tracker is a simple app that allows you to track income and expenses visually, with persistent data storage via Firebase.
</p>

### Built With

![next.js](https://img.shields.io/badge/nextjs-%23000000.svg?style=for-the-badge&logo=next.js)

![Firebase](https://img.shields.io/badge/firebase-%23232323.svg?style=for-the-badge&logo=firebase&logoColor)

![TailwindCSS](https://img.shields.io/badge/tailwindcss-%233949AB.svg?style=for-the-badge&logo=tailwind-css)

<p align="right">
  (<a href="#readme-top">back to top</a>)
</p>

## Getting Started

<p>
  To get the project running on your local machine you will require Node.js and to use the following instructions.
</p>

### Prerequisites

![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)

```sh
npm install npm@latest -g
```

### Installation

1. Sign up for your own non-relational document database at
   [Firebase](https://firebase.google.com)
2. Clone the repo
   ```sh
   git clone https://github.com/redconOne/finance-tracker.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your port, database string, and API keys in `config.js` or `.env` file
   ```sh
    PORT = 2121 (or port of your choosing)
    DB_STRING = `your database URI`
   ```
5. Run in development environment
   ```sh
   npm run dev
   ```

## Usage

- Sign in
- Input income
- Record expenses

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Include visualization of expenses
- [ ] Include line graph to visualize savings
- [ ] Allow multiple bank accounts / checkings / savings

See the [open issues](https://github.com/redconOne/finance-tracker/issues) for a
full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Optimizations

## Lessons Learned

- Learning how to use Aliases within a next.js project
- Learned a good amount more concerning tailwind component styling

<!-- CONTRIBUTING -->

## Contributing

Feel free to join in! Whether its fixing bugs, improving documentation, or
simply spreading the word! Please see
[Contributing Guidelines](/CONTRIBUTING.md) for further guidance. If you require
assistance please don't hesitate to reach out! P.S. Don't forget give the
project a star!

<!-- LICENSE -->

## License

Distributed under the MIT License. See [LICENSE](./LICENSE) for more
information.

<!-- CONTACT -->

## Contact

<h3 align='center'> Ming Ng</h3>
<h4 align='center'>
  <a href="https://twitter.com/MingLeeNg1">Twitter</a> |
  <a href="https://linkedin.com/in/MingLeeNg">Linkedin</a>
  <a href="https://minglee.me">My Portoflio</a>
</h4>

Project Link: [Finance Tracker]()

<p align="right">(<a href="#readme-top">back to top</a>)</p>
