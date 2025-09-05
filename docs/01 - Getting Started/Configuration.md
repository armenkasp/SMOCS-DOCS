---
sidebar_position: 2
---

## Config file

SMOCS uses a single `config.yaml` file to define the entire system behavior. The configuration drives data source connections, agent parameters, and Kafka topic routing:

```yaml
source: "gymnasium"

gymnasium:
  environment: "MountainCarContinuous-v0"
  input_topic: "gymnasium-action"
  output_topic: "gymnasium-output"
  blocking_mode: false
  default_action_strategy: "random"
  step_delay: 0.1
  reset_on_start: true
  max_episode_steps: 10000000
  render_mode: null

kafka:
  auto_create: true
  partitions: 1
  replication_factor: 1

project:
  name: "smocs-gym-streaming"
```

Environment variables handle secrets and deployment-specific settings like database credentials and broker URLs. This separation keeps sensitive data out of version control while maintaining reproducible configurations across environments.

A basic `.env` file can be found here:

```yaml
# InfluxDB
INFLUXDB_TOKEN=my-super-secret-auth-token
INFLUXDB_ORG=myorg
INFLUXDB_BUCKET=kafka_data

COMPOSE_PROFILES=gymnasium
```