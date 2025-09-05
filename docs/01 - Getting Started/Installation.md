---
sidebar_position: 1
---

## Getting Started

Clone the repository and configure your environment:

```bash
git clone https://github.com/JeffersonLab/SMOCS
cd SMOCS/orchestration
cp .env.example .env
# Edit .env with your database passwords and broker settings
```

Launch the complete stack with Docker Compose:

```bash
cd orchestration
docker compose --profile gymnasium up
```

This starts Kafka, InfluxDB, the Gymnasium environment controller. The system begins generating synthetic control data immediately and storing results in InfluxDB for visualization.

Access InfluxDB at `localhost:8086` (admin/admin123 which should be changed when using production) to view real-time metrics and anomaly detection results.