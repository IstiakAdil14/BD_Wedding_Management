# System Architecture Flowchart

This flowchart describes the structure and interactions between the Admin Frontend, Client Frontend, and Server Backend.

```mermaid
graph TD
  subgraph Admin Frontend
    A1[Pages (_app.js, dashboard.js, etc.)]
    A2[Components (ManagementMenu, RecentActivityDialog, etc.)]
    A3[Context (DarkModeContext)]
    A1 --> A2
    A1 --> A3
  end

  subgraph Client Frontend
    C1[Pages (_app.js, index.js, etc.)]
    C2[Components (Navbar, HeroSection, ServicePackages, etc.)]
    C3[Context (AuthContext, DarkModeContext)]
    C1 --> C2
    C1 --> C3
  end

  subgraph Server Backend
    S1[Express Server (index.js)]
    S2[API Routes (admin, client, auth, services, bookings, etc.)]
    S3[MongoDB Database]
    S4[Static File Serving (uploads)]
    S1 --> S2
    S2 --> S3
    S1 --> S4
  end

  %% Interactions
  A1 -->|API Calls| S2
  C1 -->|API Calls| S2
  S2 -->|Data| S3
  S2 -->|Serve Files| S4
```

## Description

- **Admin Frontend**: Built with Next.js, includes pages for dashboard, profile management, and uses context for dark mode. It interacts with the backend via API calls for admin-specific data and actions.

- **Client Frontend**: Also built with Next.js, includes pages for homepage, services, events, and uses authentication context. It fetches data from the backend API for content display and user actions.

- **Server Backend**: Node.js Express server connecting to MongoDB. It exposes REST API routes for both admin and client functionalities, handles authentication, data management, and serves static files like uploads.

This architecture enables separation of concerns, with distinct frontends for admin and client users, and a shared backend API managing data and business logic.
