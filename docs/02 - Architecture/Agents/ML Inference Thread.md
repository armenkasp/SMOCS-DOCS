### Streaming Architecture
The ML Inference Thread represents the most sophisticated component, combining real-time data consumption with immediate model application. Built on `KafkaStreamingProcessBase`, it maintains both input and output Kafka connections, creating a streaming transformation pipeline.

### Model Management
The thread implements dynamic model loading, automatically detecting and loading new model versions as they become available. It maintains model metadata including normalization parameters, architecture configuration, and performance thresholds. The loading process includes validation to ensure model compatibility with incoming data formats.

### Inference Pipeline
Incoming messages are parsed into inference requests, which may require data buffering for time-series models. The `AutoencoderMLInferenceThread` maintains a sliding window buffer, constructs inference inputs from recent history, applies normalization using training statistics, and generates predictions through the loaded model.

### Anomaly Detection Logic
For diagnostic agents, the thread implements anomaly detection by comparing reconstruction errors against learned thresholds. It calculates error scores, applies threshold comparisons, and generates anomaly flags with confidence measures. Results include both the anomaly determination and supporting diagnostic information.

### Output Generation
Inference results are packaged into structured messages containing original data, model outputs, anomaly scores, and metadata. These messages are published to configured output topics, enabling downstream consumers to access real-time intelligence about system behavior.

### Performance Optimization
The thread implements several optimization strategies: model result caching for repeated inputs, batch processing when possible, and intelligent buffering to balance latency with throughput. Model loading is performed asynchronously to avoid blocking real-time processing.

## User Implementation Requirements

### Three Required Methods
```python
def load_model(self):
    # Load latest model from filesystem/database (called during __init__)

def parse_inference_request(self, message, topic, partition, offset) -> Optional[Any]:
    # Parse Kafka message into inference-ready format
    # Return parsed data or None if invalid

def perform_inference(self, inference_request: Any) -> Optional[Any]:
    # Apply loaded model to data, return results or None if failed
```

### Implementation Steps

1. **Load Model**: Read latest model files, metadata, normalization parameters
2. **Parse Request**: Extract sensor data, handle buffering for time-series models
3. **Prepare Input**: Apply normalization, create windows, validate dimensions
4. **Run Inference**: Execute model prediction, calculate scores/anomalies
5. **Format Output**: Package results with metadata, timestamps, confidence scores

### Configuration Needed
```python
config = {
    'window_size': 50,
    'model_check_interval': 30,  # seconds between model update checks
    'kafka_topics': {
        'input': 'sensor-data',
        'output': 'inference-results'
    }
}
```

### Environment Variables Required
- `KAFKA_BROKER_URL`
- Database connection variables (same as data ingest)

## What's Handled Automatically

- Kafka consumer/producer setup (bidirectional)
- Message polling and result publishing
- Output message formatting for Kafka
- Model update detection and reloading
- Thread lifecycle and health monitoring
- Database connections for metadata access

## Key Constraints

- **Real-time**: Keep inference fast for streaming data
- **Stateful**: May need to maintain data buffers (sliding windows)
- **Model updates**: Handle dynamic model reloading without dropping messages
- **Memory management**: Manage buffers and model memory efficiently
- **Error handling**: Graceful degradation when models unavailable

The thread operates as a streaming processor, consuming sensor data and publishing enriched results with ML insights in real-time.

### Diagram

![SMOCS ML Inference Thread Diagram](/img/diagrams/mlinferencethread-architecture-diagram.png "SMOCS ML Inference Thread Architecture")