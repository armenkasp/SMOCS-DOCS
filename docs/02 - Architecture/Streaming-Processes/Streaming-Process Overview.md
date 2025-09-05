## Overview
Abstract base class for Kafka stream processors that combines consumer and producer functionality. Extends `KafkaConsumerBase` to enable bidirectional Kafka communication - consuming messages, processing them, and publishing results back to Kafka topics useing composition with `KafkaProducerBase`.

### kafka/cores/kafka_streaming_process_base.py

- Abstract base class for all Kafka stream processors
- Inherits consumer functionality from `KafkaConsumerBase`
- Uses composition with `KafkaProducerBase` for producer capabilities
- Maintains single-threaded architecture with added output publishing
- Processes messages and returns structured results for Kafka publishing
- Single abstract method: `process_message()`

## Key Components

### KafkaStreamingProcessBase Class

- **Constructor**: Inherits consumer setup, creates composed `KafkaProducerBase` instance
- **start()**: Initializes consumer, producer, subscribes to topics, and starts processing loop
- **consume_messages()**: Extended polling loop that processes messages and publishes outputs
- **process_message()**: Abstract method returning `(success_bool, output_tuples_list)`
- **cleanup()**: Cleans up both producer and consumer resources using respective base classes

### Processing Flow

1. Polls for message batches from subscribed topics
2. Calls subclass` process_message()` for each message
3. Handles tuple outputs in format: `(topic, message)` or `(topic, message, key)`
4. Uses composed `KafkaProducerBase` to send results to destination topics
5. Includes comprehensive error handling for both processing and publishing steps

#### **KafkaStreamingProcessBase Loop**
```python
while self.running:
    message_batch = self.consumer.poll(timeout_ms=1000)
    for message in messages:
        success, outputs = self.process_message(message)
        for topic, message_content, key in outputs:
            self.producer.send_to_kafka(topic, message_content, key)
```