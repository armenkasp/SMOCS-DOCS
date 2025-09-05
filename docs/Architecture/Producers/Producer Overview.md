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

#### **KafkaProducerBase Loop** 
```python
# Producers are event-driven rather than polling
def start(self):
    self.setup_kafka_producer()
    # Source-specific loop (MQTT callbacks, EPICS polling, etc.)
    while True:
        data = get_source_data()  # Source-specific implementation
        kafka_message = transform_data(data)
        self.send_to_kafka(topic, kafka_message)
```

