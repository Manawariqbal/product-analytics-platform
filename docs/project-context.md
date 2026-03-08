# Product Analytics Platform
Project Context & Development Guide

This document explains the project architecture, current progress, and future tasks so that any developer or AI assistant can quickly understand and continue building the system.

---

# Project Goal

Build a **Product Analytics SaaS platform** that allows companies to:

- track user events
- collect product usage data
- generate analytics dashboards
- provide insights into user behavior

The system is inspired by tools like:

- Google Analytics
- Mixpanel
- PostHog

The project is being built publicly as part of a **build-in-public journey** targeting:

- freelance clients
- networking with developers
- combining Web Development + Data Engineering.

---

# Technology Stack

## Backend

Node.js  
Express.js

Purpose:

- REST API
- event ingestion
- analytics endpoints

---

## Database

Supabase (PostgreSQL)

Purpose:

- store organizations
- store projects
- store event data
- store aggregated metrics

---

## Frontend (Planned)

React

Purpose:

- analytics dashboard
- project management
- visualization

---

## Data Engineering Layer (Planned)

PySpark

Purpose:

- event aggregation
- analytics computation
- batch metrics

---

## Deployment (Future)

Docker

Possible hosting:

- AWS
- Railway
- Fly.io
- Vercel (frontend)

---

# Repository Structure
product-analytics-platform
│
├── backend
│
│ ├── index.js
│ ├── package.json
│ ├── public
│ │ └── analytics.js
│ │
│ └── src
│ ├── config
│ │ └── supabase.js
│ │
│ └── routes
│ ├── projects.js
│ ├── events.js
│ └── analytics.js
│
├── frontend (planned)
│
├── data-pipeline (planned)
│
├── docs
│ ├── architecture.md
│ ├── tech-spec.md
│ └── project-context.md
│
└── docker (future)


---

# Architecture Overview

System architecture:
Client Website
│
▼
analytics.js tracking script
│
▼
Node.js API
│
▼
Supabase Database
│
▼
Analytics Endpoints
│
▼
React Dashboard (future)


Event data flow:
User action
↓
analytics.js
↓
POST /events/track
↓
Supabase events table
↓
Analytics API
↓
Dashboard


---

# Implemented Features

## Backend

Express API server

index.js

Health endpoint

GET /health

---

## Project Management

Create project

POST /projects

Each project receives:

- project id
- API key

API keys are used for event tracking.

---

## Event Tracking

Endpoint:

POST /events/track

Event payload example:
{
"api_key": "pk_live_xxx",
"event_name": "product_view",
"user_id": "user_123",
"metadata": {
"product_id": "p1"
}
}


The system:

1. validates API key
2. identifies project
3. stores event in Supabase

---

## Analytics Endpoints

### Event analytics

GET /analytics/events

Returns:

- total events
- event breakdown

Example:
{
"total_events": 20,
"event_breakdown": {
"page_view": 10,
"signup": 5,
"purchase": 5
}
}


---

### Active users

GET /analytics/users

Returns:
{
"active_users": 8
}


---

## Tracking Script

analytics.js

This script allows websites to send analytics events.

Example usage:
<script src="http://localhost:5000/analytics.js"></script> <script> analytics.init("pk_live_test"); analytics.track("signup"); analytics.track("purchase", { value: 49.99 }); </script>


The script:

- initializes API key
- tracks events
- auto-generates user id
- sends events to backend

---

# Supabase Database Schema

Tables used:

organizations

users

projects

events

daily_metrics (planned)

---

## events table

Stores raw event data.

Columns:

- id
- project_id
- event_name
- user_id
- metadata
- timestamp
- created_at

---

# Git Workflow

Repository hosted on GitHub.

Branch strategy:

main → production

develop → integration branch

feature branches → new features

Example branches:

feature/project-management

feature/event-tracking

feature/analytics-api

---

# Completed Development (Day 1)

✔ Node.js backend  
✔ Supabase integration  
✔ Project creation with API key  
✔ Event ingestion endpoint  
✔ Analytics endpoints  
✔ Website tracking script  
✔ Git workflow setup  
✔ Project documentation

---

# Planned Features

## Short Term

React analytics dashboard

Daily metrics endpoint

GET /analytics/daily

Top events endpoint

GET /analytics/top-events

---

## Medium Term

Data aggregation pipeline

PySpark jobs to compute metrics

daily active users

funnel analysis

conversion rates

---

## Long Term

Real-time analytics

Kafka event streaming

Spark streaming

AI insights

predictive analytics

---

# Future SaaS Features

Multi-tenant organizations

Team collaboration

Project-level permissions

Billing / subscriptions

API usage limits

---

# Purpose of This Document

This document exists so that:

- developers can quickly understand the system
- AI tools can continue development
- contributors can onboard easily

Any new developer or AI should read this file first before implementing features.