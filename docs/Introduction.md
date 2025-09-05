---
sidebar_position: 0
---

## SMOCS Architecture Overview

SMOCS (Streaming Monitoring Optimization Control System) is a Kafka-based distributed streaming platform designed for real-time sensor data processing, ML model training/inference, and control system integration.

## Core Architecture Principles

**Single Configuration Management**: The entire system is orchestrated through a single `config.yaml` file that defines data sources (MQTT, EPICS, Gymnasium), Kafka topics, agent parameters, and component behavior. This centralized configuration approach eliminates configuration drift and enables consistent deployments.

**Container-Based Orchestration**: Each component runs in its own Docker container with specific responsibilities:

## Component Design Patterns

### Single-Threaded Loop Architecture

All SMOCS base components follow a consistent single-threaded event loop pattern. 

SMOCS deliberately adopts a single-threaded event loop design across all components to maximize simplicity and reliability. Each component runs a single event loop that handles one task at a time in a predictable, sequential manner.

An agent orchestrates multiple threads in a single class for ingestion, training, and inference functionality.

**Consumers** operate on a pull-based polling model, continuously checking Kafka for new messages with configurable timeouts. When messages arrive, they process each one synchronously before moving to the next, ensuring ordered processing and eliminating the need for thread-safe data structures. This approach trades potential throughput for predictable behavior and easier debugging.


**Producers** follow an event-driven push model, where external events (sensor readings, timer callbacks) trigger message publication to Kafka. The single-threaded nature ensures that message ordering is preserved and connection state remains consistent.


**Streaming Processors** combine both patterns, consuming messages from input topics, applying transformations in a single thread, and publishing results to output topics. This creates a deterministic pipeline where each message flows through the system in a predictable sequence.

## Agent Architecture

### Three-Thread Agent Pattern
Each agent spawns three specialized threads:

**Data Ingest Thread**: Inherits from `KafkaConsumerBase`
- Consumes raw sensor data from Kafka
- Stores structured data to MySQL database
- Runs continuous polling loop

**ML Training Thread**: Inherits from `KafkaProducerBase` 
- Periodically queries database for training data
- Trains/retrains ML models
- Publishes training metrics to Kafka
- Uses timer-based loop rather than message polling

**ML Inference Thread**: Inherits from `KafkaStreamingProcessBase`
- Consumes real-time data for inference
- Loads latest trained models
- Publishes anomaly detection results
- Bidirectional Kafka communication

## Data Flow Architecture

1. **Data Ingestion**: External sources (MQTT/EPICS) → `source-kafka-producer` → Kafka topics
2. **Agent Processing**: Kafka → Agent threads → ML processing → Results to Kafka
3. **Storage**: Parallel consumption by `influxdb-consumer` → InfluxDB
4. **Control Loop**: `gymnasium-kafka-controller` provides simulation environment for RL agents

## Key Design Benefits

**Fault Tolerance**: Each container can restart independently; Kafka provides message durability
**Scalability**: Add agents by deploying new containers with shared configuration
**Modularity**: Clear separation between data sources, processing agents, and storage
**Consistency**: All components use the same base classes and loop patterns
**Observability**: Centralized logging and metrics through InfluxDB/Grafana stack

The SMOCS architecture prioritizes simplicity over complex threading, using Kafka as the coordination mechanism rather than internal process communication.