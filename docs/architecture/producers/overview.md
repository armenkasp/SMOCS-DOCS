## Overview
Base class architecture for Kafka producers.

Subclasses must implement their own `start()` method for specific data source integration.

### kafka/cores/kafka_producer_base.py
- Abstract base class for all Kafka producers
- Handles Kafka connection setup with robust configuration and retry logic
- Manages automatic topic creation and tracking
- Provides message sending functionality with encoding conversion
- Includes error handling and resource cleanup
- Single abstract method: `start()`

## Key Components

### KafkaProducerBase Class

- **Constructor**: Takes broker URL and initializes tracking variables
- **setup_kafka_producer()**: Creates KafkaProducer and KafkaAdminClient with retry configuration
- **create_topic_if_not_exists()**: Checks and creates topics with default partitioning
- **send_to_kafka()**: Sends messages with automatic encoding and topic creation
- **start()**: Abstract method for subclasses to implement data source logic
- **cleanup()**: Flushes pending messages and closes producer/admin connections


