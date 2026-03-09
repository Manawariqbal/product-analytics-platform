Product Analytics Platform
Project Context & Development Guide
This document explains the project architecture, current progress, and future tasks so that any developer or AI assistant can quickly understand and continue building the system.
Project Goal
Build a Product Analytics SaaS platform that allows companies to:
track user events
collect product usage data
generate analytics dashboards
provide insights into user behavior
The system is inspired by tools like:
Google Analytics
Mixpanel
PostHog
Amplitude
The project is being built publicly as part of a build-in-public journey targeting:
freelance clients
networking with developers
combining Web Development + Data Engineering
Technology Stack
Backend
Node.js
Express.js
Purpose:
REST API
event ingestion
project management
analytics endpoints
Database
Supabase (PostgreSQL)
Purpose:
store organizations
store users
store projects
store event data
store aggregated metrics
Frontend
Next.js (React)
TailwindCSS
Recharts
Axios
Purpose:
analytics dashboard
project creation UI
charts & data visualization
interaction with backend APIs
Data Engineering Layer (Planned)
PySpark
Purpose:
event aggregation
analytics computation
batch metrics generation
scalable analytics processing
Deployment (Future)
Docker
Possible hosting:
AWS
Railway
Fly.io
Vercel (frontend)
Repository Structure
product-analytics-platform
│
├── backend
│
│ ├── index.js
│ ├── package.json
│ │
│ ├── public
│ │ └── analytics.js
│ │
│ └── src
│
│ ├── config
│ │ └── supabase.js
│ │
│ └── routes
│
│ ├── projects.js
│ ├── events.js
│ └── analytics.js
│
├── frontend
│
│ └── src
│
│ ├── app
│ │ └── page.js
│ │
│ ├── components
│ │ ├── Dashboard.js
│ │ ├── Sidebar.js
│ │ └── CreateProject.js
│ │
│ └── services
│     └── api.js
│
├── data-pipeline (planned)
│
├── docs
│ ├── architecture.md
│ ├── tech-spec.md
│ └── project-context.md
│
└── docker (future)
Architecture Overview
System Architecture
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
Next.js Dashboard
Event Data Flow
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
Dashboard visualization
Implemented Features
Backend
Express API server
Entry point:
backend/index.js
Health endpoint:
GET /
Returns:
{
  "message": "Product Analytics API running"
}
Project Management
Create analytics projects.
Endpoint:
POST /projects
Request example:
{
 "name": "My Website",
 "organization_id": "org_uuid"
}
Response:
{
 "message": "Project created",
 "project": [...]
}
Each project receives:
unique project ID
generated API key
Example:
pk_live_xxxxx
API keys are used for event tracking.
Event Tracking
Endpoint:
POST /events/track
Example payload:
{
 "api_key": "pk_live_xxx",
 "event_name": "product_view",
 "user_id": "user_123",
 "metadata": {
   "product_id": "p1"
 }
}
System process:
validate API key
identify project
store event in database
Analytics Endpoints
Event Analytics
GET /analytics/events
Returns event breakdown for a project.
Example:
{
 "total_events": 20,
 "event_breakdown": {
   "page_view": 10,
   "signup": 5,
   "purchase": 5
 }
}
Active Users
GET /analytics/users
Returns:
{
 "active_users": 8
}
Top Events
GET /analytics/top-events
Returns:
[
 { "event_name": "signup", "count": 10 },
 { "event_name": "page_view", "count": 5 }
]
Daily Events
GET /analytics/daily-events
Returns event counts by date.
Example:
[
 { "date": "2026-03-10", "count": 12 },
 { "date": "2026-03-11", "count": 20 }
]
Summary
GET /analytics/summary
Returns:
{
 "total_events": 100,
 "total_users": 25,
 "top_event": "page_view"
}
Tracking Script
File:
backend/public/analytics.js
Purpose:
Allows external websites to send analytics events.
Example usage:
<script src="http://localhost:5000/analytics.js"></script>

<script>

analytics.init("pk_live_test")

analytics.track("signup")

analytics.track("purchase", {
  value: 49.99
})

</script>
Script features:
initializes API key
generates unique user ID
sends events to backend
supports event metadata
Frontend Dashboard
Frontend built using:
Next.js
TailwindCSS
Recharts
Dashboard features:
dark theme UI
sidebar navigation
analytics summary cards
daily events chart
top events table
project creation UI
Dashboard Metrics
Displayed metrics:
Total Events
Active Users
Top Event
Data Visualization
Daily event trends displayed using:
Recharts LineChart
Supabase Database Schema
Tables used:
organizations
users
projects
events
daily_metrics (future)
events table
Stores raw event data.
Columns:
id
project_id
event_name
user_id
metadata
timestamp
created_at
Git Workflow
Repository hosted on GitHub.
Branch strategy:
main → production
develop → integration
feature branches → development
Example feature branches:
feature/project-management
feature/event-tracking
feature/analytics-api
feature/frontend-dashboard
Completed Development
Backend
✔ Node.js backend
✔ Supabase integration
✔ Project creation API
✔ Event ingestion API
✔ Analytics endpoints
Tracking System
✔ analytics.js tracking script
✔ API key validation
✔ event ingestion pipeline
Analytics Engine
✔ event analytics
✔ active users analytics
✔ top events analytics
✔ daily events analytics
✔ summary metrics
Frontend
✔ Next.js dashboard
✔ dark theme UI
✔ sidebar navigation
✔ analytics cards
✔ charts with Recharts
✔ top events table
✔ project creation UI
Planned Features
Short Term
Project list page
Project selector
Organization signup
User authentication
Medium Term
Data engineering pipeline
PySpark aggregation jobs
Daily metrics table population
Funnel analytics
Conversion analysis
Long Term
Real-time analytics
Kafka event streaming
Spark streaming pipelines
AI analytics insights
Predictive analytics
Future SaaS Features
Multi-tenant organizations
Team collaboration
Role-based permissions
Billing and subscriptions
API usage limits
Usage-based pricing
Purpose of This Document
This document exists so that:
developers can quickly understand the system
AI tools can continue development
contributors can onboard easily
Any new developer or AI should read this file before implementing features.