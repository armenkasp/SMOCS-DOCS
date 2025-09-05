## Overview
Base class architecture for Kafka consumers. 

To implement a subclass that will consume information from a Kafka stream, you must implement the `process_message()` method which will inherit all Kafka functionality from the base class.

### kafka/cores/kafka_consumer_base.py
- Abstract base class for all Kafka consumers
- Handles Kafka connection setup with retry logic
- Manages topic subscription (patterns and specific topics)
- Provides main message consumption loop
- Includes error handling and resource cleanup
- Single abstract method: `process_message()`

## Key Components

### KafkaConsumerBase Class
- **Constructor**: Takes broker URL, group ID, and topics/pattern
- **setup_kafka_consumer()**: Creates KafkaConsumer with sensible defaults
- **subscribe_to_topics()**: Handles topic subscription logic
- **start()**: Main entry point that sets up and starts consumption
- **consume_messages()**: Main polling loop for message processing
- **process_message()**: Abstract method implemented by 

#### **KafkaConsumerBase Loop**
```python
while self.running:
    message_batch = self.consumer.poll(timeout_ms=1000)
    for topic_partition, messages in message_batch.items():
        for message in messages:
            success = self.process_message(message.value, message.topic, 
                                         message.partition, message.offset)
```


