# Virtual Trading Platform — Paper Trading Demo

> Practice trading with virtual currency — simulated market prices, instant execution, and a simple dashboard for learning and testing strategies.  
> Built as a training/demo platform (NOT for real money).

![Platform Screenshot](./assets/virtual-trader-screenshot.png)

---

## Table of contents
- [Project overview](#project-overview)  
- [Features](#features)  
- [Tech stack](#tech-stack)  
- [Demo account & seeded data](#demo-account--seeded-data)  
- [Architecture & data model](#architecture--data-model)  
- [Local setup / Run instructions](#local-setup--run-instructions)  
- [Environment variables](#environment-variables)  
- [API endpoints (summary)](#api-endpoints-summary)  
- [Deployment](#deployment)  
- [Future improvements](#future-improvements)  
- [AI usage note](#ai-usage-note)  
- [License](#license)

---

## Project overview

A minimal, beginner-friendly virtual trading platform that simulates placing trades on stocks / forex / crypto using virtual funds. The platform supports:

- User signup & login (JWT)
- Virtual wallet with default balance (e.g., $10,000)
- Real-time price quotes (via market API or mocked endpoints)
- Basic trade execution (market / limit / stop - simplified)
- Trade history and balance updates
- Simple analytics (balance over time, trade list)
- Admin panel for user management & resetting balances

This project is intended as a learning tool and is safe for experimentation — no real money is involved.

---

## Features

- **Authentication**
  - User signup / login using email + password
  - JWT-based session handling
- **Virtual Wallet**
  - Starts with default balance (configurable)
  - Balance updates after trades
- **Market Data**
  - Fetches live quotes (Alpha Vantage / Binance) or uses cached/mock data in dev
- **Trading**
  - Place buy/sell orders with order types (market, limit, stop)
  - Immediate execution (demo simplification)
- **Trade History**
  - View executed trades with timestamp, symbol, quantity, price, notional
- **Admin Tools**
  - List users and reset balances
- **Simple Analytics**
  - Portfolio balance and trade history page
- **Responsive UI**
  - Clean dashboard layout (account summary, market chart, watchlist, trade panel, trade history)

---

## Tech stack

- **Frontend:** React (Vite), React Router, Chart.js (for charts)  
- **Backend:** Node.js, Express  
- **Database:** MongoDB (Atlas or local) with Mongoose ORM  
- **Market data:** Alpha Vantage (stocks/forex) and Binance API (crypto) — with server-side caching  
- **Deployment suggestions:** Vercel (frontend) + Railway / Render / Heroku (backend)  
- **Auth:** JWT (jsonwebtoken)  
- **Other:** Axios, bcryptjs (password hashing), uuid

---

## Demo account & seeded data

On first run the app seeds a demo admin user and common assets:

- **Admin:** `admin@demo.com` / password: `password`  
- Sample assets seeded: `AAPL`, `MSFT`, `BTCUSDT`, `ETHUSDT`, `EURUSD`

---

## Architecture & data model

Simplified data model (MongoDB collections):

- **users**
  - `_id`, `name`, `email`, `passwordHash`, `balance`, `role`, `createdAt`
- **trades**
  - `_id`, `tradeId`, `userId`, `symbol`, `side`, `orderType`, `price`, `quantity`, `notional`, `status`, `profitLoss`, `createdAt`
- **assets**
  - `_id`, `symbol`, `type` (`stock|crypto|forex`), `name`

ERD (Mermaid) — copy into [mermaid.live](https://mermaid.live) if you want a visual:

```mermaid
erDiagram
    USERS {
      ObjectId id PK
      string name
      string email
      string passwordHash
      number balance
      string role
      datetime createdAt
    }
    TRADES {
      ObjectId id PK
      string tradeId
      ObjectId userId FK
      string symbol
      string side
      string orderType
      number price
      number quantity
      number notional
      number profitLoss
      datetime createdAt
    }
    ASSETS {
      ObjectId id PK
      string symbol
      string type
      string name
    }

    USERS ||--o{ TRADES : "executes"
    ASSETS ||--o{ TRADES : "is-traded"
