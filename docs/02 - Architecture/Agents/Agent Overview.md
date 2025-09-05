## Agent Architecture: Multi-Component Systems

### Three-Thread Agent Design
SMOCS agents represent the most complex architectural pattern, orchestrating three specialized threads that work in concert:

**Data Ingest Thread** (`DataIngestThreadBase` → `KafkaConsumerBase`):
- Consumes real-time sensor data from Kafka topics
- Implements agent-specific data parsing and validation
- Stores structured data to MySQL using the shared database manager
- Maintains data quality and provides input validation for downstream components

**ML Training Thread** (`MLTrainingThreadBase` → `KafkaProducerBase`):
- Operates on a timer-based loop rather than message consumption
- Queries the database for accumulated training data
- Implements agent-specific model training and evaluation logic
- Publishes training results and model metadata to Kafka for monitoring
- Handles model versioning and persistence

**ML Inference Thread** (`MLInferenceThreadBase` → `KafkaStreamingProcessBase`):
- Consumes real-time data for immediate inference
- Automatically loads the latest trained models
- Processes streaming data through the loaded models
- Publishes inference results and anomaly detections to output topics
- Provides the real-time decision-making capability of the agent

### Agent Orchestration
The `AgentBase` class manages the complete agent lifecycle through several key phases:

**Initialization**: Creates database connections, registers the agent in the system, and prepares component configurations.

**Component Creation**: Uses abstract factory methods to instantiate the three specialized threads, allowing concrete agent implementations to define their specific component types.

**Thread Management**: Launches each component in its own thread with proper daemon configuration and maintains thread health monitoring.

**Health Monitoring**: Continuously checks thread vitality and automatically restarts failed components, ensuring agent resilience.

## Inter-Thread Coordination

### Database Communication Layer
The three threads coordinate primarily through the shared MySQL database rather than direct communication. The Data Ingest Thread populates the raw data tables, the ML Training Thread consumes this data for model development, and the ML Inference Thread accesses the latest model artifacts.

### Temporal Decoupling
This architecture creates natural temporal decoupling: data ingestion operates at sensor sampling rates, training occurs on longer time scales based on data accumulation, and inference happens at message arrival rates. Each thread can optimize for its specific timing requirements without impacting others.

### Resource Management
Each thread manages its own resources (Kafka connections, database cursors, model memory) and implements appropriate cleanup procedures. The `AgentBase` class monitors thread health and can restart individual components without affecting others.

This three-thread architecture creates a complete machine learning pipeline that ingests streaming data, continuously improves models, and provides real-time intelligence - all while maintaining the simplicity and reliability principles that define the SMOCS platform.

## Architectual Loop Diagram

![SMOCS Base Agent Diagram](/img/diagrams/agentbase-architecture-diagram.png "SMOCS Base Agent Architecture")
